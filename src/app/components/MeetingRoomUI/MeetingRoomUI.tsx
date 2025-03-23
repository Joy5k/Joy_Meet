'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Participant {
  id: string
  name: string
  videoStream: MediaStream | null
  screenStream: MediaStream | null
  audioEnabled: boolean
  videoEnabled: boolean
}

function MeetingRoomUI() {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null)
  const [isSharing, setIsSharing] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const screenShareRef = useRef<HTMLVideoElement>(null)

  // Initialize local media
  useEffect(() => {
    const initLocalMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        })
        setLocalStream(stream)
        
        // Add local participant
        setParticipants(prev => [...prev, {
          id: 'local',
          name: 'You',
          videoStream: stream,
          screenStream: null,
          audioEnabled: true,
          videoEnabled: true
        }])
      } catch (error) {
        console.error('Error accessing media devices:', error)
      }
    }

    initLocalMedia()

    return () => {
      localStream?.getTracks().forEach(track => track.stop())
      screenStream?.getTracks().forEach(track => track.stop())
    }
  }, [])

  // Update video elements when streams change
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream
    }
    if (screenShareRef.current && screenStream) {
      screenShareRef.current.srcObject = screenStream
    }
  }, [localStream, screenStream])

  const toggleAudio = () => {
    setIsMuted(!isMuted)
    localStream?.getAudioTracks().forEach(track => track.enabled = !track.enabled)
  }

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn)
    localStream?.getVideoTracks().forEach(track => track.enabled = !track.enabled)
  }

  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: 'monitor' },
        audio: true
      })

      stream.getVideoTracks()[0].addEventListener('ended', stopScreenShare)
      setScreenStream(stream)
      setIsSharing(true)

      // Update participants with screen share
      setParticipants(prev => prev.map(p => 
        p.id === 'local' ? { ...p, screenStream: stream } : p
      ))
    } catch (error) {
      console.error('Screen sharing failed:', error)
    }
  }

  const stopScreenShare = () => {
    screenStream?.getTracks().forEach(track => track.stop())
    setScreenStream(null)
    setIsSharing(false)
    setParticipants(prev => prev.map(p => 
      p.id === 'local' ? { ...p, screenStream: null } : p
    ))
  }

  const leaveMeeting = () => {
    // Implement meeting leave logic
    window.location.href = '/'
  }

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Main Content Area */}
      <div className="flex-1 relative">
        {/* Screen Sharing Highlight */}
        {isSharing && (
          <div className="absolute inset-0 z-10 bg-black">
            <video
              ref={screenShareRef}
              autoPlay
              muted={isMuted}
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Participants Grid */}
        <div className={`grid gap-4 p-4 ${isSharing ? 'hidden' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="relative bg-gray-800 rounded-xl overflow-hidden aspect-video"
            >
              {participant.screenStream ? (
                <video
                  autoPlay
                  muted={participant.id === 'local'}
                  className="w-full h-full object-cover"
                  ref={participant.id === 'local' ? screenShareRef : null}
                />
              ) : (
                <>
                  {participant.videoEnabled ? (
                    <video
                      autoPlay
                      muted={participant.id === 'local'}
                      className="w-full h-full object-cover"
                      ref={participant.id === 'local' ? localVideoRef : null}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <span className="text-2xl text-gray-400">
                        {participant.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 bg-gray-900/80 px-2 py-1 rounded-md text-sm">
                    {participant.name}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Local Video Preview */}
        {!isSharing && (
          <div className="fixed bottom-4 right-4 w-48 h-32 bg-gray-800 rounded-xl shadow-2xl overflow-hidden z-20">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-1 left-1 text-xs bg-gray-900/80 px-2 py-1 rounded-md">
              You
            </div>
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="h-20 bg-gray-800/80 backdrop-blur-sm flex items-center justify-center">
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className={`p-3 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-700'}`}
            onClick={toggleAudio}
          >
            {isMuted ? (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2 2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            className={`p-3 rounded-full ${!isVideoOn ? 'bg-red-500' : 'bg-gray-700'}`}
            onClick={toggleVideo}
          >
            {isVideoOn ? (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            className={`p-3 rounded-full ${isSharing ? 'bg-cyan-500' : 'bg-gray-700'}`}
            onClick={isSharing ? stopScreenShare : startScreenShare}
          >
            {isSharing ? (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            className="p-3 rounded-full bg-red-500"
            onClick={leaveMeeting}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default MeetingRoomUI