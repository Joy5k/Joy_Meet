'use client'

import React, { useEffect } from 'react'

function AboutUs() {
  useEffect(() => {
    const createFloatingShapes = () => {
      const container = document.querySelector('.floating-shapes');
      const shapes = ['polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', 'circle(50% at 50% 50%)'];
      
      for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        shape.className = 'absolute w-8 h-8 bg-cyan-500/10 backdrop-blur-sm';
        shape.style.clipPath = shapes[Math.floor(Math.random() * shapes.length)];
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.animation = `
          float ${15 + Math.random() * 10}s ease-in-out infinite ${Math.random() * 5}s,
          pulse ${4 + Math.random() * 4}s ease-in-out infinite
        `;
        if (container) {
          container.appendChild(shape);
        }
      }
    };

    createFloatingShapes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-blue-950 text-gray-100 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="floating-shapes absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[length:40px_40px] bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] animate-grid-drift" />
      <div className="absolute left-1/2 top-1/3 w-96 h-96 bg-radial-gradient(from_60%_50%,rgba(16,185,129,0.15)_0%,transparent_60%) animate-plasma" />

      {/* Content Container */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10">
        {/* Animated Hero Section */}
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4 animate-gradient-flow">
              Mehedi Hasan
            </h1>
            <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#06b6d450_0%,#3b82f660_25%,#06b6d450_50%)] opacity-30 blur-3xl animate-conic-sweep" />
          </div>
          <p className="text-xl md:text-2xl text-cyan-200 font-light animate-text-float">
            Full Stack Developer & Problem Solver
          </p>
        </div>

        {/* Introduction Paragraph with Typing Effect */}
        <div className="max-w-3xl mx-auto mb-24 text-center relative group">
          <div className="absolute inset-0 bg-cyan-500/10 rounded-3xl transform group-hover:scale-105 transition-all duration-500" />
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed relative z-10 p-8">
            {`Hi, I'm Mehedi Hasan, a passionate full-stack developer from Bangladesh. I specialize in `.split(' ').map((word, i) => (
              <span key={i} className="opacity-0 animate-text-reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                {word}{' '}
              </span>
            ))}
            <span className="text-cyan-400">
              {`JavaScript, TypeScript, React.js, Next.js, Node.js,  `.split(', ').map((tech, i) => (
                <span key={i} className="opacity-0 animate-text-reveal" style={{ animationDelay: `${i * 0.2 + 2}s` }}>
                  {tech}
                  {i < 4 ? ', ' : ''}
                </span>
              ))}
            </span>
            {`and various backend technologies. With expertise in both frontend and backend development, I build full-stack applications using modern tools like `.split(' ').map((word, i) => (
              <span key={i} className="opacity-0 animate-text-reveal" style={{ animationDelay: `${i * 0.1 + 4}s` }}>
                {word}{' '}
              </span>
            ))}
            <span className="text-cyan-400">
              {`Redux, Material-UI, Express.js, MongoDB, Mongoose, PostgreSQL, and Prisma.`.split(', ').map((tech, i) => (
                <span key={i} className="opacity-0 animate-text-reveal" style={{ animationDelay: `${i * 0.2 + 6}s` }}>
                  {tech}
                  {i < 6 ? ', ' : ''}
                </span>
              ))}
            </span>
          </p>
        </div>

        {/* Enhanced Skills Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          {/* Technical Expertise */}
          <div className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(8,145,178,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shine" />
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">Technical Arsenal</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl">
                <h3 className="font-semibold text-cyan-400 mb-2">Frontend Mastery</h3>
                <ul className="space-y-1 text-sm text-gray-400">
                  {['JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Redux', 'Material-UI'].map((item, i) => (
                    <li key={i} className="opacity-0 animate-text-reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                      → {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <h3 className="font-semibold text-cyan-400 mb-2">Backend Expertise</h3>
                <ul className="space-y-1 text-sm text-gray-400">
                  {['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Prisma', 'Mongoose'].map((item, i) => (
                    <li key={i} className="opacity-0 animate-text-reveal" style={{ animationDelay: `${i * 0.1 + 0.3}s` }}>
                      → {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Problem Solving Achievements */}
          <div className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(8,145,178,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shine" />
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">Problem Solving Prowess</h2>
            <div className="space-y-4">
              {[
                { platform: 'HackerRank', count: '170+', description: 'Algorithm challenges solved with optimal solutions' },
                { platform: 'LeetCode', count: '10+', description: 'Data structure problems conquered' },
                { platform: 'Real-World', count: '5+', description: 'Complex technical issues debugged' }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="text-cyan-400 text-xl font-bold">{item.count}</div>
                    <div>
                      <h3 className="font-semibold">{item.platform}</h3>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="mt-16 text-center animate-fade-in">
          <div className="inline-block max-w-2xl relative">
            <div className="absolute -inset-4 bg-cyan-500/10 rounded-3xl blur-3xl opacity-30 animate-pulse" />
            <div className="text-cyan-400 text-2xl mb-4 animate-float">
             
            </div>
            <p className="text-xl text-gray-300 font-light relative z-10">
              {`I thrive on transforming complex challenges into elegant solutions. My development philosophy combines `.split(' ').map((word, i) => (
                <span key={i} className="opacity-0 animate-text-reveal" style={{ animationDelay: `${i * 0.05}s` }}>
                  {word}{' '}
                </span>
              ))}
              <span className="text-cyan-400">
                {`clean code architecture, performance optimization, `.split(', ').map((tech, i) => (
                  <span key={i} className="opacity-0 animate-text-reveal" style={{ animationDelay: `${i * 0.1 + 2}s` }}>
                    {tech}
                  </span>
                ))}
              </span>
              {`and user-centric design. I'm committed to continuous learning and pushing the boundaries of web development.`.split(' ').map((word, i) => (
                <span key={i} className="opacity-0 animate-text-reveal" style={{ animationDelay: `${i * 0.05 + 3}s` }}>
                  {word}{' '}
                </span>
              ))}
            </p>
            <div className="mt-8 relative z-10">
              <a href="#contact" className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-semibold rounded-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                <span className="relative z-10">Let&apos;s Collaborate</span>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shine" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }

        @keyframes shine {
          to { background-position: 200% center; }
        }

        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes conic-sweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes text-reveal {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes text-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .animate-gradient-flow {
          background-size: 200% auto;
          animation: gradient-flow 8s ease infinite;
        }

        .animate-conic-sweep {
          animation: conic-sweep 20s linear infinite;
        }

        .animate-shine {
          animation: shine 5s linear infinite;
        }

        .animate-text-reveal {
          animation: text-reveal 0.5s ease forwards;
        }

        .animate-text-float {
          animation: text-float 6s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default AboutUs