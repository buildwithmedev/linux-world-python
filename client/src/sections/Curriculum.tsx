import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, BookOpen, Layers, Terminal } from 'lucide-react';

const modules = [
  { id: 1, title: 'Module 1: Python Fundamentals', desc: 'Syntax, dynamic typing, variables, memory addressing, operators, and CLI tooling.' },
  { id: 2, title: 'Module 2: Control Flow & Functions', desc: 'Conditional execution, loops, custom functions, lambda expressions, and scope resolution.' },
  { id: 3, title: 'Module 3: Data Structures', desc: 'Deep dive into Lists, Tuples, Dictionaries, Sets, and complex comprehensions.' },
  { id: 4, title: 'Module 4: Object-Oriented Programming (OOP)', desc: 'Classes, Objects, Inheritance, Encapsulation, Polymorphism, and Magic Methods.' },
  { id: 5, title: 'Module 5: File Handling & Exception Management', desc: 'I/O operations, JSON/CSV parsing, Context Managers, and custom exception handling.' },
  { id: 6, title: 'Module 6: Modules, Packages & REST APIs', desc: 'Package authoring, pip ecosystem, requests module, RESTful integrations, and parsing.' },
  { id: 7, title: 'Module 7: Database Integration with Python', desc: 'Connecting with SQLite & MongoDB, CRUD architectures, and ORM basics.' },
  { id: 8, title: 'Module 8: Git & GitHub Collaborative Workflows', desc: 'Version control, branching workflows, PR lifecycles, and code review standards.' },
  { id: 9, title: 'Module 9: Real-World Capstone Project', desc: 'End-to-end backend service/script with production architecture and automation.' },
  { id: 10, title: 'Module 10: Linux World Internship Experience', desc: 'Practical team internship, sprint reviews, mentor evaluations, and portfolio sign-off.' }
];

export const Curriculum: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="curriculum" className="py-24 bg-slate-950/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Syllabus Blueprint
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            Structured Course Curriculum
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Engineered from fundamental programming concepts to production-grade project development and internship practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((m, index) => (
            <div
              key={m.id}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className={`cursor-pointer rounded-2xl p-5 border transition-all ${
                openIndex === index 
                  ? 'bg-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-950/20' 
                  : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl text-xs font-mono font-bold ${openIndex === index ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-300'}`}>
                    0{m.id}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white">{m.title}</h3>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openIndex === index ? 'rotate-180 text-cyan-400' : ''}`} />
              </div>

              {openIndex === index && (
                <div className="mt-3 pt-3 border-t border-slate-800 text-xs sm:text-sm text-slate-400 leading-relaxed animate-in fade-in duration-200">
                  {m.desc}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};