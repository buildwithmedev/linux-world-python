import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-gray-800/80 bg-[#050811] text-gray-400 text-xs sm:text-sm py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-cyan-500 flex items-center justify-center font-bold text-black font-mono text-xs">
              &gt;_
            </div>
            <span className="font-extrabold text-base text-white tracking-tight">Linux World</span>
          </div>
          <p className="text-gray-400 text-xs max-w-md leading-relaxed">
            Empowering college students and developers with hands-on Linux, Python, and system engineering skills. Structured daily releases with practical project assignments.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Quick Navigation</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/" className="hover:text-cyan-400 transition">Home</Link></li>
            <li><Link to="/register" className="hover:text-cyan-400 transition">Enroll Now (₹300)</Link></li>
            <li><Link to="/login" className="hover:text-cyan-400 transition">Student Login</Link></li>
            <li><a href="/#curriculum" className="hover:text-cyan-400 transition">14-Day Curriculum</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Support & Help</h4>
          <ul className="space-y-2 text-xs">
            <li>Daily Release: 5:30 PM IST</li>
            <li>Access: Lifetime on Unlocked Days</li>
            <li>Format: Online Masterclass</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
        <p>© 2026 Linux World Training &amp; Internships. All rights reserved.</p>
        <div className="flex gap-4">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Refund Policy</span>
        </div>
      </div>
    </footer>
  );
}