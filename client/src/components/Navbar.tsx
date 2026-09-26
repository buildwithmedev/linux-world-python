import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#070b14]/85 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center font-bold text-black font-mono shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            &gt;_
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base sm:text-lg text-white tracking-tight leading-tight">
              Linux World
            </span>
            <span className="text-[10px] text-cyan-400 font-mono tracking-wider">
              TRAINING &amp; INTERNSHIPS
            </span>
          </div>
        </Link>

        {/* Center / Secondary Links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          <a href="/#curriculum" className="hover:text-cyan-400 transition-colors">
            Curriculum
          </a>
          <a href="/#faq" className="hover:text-cyan-400 transition-colors">
            FAQ
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-xs sm:text-sm text-cyan-400 border border-cyan-500/40 px-3.5 py-1.5 rounded-lg hover:bg-cyan-500/10 transition font-medium"
          >
            Student Login
          </Link>
          <Link
            to="/register"
            className="text-xs sm:text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-4 py-1.5 rounded-lg transition font-medium shadow-md shadow-cyan-500/20"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </nav>
  );
}

export { Navbar };