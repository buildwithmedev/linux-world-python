import React from 'react';

const HIGHLIGHTS = [
  {
    icon: '⚡',
    title: 'Daily 5:30 PM Release',
    desc: 'Structured 14-day progressive curriculum designed for retention and continuous habit building.'
  },
  {
    icon: '🐧',
    title: 'Linux CLI & Cloud Ready',
    desc: 'Run Python on Linux environments, automate tasks via bash scripts, cron jobs, and Docker containers.'
  },
  {
    icon: '📜',
    title: 'Verified Internship Certificate',
    desc: 'Receive an industry-recognized certificate of internship completion upon submitting the capstone project.'
  },
  {
    icon: '💻',
    title: 'Production Capstone Project',
    desc: 'Deploy a real-world full-stack Python service connected to MongoDB, REST APIs, and containerized runtime.'
  }
];

export default function HighlightsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
          Why Linux World?
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
          Everything You Need to Get Industry Ready
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mt-2">
          Designed specifically for university students, freshers, and engineers transitioning into Linux & backend roles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {HIGHLIGHTS.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#0f172a] border border-gray-800 rounded-2xl p-6 hover:border-cyan-500/40 hover:-translate-y-1 transition duration-200"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-2xl mb-4">
              {item.icon}
            </div>
            <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}