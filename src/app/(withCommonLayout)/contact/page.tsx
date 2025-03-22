import React from 'react'

function ContactUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-blue-950 text-gray-100 overflow-hidden relative">
    {/* Quantum Dot Animation */}
    <div className="particle-container absolute inset-0 opacity-20 pointer-events-none" />

    {/* Holographic Grid */}
    <div className="absolute inset-0 bg-[length:40px_40px] bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] animate-grid-drift" />

    {/* Plasma Core */}
    <div className="absolute left-1/2 top-1/3 w-96 h-96 bg-radial-gradient(from_60%_50%,rgba(16,185,129,0.15)_0%,transparent_60%) animate-plasma" />
    </div>
  )
}

export default ContactUs