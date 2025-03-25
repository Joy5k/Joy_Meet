'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import  io, { Socket } from 'socket.io-client';


const data=[
    { icon: '🎥', title: 'HD Video', desc: 'Crystal clear 1080p video quality' },
    { icon: '🔒', title: 'Security', desc: 'End-to-end encryption & waiting rooms' },
    { icon: '🖥️', title: 'Screen Share', desc: 'Present your entire desktop or apps' },
    { icon: '💬', title: 'Chat', desc: 'Real-time messaging with file sharing' },
    { icon: '📅', title: 'Scheduling', desc: 'Calendar integration & reminders' },
    { icon: '🎨', title: 'Custom', desc: 'Virtual backgrounds & filters' },
  ]
function HomeComponent() {
  
  const router = useRouter();
  const [socket, setSocket] = useState<typeof Socket>();
  const [roomId, setRoomId] = useState('');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
      const newSocket = io('http://localhost:5000');
      setSocket(newSocket);

      newSocket.on('room-created', (id: string) => {
          setRoomId(id);
      });

      newSocket.on('room-joined', (id: string) => {
          router.push(`/meeting/${id}`);
      });

      newSocket.on('error', (message: string) => {
          setError(message);
      });

      return () => {
          newSocket.disconnect();
      };
  }, [router]);

  const createMeeting = () => {
      if (!socket) return;
      const userId = `user_${Math.random().toString(36).substr(2, 9)}`;
      socket.emit('create-room', userId);
  };

  const joinMeeting = () => {
      if (!socket || !joinCode) return;
      const userId = `user_${Math.random().toString(36).substr(2, 9)}`;
      socket.emit('join-room', joinCode, userId);
  };

  const copyInviteLink = () => {
      if (roomId) {
          const inviteLink = `${window.location.origin}/meeting/${roomId}`;
          navigator.clipboard.writeText(inviteLink);
      }
  };

  useEffect(() => {
      const createParticles = () => {
          const container = document.querySelector('.particle-container');
          for (let i = 0; i < 50; i++) {
              const particle = document.createElement('div');
              particle.className = 'absolute w-0.5 h-0.5 bg-cyan-500 rounded-full';
              particle.style.left = `${Math.random() * 100}%`;
              particle.style.top = `${Math.random() * 100}%`;
              particle.style.animation = `particle-flow ${15 + Math.random() * 10}s linear infinite ${Math.random() * 5}s`;
              if (container) {
                  container.appendChild(particle);
              }
          }
      };
      createParticles();
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900 text-gray-100 overflow-hidden relative">
      {/* Quantum Dot Animation */}
      <div className="particle-container absolute inset-0 opacity-20 pointer-events-none" />

      {/* Holographic Grid */}
      <div className="absolute inset-0 bg-[length:40px_40px] bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] animate-grid-drift" />

      {/* Plasma Core */}
      <div className="absolute left-1/2 top-1/3 w-96 h-96 bg-radial-gradient(from_60%_50%,rgba(16,185,129,0.15)_0%,transparent_60%) animate-plasma" />


 {/* <MeetingRoomUI></MeetingRoomUI> */}
      {/* Main Content */}
     {roomId && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-8 rounded-2xl max-w-md w-full mx-4">
                        <h3 className="text-2xl mb-4">Meeting Created! 🎉</h3>
                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={`${window.location.origin}/meeting/${roomId}`}
                                readOnly
                                className="bg-gray-700 p-2 rounded-lg flex-grow text-sm"
                            />
                            <button
                                onClick={copyInviteLink}
                                className="px-4 py-2 bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors"
                            >
                                Copy
                            </button>
                        </div>
                        <button
                            onClick={() => router.push(`/meeting/${roomId}`)}
                            className="w-full py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Start Meeting Now
                        </button>
                    </div>
                </div>
            )}

            {/* Join Meeting Modal */}
            {showJoinModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-8 rounded-2xl max-w-md w-full mx-4">
                        <h3 className="text-2xl mb-4">Join Meeting</h3>
                        <input
                            type="text"
                            placeholder="Enter Meeting ID"
                            value={joinCode}
                            onChange={(e) => setJoinCode(e.target.value)}
                            className="bg-gray-700 p-2 rounded-lg w-full mb-4"
                        />
                        {error && <p className="text-red-400 mb-2">{error}</p>}
                        <div className="flex gap-2">
                            <button
                                onClick={joinMeeting}
                                className="flex-grow py-2 bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors"
                            >
                                Join
                            </button>
                            <button
                                onClick={() => setShowJoinModal(false)}
                                className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10">
                <div className="text-center mb-16 space-y-8 relative">
                    <div className="relative inline-block">
                        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6 animate-quantum-glow">
                            Welcome to Joy_Meet!
                        </h1>
                    </div>

                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
                        Connect. Communicate. Collaborate. <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-medium">
                            Your premium video conferencing solution
                        </span>
                    </p>

                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <button 
                            onClick={createMeeting}
                            className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-semibold rounded-xl transform transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-sm hover:shadow-cyan-400/20 cursor-pointer"
                        >
                            Start Free Meeting
                        </button>
                        <button 
                            onClick={() => setShowJoinModal(true)}
                            className="px-8 py-4 border-2 border-cyan-500/60 hover:border-cyan-400 text-cyan-100 font-semibold rounded-xl transform transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-sm hover:shadow-cyan-400/20 cursor-pointer"
                        >
                            Join with Code
                        </button>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
                    {data.map((feature, index) => (
                        <div 
                            key={index}
                            className="relative p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-gray-800 hover:border-cyan-500/30 transition-all duration-500 group overflow-hidden"
                        >
                            <div className="relative z-10">
                                <div className="text-4xl mb-4 opacity-90">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
  )
}

export default HomeComponent



