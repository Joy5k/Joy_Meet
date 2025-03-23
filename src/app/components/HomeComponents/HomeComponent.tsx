'use client'

import React, { useEffect } from 'react'
// import VideoConferenceUI from '../VideoConferenceUI/VideoConferenceUI';
// import MeetingRoomUI from '../MeetingRoomUI/MeetingRoomUI';



const data=[
    { icon: '🎥', title: 'HD Video', desc: 'Crystal clear 1080p video quality' },
    { icon: '🔒', title: 'Security', desc: 'End-to-end encryption & waiting rooms' },
    { icon: '🖥️', title: 'Screen Share', desc: 'Present your entire desktop or apps' },
    { icon: '💬', title: 'Chat', desc: 'Real-time messaging with file sharing' },
    { icon: '📅', title: 'Scheduling', desc: 'Calendar integration & reminders' },
    { icon: '🎨', title: 'Custom', desc: 'Virtual backgrounds & filters' },
  ]
function HomeComponent() {
  
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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-8 relative">
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6 animate-quantum-glow">
              Welcome to Joy_Meet!
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-20 blur-3xl -z-10 animate-core-pulse" />
          </div>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
            Connect. Communicate. Collaborate. <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-medium">
              Your premium video conferencing solution
            </span>
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button 
            
              className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-semibold rounded-xl transform transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-sm hover:shadow-cyan-400/20 cursor-pointer"
            >
              Start Free Meeting
            </button>
            <button 
           
              className="px-8 py-4 border-2 border-cyan-500/60 hover:border-cyan-400 text-cyan-100 font-semibold rounded-xl transform transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-sm hover:shadow-cyan-400/20 cursor-pointer"
            >
              Join with Code
            </button>
          </div>

        {/* screen sharing ui */}
          {/* <VideoConferenceUI 
        /> */}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {data.map((feature, index) => (
            <div 
              key={index}
              className="relative p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-gray-800 hover:border-cyan-500/30 transition-all duration-500 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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



