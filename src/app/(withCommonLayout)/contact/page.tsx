'use client'

import React from 'react'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

function ContactUs() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Add your form submission logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-blue-950 text-gray-100 overflow-hidden relative">
      {/* Background Elements */}
      <div className="particle-container absolute inset-0 opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[length:40px_40px] bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] animate-grid-drift" />
      <div className="absolute left-1/2 top-1/3 w-96 h-96 bg-radial-gradient(from_60%_50%,rgba(16,185,129,0.15)_0%,transparent_60%) animate-plasma" />

      {/* Content Container */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4 animate-gradient-flow">
            Let&apos;s Connect
          </h1>
          <p className="text-xl md:text-2xl text-cyan-200 font-light">
            Have a question or want to work together?
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group relative">
              <input
                type="text"
                id="name"
                required
                className="w-full p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-cyan-500/20 focus:border-cyan-400/40 outline-none transition-all"
                placeholder=" "
              />
              <label 
                htmlFor="name"
                className="absolute left-4 top-2 text-sm text-cyan-400 pointer-events-none transition-all group-focus-within:top-2 group-focus-within:text-sm group-[input:not(:placeholder-shown)]:top-2 group-[input:not(:placeholder-shown)]:text-sm"
              >
                Your Name
              </label>
            </div>

            <div className="group relative">
              <input
                type="email"
                id="email"
                required
                className="w-full p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-cyan-500/20 focus:border-cyan-400/40 outline-none transition-all"
                placeholder=" "
              />
              <label 
                htmlFor="email"
                className="absolute left-4 top-2 text-sm text-cyan-400 pointer-events-none transition-all group-focus-within:top-2 group-focus-within:text-sm group-[input:not(:placeholder-shown)]:top-2 group-[input:not(:placeholder-shown)]:text-sm"
              >
                Email Address
              </label>
            </div>

            <div className="group relative">
              <textarea
                id="message"
                required
                rows={5}
                className="w-full p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-cyan-500/20 focus:border-cyan-400/40 outline-none transition-all resize-none"
                placeholder=" "
              ></textarea>
              <label 
                htmlFor="message"
                className="absolute left-4 top-2 text-sm text-cyan-400 pointer-events-none transition-all group-focus-within:top-2 group-focus-within:text-sm group-[textarea:not(:placeholder-shown)]:top-2 group-[textarea:not(:placeholder-shown)]:text-sm"
              >
                Your Message
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-semibold rounded-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">Send Message</span>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shine" />
            </button>
          </form>

          {/* Social Links */}
          <div className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl border-2 border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-500 relative overflow-hidden group hover:shadow-2xl hover:shadow-cyan-500/20">
            <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#06b6d410_0%,#3b82f620_25%,#06b6d410_50%)] rounded-3xl opacity-30 animate-conic-sweep" />
            <h2 className="text-3xl font-bold text-cyan-400 mb-8 relative z-10">Other Channels</h2>
            <div className="space-y-6 relative z-10">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/20"
              >
                <FiGithub className="w-8 h-8 text-cyan-400 flex-shrink-0 transition-transform duration-300 hover:scale-110" />
                <span className="font-medium text-lg">GitHub Profile</span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">↗</div>
              </a>
              
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/20"
              >
                <FiLinkedin className="w-8 h-8 text-cyan-400 flex-shrink-0 transition-transform duration-300 hover:scale-110" />
                <span className="font-medium text-lg">LinkedIn Profile</span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">↗</div>
              </a>
              
              <a
                href="mailto:your.email@example.com"
                className="flex items-center gap-4 p-5 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/20"
              >
                <FiMail className="w-8 h-8 text-cyan-400 flex-shrink-0 transition-transform duration-300 hover:scale-110" />
                <span className="font-medium text-lg">Direct Email</span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">↗</div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes shine {
          to { background-position: 200% center; }
        }

        @keyframes conic-sweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-gradient-flow {
          background-size: 200% auto;
          animation: gradient-flow 8s ease infinite;
        }

        .animate-shine {
          animation: shine 5s linear infinite;
        }

        .animate-conic-sweep {
          animation: conic-sweep 20s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default ContactUs