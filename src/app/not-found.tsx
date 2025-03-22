'use client';

import React from 'react';
import Link from 'next/link';

const NotFoundPage = () => {
   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
         <div className="text-center">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-6">Oops! Page not found.</h2>
            <div className="flex justify-center gap-4">
               <button>
                  <Link href="/" className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition">
                     Home
                  </Link>
               </button>
               <button
                  onClick={() => window.history.back()}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
               >
                  Back
               </button>
            </div>
         </div>
      </div>
   );
};

export default NotFoundPage;
