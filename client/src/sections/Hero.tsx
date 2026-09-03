import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Terminal, Code2, Briefcase, ChevronRight, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/20 to-purple-600/20 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute -top-10 right-10 w-96 h-96 bg-indigo-600/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Batch Admissions Open • 2026 Intake
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              Master Python. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
                Build Real Skills.
              </span> <br />
              Start Your Internship.
            </h1>

            <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
              Learn Python through practical training and gain hands-on experience through an internship program powered by Linux World.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/register"
                className="px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
              >
                Enroll for ₹3,000
                <ChevronRight className="w-5 h-5" />
              </Link>
              <a
                href="#course"
                className="px-8 py-4 rounded-xl font-semibold text-slate-300 bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/60 transition-all"
              >
                Explore Course
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80">
              {[
                { label: '8 Weeks Duration', icon: Terminal },
                { label: 'Live Projects', icon: Code2 },
                { label: 'Internship Proof', icon: Briefcase },
                { label: 'Verified Certificate', icon: Award }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Terminal Mockup */}
            <div className="relative rounded-2xl bg-slate-950/90 border border-slate-800 shadow-2xl backdrop-blur-xl p-5 overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-mono text-slate-500">main.py - Linux World Terminal</span>
              </div>

              <div className="py-4 font-mono text-sm space-y-2 text-slate-300">
                <p className="text-purple-400">class <span className="text-yellow-300">Developer</span>:</p>
                <p className="pl-4 text-slate-400">def <span className="text-cyan-400">__init__</span>(self):</p>
                <p className="pl-8 text-slate-300">self.track = <span className="text-green-300">"Python & Internship"</span></p>
                <p className="pl-8 text-slate-300">self.mentor = <span className="text-green-300">"Linux World Expert"</span></p>
                <p className="pl-8 text-slate-300">self.fee = <span className="text-amber-400">3000</span></p>
                <p className="pl-4 text-slate-400">def <span className="text-cyan-400">launch_career</span>(self):</p>
                <p className="pl-8 text-cyan-300">return <span className="text-green-300">"Build. Learn. Create."</span></p>
                <div className="pt-2 text-slate-500">// Output:</div>
                <div className="p-3 bg-slate-900 rounded-lg text-xs text-green-400 font-mono">
                  &gt; Career started. Ready for industry internship.
                </div>
              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute -bottom-6 -left-6 bg-slate-900/90 border border-slate-700/80 p-3.5 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-3">
              <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Internship Opportunity</div>
                <div className="text-[10px] text-slate-400">Real Project Deployment</div>
              </div>
            </div>

            <div className="absolute -top-6 -right-4 bg-slate-900/90 border border-slate-700/80 p-3.5 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Verified Certificate</div>
                <div className="text-[10px] text-slate-400">Linux World Certified</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};