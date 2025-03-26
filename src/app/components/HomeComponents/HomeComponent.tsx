'use client'

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import io, { Socket } from 'socket.io-client';
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  userId: string;
  email: string;
}

const data = [
    { icon: '🎥', title: 'HD Video', desc: 'Crystal clear 1080p video quality' },
    { icon: '🔒', title: 'Security', desc: 'End-to-end encryption & waiting rooms' },
    { icon: '🖥️', title: 'Screen Share', desc: 'Present your entire desktop or apps' },
    { icon: '💬', title: 'Chat', desc: 'Real-time messaging with file sharing' },
    { icon: '📅', title: 'Scheduling', desc: 'Calendar integration & reminders' },
    { icon: '🎨', title: 'Custom', desc: 'Virtual backgrounds & filters' },
];

function HomeComponent() {
    const router = useRouter();
    const [socket, setSocket] = useState< typeof Socket | null>(null);
    const [roomId, setRoomId] = useState('');
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [joinCode, setJoinCode] = useState('');
    const [error, setError] = useState('');
    const [userId, setUserId] = useState<string>('');

    // Initialize socket connection
   // Updated useEffect for socket connection
useEffect(() => {
    let newSocket: Socket;
    
    const connectSocket = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) return;
  
        const decoded = jwtDecode<JwtPayload>(accessToken);
        setUserId(decoded.userId);
  
        newSocket = io('http://localhost:5000', {
          path: '/api/v1/socket.io',
          transports: ['websocket'],
          auth: { token: accessToken },
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          timeout: 10000
        });
  
        newSocket.on('connect', () => {
          console.log('Socket connected:', newSocket.id);
        });
  
        newSocket.on('room-created', (id: string) => {
          setRoomId(id);
        });
  
        newSocket.on('connect_error', (err) => {
          console.error('Connection error:', err.message);
          setError('Connection failed. Please refresh the page.');
          newSocket.close();
        });
  
        setSocket(newSocket);
      } catch (error) {
        console.error('Authentication error:', error);
        setError('Invalid session. Please login again.');
      }
    };
  
    connectSocket();
  
    return () => {
      if (newSocket) {
        newSocket.removeAllListeners();
        newSocket.close();
      }
    };
  }, [router]);

    const createMeeting = useCallback(() => {
        if (!socket || !userId) return;
        socket.emit('create-room', userId);
    }, [socket, userId]);

    const joinMeeting = useCallback(() => {
        if (!socket || !joinCode || !userId) {
            setError('Please enter a valid meeting ID');
            return;
        }
        socket.emit('join-room', joinCode, userId);
    }, [socket, joinCode, userId]);

    const copyInviteLink = useCallback(() => {
        if (roomId) {
            const inviteLink = `${window.location.origin}/meeting/${roomId}`;
            navigator.clipboard.writeText(inviteLink);
        }
    }, [roomId]);

    useEffect(() => {
        const createParticles = () => {
            const container = document.querySelector('.particle-container');
            if (!container) return;

            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'absolute w-0.5 h-0.5 bg-cyan-500 rounded-full';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.animation = `particle-flow ${15 + Math.random() * 10}s linear infinite ${Math.random() * 5}s`;
                container.appendChild(particle);
            }
        };
        
        createParticles();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900 text-gray-100 overflow-hidden relative">
            {/* Particle effects */}
            <div className="particle-container absolute inset-0 opacity-20 pointer-events-none" />
            <div className="absolute inset-0 bg-[length:40px_40px] bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] animate-grid-drift" />
            <div className="absolute left-1/2 top-1/3 w-96 h-96 bg-radial-gradient(from_60%_50%,rgba(16,185,129,0.15)_0%,transparent_60%) animate-plasma" />

            {/* Modals */}
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

            {showJoinModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
                        <input
                            type="text"
                            placeholder="Enter Meeting ID"
                            value={joinCode}
                            onChange={(e) => setJoinCode(e.target.value)}
                            className="w-full p-2 mb-4 rounded bg-gray-700"
                        />
                        {error && <p className="text-red-400 mb-2">{error}</p>}
                        <div className="flex gap-2">
                            <button
                                onClick={joinMeeting}
                                className="flex-1 py-2 bg-blue-600 rounded hover:bg-blue-700"
                            >
                                Join
                            </button>
                            <button
                                onClick={() => setShowJoinModal(false)}
                                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
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
                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6 animate-quantum-glow">
                        Welcome to Joy_Meet!
                    </h1>
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

export default HomeComponent;