import React from 'react';
import { Link } from 'react-router-dom';

const CURRICULUM = [
  { day: 1, title: 'Python Architecture & Linux Terminal Basics' },
  { day: 2, title: 'Variables, Data Structures & Control Flow' },
  { day: 3, title: 'Functions, Scopes & Modular Programming' },
  { day: 4, title: 'Linux File Systems & Automated File I/O' },
  { day: 5, title: 'Object-Oriented Programming (OOP) in Python' },
  { day: 6, title: 'Error Handling, Debugging & Logging' },
  { day: 7, title: 'OS Process Management & Subprocesses' },
  { day: 8, title: 'Networking & Socket Programming' },
  { day: 9, title: 'REST APIs, Requests & Web Scraping' },
  { day: 10, title: 'Linux Task Scheduling (Cron & Daemons)' },
  { day: 11, title: 'Database Connectivity (SQLite & MongoDB)' },
  { day: 12, title: 'Docker & Containerizing Python Apps' },
  { day: 13, title: 'CI/CD Pipelines & Cloud Deployment' },
  { day: 14, title: 'Capstone Project & Final Industry Review' },
];

const FAQS = [
  {
    q: 'When do lectures unlock?',
    a: 'Lectures release sequentially every day at 5:30 PM IST with an automated live player countdown.'
  },
  {
    q: 'How do returning students access their videos?',
    a: 'Click "Student Login" in the navbar, enter your registered email address, and proceed straight to the daily portal.'
  },
  {
    q: 'Do I get lifetime access to all lectures?',
    a: 'Yes, once a day unlocks at 5:30 PM, it remains permanently available for review in your student portal.'
  }
];

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-white">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          Batch Enrolling • Daily 5:30 PM Release
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none mb-6">
          Master Python. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
            Build Real Skills.
          </span>{' '}
          Start Your Internship.
        </h1>

        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Learn Python through practical hands-on engineering on Linux. Daily masterclass lectures unlock automatically at 5:30 PM IST.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl transition duration-200 shadow-lg shadow-cyan-500/25 text-sm"
          >
            Enroll Now (₹3,000) →
          </Link>
          <a
            href="#curriculum"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#0f172a] hover:bg-[#1e293b] border border-gray-800 text-gray-300 font-semibold rounded-xl transition duration-200 text-sm"
          >
            Explore Curriculum
          </a>
        </div>
      </section>

      <section id="curriculum" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-800/80">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">14-Day Masterclass Curriculum</h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            From basic terminal navigation to containerized Python deployments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CURRICULUM.map((item) => (
            <div
              key={item.day}
              className="bg-[#0f172a] border border-gray-800/80 rounded-xl p-4 flex items-center justify-between hover:border-cyan-500/40 transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-md">
                  Day {item.day}
                </span>
                <span className="text-sm font-medium text-gray-200">{item.title}</span>
              </div>
              <span className="text-[11px] text-gray-500 font-mono">5:30 PM</span>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-gray-800/80">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-sm">Everything you need to know about the platform.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-[#0f172a] border border-gray-800 rounded-xl p-6">
              <h3 className="text-base font-semibold text-white mb-2">{faq.q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;