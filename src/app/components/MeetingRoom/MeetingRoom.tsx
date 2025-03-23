import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Peer from 'simple-peer';
import { socket } from '../../lib/Socket';

interface PeerRef {
  peer: Peer.Instance;
  userId: string;
  stream?: MediaStream;
}

const MeetingRoom = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const [peers, setPeers] = useState<PeerRef[]>([]);
  const userVideo = useRef<HTMLVideoElement>(null);
  const peersRef = useRef<PeerRef[]>([]);
  const localStream = useRef<MediaStream | null>(null);

  useEffect(() => {
    socket.connect();

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        localStream.current = stream;
        if (userVideo.current) userVideo.current.srcObject = stream;

        socket.emit('join-room', roomId, socket.id);

        socket.on('user-connected', (userId: string) => {
          const peer = createPeer(userId);
          peersRef.current = [...peersRef.current, { peer, userId }];
          setPeers(peersRef.current);
        });

        socket.on('signal', (fromId: string, signal: Peer.SignalData) => {
          const peerObj = peersRef.current.find(p => p.userId === fromId);
          peerObj?.peer.signal(signal);
        });

        socket.on('user-disconnected', (userId: string) => {
          const peerObj = peersRef.current.find(p => p.userId === userId);
          peerObj?.peer.destroy();
          peersRef.current = peersRef.current.filter(p => p.userId !== userId);
          setPeers(peersRef.current);
        });
      });

    return () => {
      socket.disconnect();
      localStream.current?.getTracks().forEach(track => track.stop());
    };
  }, [roomId]);

  const createPeer = (userId: string) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: localStream.current || undefined
    });

    peer.on('signal', (signal: Peer.SignalData) => {
      socket.emit('signal', userId, signal);
    });

    peer.on('stream', (remoteStream: MediaStream) => {
      peersRef.current = peersRef.current.map(p => 
        p.userId === userId ? { ...p, stream: remoteStream } : p
      );
      setPeers(peersRef.current);
    });

    return peer;
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <div className="relative bg-gray-800 rounded-xl overflow-hidden">
          <video
            ref={userVideo}
            autoPlay
            muted
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-2 text-sm bg-gray-900/80 px-2 py-1 rounded-md">
            You
          </div>
        </div>

        {peers.map((peer, index) => (
          <div key={index} className="relative bg-gray-800 rounded-xl overflow-hidden">
            <video
              autoPlay
              className="w-full h-full object-cover"
              ref={video => {
                if (video && peer.stream) video.srcObject = peer.stream;
              }}
            />
            <div className="absolute bottom-2 left-2 text-sm bg-gray-900/80 px-2 py-1 rounded-md">
              User {index + 1}
            </div>
          </div>
        ))}
      </div>

      <div className="h-20 bg-gray-800/80 backdrop-blur-sm flex items-center justify-center">
        <div className="flex gap-4">
          <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
            {/* Add control buttons */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoom;