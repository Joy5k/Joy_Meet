'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

function VideoConferenceUI() {
  const [isStartOpen, setIsStartOpen] = useState(false)
  const [isJoinOpen, setIsJoinOpen] = useState(false)
  const [meetingId, setMeetingId] = useState('')
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null)
  const [sharingError, setSharingError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Handle video element setup
  useEffect(() => {
    if (videoRef.current && screenStream) {
      videoRef.current.srcObject = screenStream
    }
  }, [screenStream])

  // Cleanup streams on unmount
  useEffect(() => {
    return () => {
      screenStream?.getTracks().forEach(track => track.stop())
    }
  }, [screenStream])

  const startScreenShare = async () => {
    try {
      setSharingError(null)
      
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: 'monitor', // Can be 'monitor', 'window', or 'browser'
          // cursor: 'always' // 'always' | 'motion' | 'never'
        },
        audio: false
      })

      // Handle track ended event (user stops sharing)
      stream.getVideoTracks()[0].addEventListener('ended', () => {
        setScreenStream(null)
        setIsStartOpen(false)
      })

      setScreenStream(stream)
      setIsStartOpen(false) // Close modal after successful share
    } catch (error) {
      console.error('Screen sharing error:', error)
      setSharingError(error instanceof Error ? error.message : 'Failed to start screen sharing')
      setScreenStream(null)
    }
  }

  const stopScreenShare = () => {
    screenStream?.getTracks().forEach(track => track.stop())
    setScreenStream(null)
  }

  return (
    <div className="relative">
      {/* Screen Sharing Preview */}
      {screenStream && (
        <div className="fixed bottom-4 right-4 z-[1000] bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
          <div className="p-2 bg-gray-800 flex justify-between items-center">
            <span className="text-sm text-cyan-400">Screen Sharing</span>
            <button
              onClick={stopScreenShare}
              className="text-red-500 hover:text-red-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-64 h-48 object-contain bg-black"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      )}

      {/* Buttons Container */}
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <button 
          onClick={() => setIsStartOpen(true)}
          className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-semibold rounded-xl transform transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-sm hover:shadow-cyan-400/20 cursor-pointer"
        >
          {screenStream ? 'Sharing...' : 'Start Free Meeting'}
        </button>
        
        <button 
          onClick={() => setIsJoinOpen(true)}
          className="px-8 py-4 border-2 border-cyan-500/60 hover:border-cyan-400 text-cyan-100 font-semibold rounded-xl transform transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-sm hover:shadow-cyan-400/20 cursor-pointer"
        >
          Join with Code
        </button>
      </div>

      {/* Start Meeting Modal */}
      <Transition appear show={isStartOpen} as={Fragment}>
        <Dialog onClose={() => setIsStartOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl bg-gradient-to-br from-gray-900 to-blue-950 rounded-2xl p-8 shadow-2xl border border-cyan-500/30">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="space-y-6"
                >
                  <Dialog.Title className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Share Your Screen
                  </Dialog.Title>

                  {sharingError && (
                    <div className="p-4 bg-red-500/20 rounded-xl border border-red-500/40 text-red-300">
                      {sharingError}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="aspect-video bg-gray-900 rounded-xl border-2 border-dashed border-cyan-500/30 flex items-center justify-center">
                      <svg className="w-16 h-16 text-cyan-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={startScreenShare}
                        className="p-6 rounded-xl border-2 border-cyan-500/30 hover:border-cyan-400/50 bg-gray-900/50 transition-all flex flex-col items-center"
                      >
                        <div className="text-4xl mb-2">🖥️</div>
                        <span className="text-cyan-200">Entire Screen</span>
                      </button>
                      
                      <button
                        onClick={startScreenShare}
                        className="p-6 rounded-xl border-2 border-cyan-500/30 hover:border-cyan-400/50 bg-gray-900/50 transition-all flex flex-col items-center"
                      >
                        <div className="text-4xl mb-2">📁</div>
                        <span className="text-cyan-200">Application Window</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setIsStartOpen(false)}
                      className="px-6 py-2 border border-cyan-500/30 text-cyan-200 rounded-lg hover:bg-cyan-500/10 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>



      {/* Join Meeting Modal */}
      <Transition appear show={isJoinOpen} as={Fragment}>
        <Dialog onClose={() => setIsJoinOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md bg-gradient-to-br from-gray-900 to-blue-950 rounded-2xl p-8 shadow-2xl border border-cyan-500/30">
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-6"
                >
                  <Dialog.Title className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Join Meeting
                  </Dialog.Title>

                  <div className="space-y-4">
                    <div className="group relative">
                      <input
                        type="text"
                        value={meetingId}
                        onChange={(e) => setMeetingId(e.target.value)}
                        className="w-full p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-cyan-500/20 focus:border-cyan-400/40 outline-none transition-all"
                        placeholder=" "
                      />
                      <label 
                        htmlFor="meetingId"
                        className="absolute left-4 top-2 text-sm text-cyan-400 pointer-events-none transition-all group-focus-within:top-2 group-focus-within:text-sm group-[input:not(:placeholder-shown)]:top-2 group-[input:not(:placeholder-shown)]:text-sm"
                      >
                        Meeting ID or Link
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setIsJoinOpen(false)}
                      className="px-6 py-2 border border-cyan-500/30 text-cyan-200 rounded-lg hover:bg-cyan-500/10 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {/* Add join meeting logic here */}}
                      className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors flex items-center gap-2"
                    >
                      Join Now
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default VideoConferenceUI