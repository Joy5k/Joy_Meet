/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
// app/meeting/[roomId]/page.tsx
'use client'

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Peer from 'simple-peer';
import io, { Socket } from 'socket.io-client';
import { motion } from 'framer-motion';

interface Participant {
  id: string;
  peer: Peer.Instance;
  stream?: MediaStream;
}

export default function MeetingRoom() {
  const params = useParams();
  const router = useRouter();
  const [peers, setPeers] = useState<Participant[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const peersRef = useRef<Participant[]>([]);
  const socketRef = useRef<typeof Socket | null>(null);

  useEffect(() => {
    if (userVideoRef.current && localStream) {
      userVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    const initMeeting = async () => {
      try {
        // Initialize socket connection
        socketRef.current = io('http://localhost:5000', {
          path: '/socket.io',
          transports: ['websocket'],
          autoConnect: true
        });

        // Get user media with error handling
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 1280, height: 720 },
          audio: true 
        });
        setLocalStream(stream);

        // Join the room
        socketRef.current.emit('join-room', params.roomId, socketRef.current.id);

        // Setup socket listeners
        socketRef.current.on('user-connected', (userId: string) => {
          const peer = createPeer(userId, stream);
          peersRef.current = [...peersRef.current, { id: userId, peer }];
          setPeers(peersRef.current);
        });

        socketRef.current.on('signal', (fromId: string, signal: any) => {
          const peer = peersRef.current.find(p => p.id === fromId);
          peer?.peer.signal(signal);
        });

        socketRef.current.on('user-disconnected', (userId: string) => {
          const peer = peersRef.current.find(p => p.id === userId);
          peer?.peer.destroy();
          peersRef.current = peersRef.current.filter(p => p.id !== userId);
          setPeers(peersRef.current);
        });

        socketRef.current.on('connect_error', (err) => {
          console.error('Socket connection error:', err);
          alert('Failed to connect to meeting server!');
          router.push('/');
        });

      } catch (error) {
        console.error('Meeting initialization error:', error);
        alert('Camera/microphone access required!');
        router.push('/');
      }
    };

    initMeeting();

    return () => {
      socketRef.current?.disconnect();
      localStream?.getTracks().forEach(track => track.stop());
      screenStream?.getTracks().forEach(track => track.stop());
      peersRef.current.forEach(peer => peer.peer.destroy());
    };
  }, []);

  const createPeer = (userId: string, stream: MediaStream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream
    });

    peer.on('signal', signal => {
      socketRef.current?.emit('signal', userId, signal);
    });

    peer.on('stream', remoteStream => {
      peersRef.current = peersRef.current.map(p => 
        p.id === userId ? { ...p, stream: remoteStream } : p
      );
      setPeers(peersRef.current);
    });

    peer.on('error', err => {
      console.error('Peer connection error:', err);
    });

    return peer;
  };

  const toggleAudio = () => {
    setIsMuted(!isMuted);
    localStream?.getAudioTracks().forEach(track => track.enabled = !track.enabled);
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    localStream?.getVideoTracks().forEach(track => track.enabled = !track.enabled);
  };

  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: 'monitor' },
        audio: true
      });

      stream.getVideoTracks()[0].addEventListener('ended', () => {
        setScreenStream(null);
        // Switch back to camera stream
        peersRef.current.forEach(peer => {
          peer.peer.replaceTrack(
            peer.peer.streams[0].getVideoTracks()[0],
            localStream?.getVideoTracks()[0]!,
            localStream!
          );
        });
      });

      setScreenStream(stream);
      peersRef.current.forEach(peer => {
        peer.peer.replaceTrack(
          localStream?.getVideoTracks()[0]!,
          stream.getVideoTracks()[0],
          localStream!
        );
      });
    } catch (error) {
      console.error('Screen sharing failed:', error);
    }
  };

  const leaveMeeting = () => {
    router.push('/');
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Video Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <div className="relative bg-gray-800 rounded-xl overflow-hidden">
          <video
            ref={userVideoRef}
            autoPlay
            muted
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-2 text-sm bg-gray-900/80 px-2 py-1 rounded-md">
            You {isMuted ? '(Muted)' : ''} {!isVideoOn ? '(Camera Off)' : ''}
          </div>
        </div>

        {peers.map((peer, index) => (
          <div key={peer.id} className="relative bg-gray-800 rounded-xl overflow-hidden">
            <video
              autoPlay
              className="w-full h-full object-cover"
              ref={video => {
                if (video && peer.stream) video.srcObject = peer.stream;
              }}
            />
            <div className="absolute bottom-2 left-2 text-sm bg-gray-900/80 px-2 py-1 rounded-md">
              Participant {index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Control Bar */}
      <div className="h-20 bg-gray-800/80 backdrop-blur-sm flex items-center justify-center">
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className={`p-3 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-700'}`}
            onClick={toggleAudio}
          >
            {isMuted ? '🎤❌' : '🎤'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            className={`p-3 rounded-full ${!isVideoOn ? 'bg-red-500' : 'bg-gray-700'}`}
            onClick={toggleVideo}
          >
            {isVideoOn ? '📹' : '📹❌'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            className={`p-3 rounded-full ${screenStream ? 'bg-blue-500' : 'bg-gray-700'}`}
            onClick={startScreenShare}
          >
            🖥️
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            className="p-3 rounded-full bg-red-500"
            onClick={leaveMeeting}
          >
            📞
          </motion.button>
        </div>
      </div>
    </div>
  );
};