import React from 'react'
import Link from 'next/link';

function Navbar() {
    
  return (
            <nav className=" bg-slate-900  p-4">



                <div className="container mx-auto flex justify-between items-center">
                    <div className=" font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6 animate-quantum-glow">Joy-Meet</div>
                    <div className="hidden md:flex space-x-4">
                        <Link href="/">
                           <li className="text-gray-300 hover:text-white">Home</li>
                        </Link>
                        <Link href="about">
                           <li className="text-gray-300 hover:text-white">About</li>
                        </Link>
                        <Link href="/contact">
                           <li className="text-gray-300 hover:text-white">Contact</li>
                        </Link>
                        <Link href="/login">
                           <li className="text-gray-300 hover:text-white">Login</li>
                        </Link>
                    </div>
                    <div className="md:hidden">
                        <button className="text-gray-300 hover:text-white focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        );
    };

   

export default Navbar