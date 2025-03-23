'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { motion } from 'framer-motion'

function VideoConferenceUI() {
  const [isStartOpen, setIsStartOpen] = useState(false)
  const [isJoinOpen, setIsJoinOpen] = useState(false)
  const [meetingId, setMeetingId] = useState('')
  const [screens, setScreens] = useState<MediaDeviceInfo[]>([])
  const [selectedScreen, setSelectedScreen] = useState<string>('')

  const getScreens = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const screens = devices.filter(device => device.kind === 'videoinput')
      setScreens(screens)
    } catch (error) {
      console.error('Error accessing media devices:', error)
    }
  }

  const handleStartMeeting = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: 'monitor' },
        audio: false
      })
      console.log(stream)
      // Handle the screen sharing stream here
    } catch (error) {
      console.error('Screen sharing error:', error)
    }
  }

  return (
    <div className="relative">
      {/* Buttons Container */}
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <button 
          onClick={() => { setIsStartOpen(true); getScreens() }}
          className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-semibold rounded-xl transform transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-sm hover:shadow-cyan-400/20 cursor-pointer"
        >
          Start Free Meeting
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

                  <div className="grid grid-cols-2 gap-4">
                    {screens.map((screen) => (
                      <button
                        key={screen.deviceId}
                        onClick={() => setSelectedScreen(screen.deviceId)}
                        className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                          selectedScreen === screen.deviceId
                            ? 'border-cyan-400 bg-cyan-500/10'
                            : 'border-cyan-500/30 hover:border-cyan-400/50'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="h-32 bg-gray-800 rounded-lg flex items-center justify-center">
                            <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium text-cyan-200 truncate">{screen.label}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setIsStartOpen(false)}
                      className="px-6 py-2 border border-cyan-500/30 text-cyan-200 rounded-lg hover:bg-cyan-500/10 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleStartMeeting}
                      className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors flex items-center gap-2"
                    >
                      Start Sharing
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
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