/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { useState } from 'react';
import { LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loginMutation] = useLoginMutation();

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Email is required',
      }));
      isValid = false;
    }

    if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password is required',
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // Reset errors before validation
    
    if (validateForm()) {
      try {
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        
        const loginResult = await loginMutation({ 
          email: trimmedEmail, 
          password: trimmedPassword 
        }).unwrap();

        if ('error' in loginResult) {
          const error = loginResult.error as any;
          if (error.data?.message) {
            setErrors({
              email: error.data.message,
              password: error.data.message
            });
          } else {
            setErrors({
              email: 'Invalid email or password',
              password: 'Invalid email or password'
            });
          }
          return;
        }

        if (loginResult.success) {
          toast.success('Login successful');
         
        }
      } catch {
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900">
      {/* Quantum Particle Animation */}
      <div className="particle-container absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 5}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Holographic Grid */}
      <div className="absolute inset-0 bg-[length:40px_40px] bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] animate-grid-drift" />

      {/* Plasma Core */}
      <div className="absolute left-1/2 top-1/3 w-96 h-96 bg-radial-gradient(from_60%_50%,rgba(16,185,129,0.15)_0%,transparent_60%) animate-plasma" />

      <div className="relative flex items-center justify-center min-h-screen p-4">
        <form 
          onSubmit={handleSubmit}
          className="relative w-full max-w-md p-8 space-y-6 bg-gray-800/70 backdrop-blur-lg rounded-xl shadow-2xl transition-all duration-300 hover:shadow-emerald-500/20"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold  mb-2 animate-gradient bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent not-first: bg-clip-text ">
              Welcome Back
            </h1>
            <p className="text-gray-400">Please sign in to continue</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Email
              </label>
              <div className="relative">
                <EnvelopeIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-gray-400 transition-all"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-gray-400 transition-all"
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-emerald-300 hover:to-cyan-300 text-gray-900 font-semibold rounded-lg transition-all transform hover:scale-[1.02] cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>

      <style jsx global>{`
        @keyframes float {
          from { transform: translateY(0px) scale(1); }
          to { transform: translateY(-20px) scale(0.95); }
        }

        .animate-plasma {
          animation: plasma 12s ease-in-out infinite;
        }

        @keyframes plasma {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          50% { transform: translate(-50%, -55%) scale(1.2); opacity: 0.4; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
        }

        .animate-grid-drift {
          animation: gridDrift 20s linear infinite;
        }

        @keyframes gridDrift {
          from { background-position: 0 0; }
          to { background-position: 40px 40px; }
        }
      `}</style>
    </div>
  );
}