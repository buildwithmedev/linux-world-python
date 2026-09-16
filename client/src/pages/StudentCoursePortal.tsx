import React, { useState, useEffect } from 'react';

interface Module {
  day: number;
  title: string;
  videoId: string;
  description: string;
}

// Full Masterclass Schedule
const MODULES: Module[] = [
  {
    day: 1,
    title: 'Python Architecture & Linux Terminal Basics',
    videoId: '_uQrJ0TkZlc',
    description: 'Setting up developer tooling, shell automation, and core syntax fundamentals.'
  },
  {
    day: 2,
    title: 'Variables, Data Structures & Control Flow',
    videoId: 'rfscVS0vtbw',
    description: 'Lists, dictionaries, tuples, sets, branching conditions, and loop logic.'
  },
  {
    day: 3,
    title: 'Functions, Scopes & Modular Programming',
    videoId: 'DPz4bQ9xH_4',
    description: 'Reusable functions, args/kwargs, modules, packages, and virtual environments.'
  },
  {
    day: 4,
    title: 'Linux File Systems & Automated File I/O',
    videoId: '_uQrJ0TkZlc',
    description: 'File streams, directory manipulation, log parsing, and regex pattern searches.'
  },
  {
    day: 5,
    title: 'Object-Oriented Programming (OOP) in Python',
    videoId: 'rfscVS0vtbw',
    description: 'Classes, inheritance, encapsulation, polymorphism, and magic dunder methods.'
  },
  {
    day: 6,
    title: 'Error Handling, Debugging & Logging',
    videoId: 'DPz4bQ9xH_4',
    description: 'Custom exceptions, stack trace debugging, and production logging frameworks.'
  },
  {
    day: 7,
    title: 'OS Process Management & Subprocesses',
    videoId: '_uQrJ0TkZlc',
    description: 'Controlling Linux processes, running shell commands via subprocess, and signals.'
  },
  {
    day: 8,
    title: 'Networking & Socket Programming',
    videoId: 'rfscVS0vtbw',
    description: 'TCP/UDP sockets, packet routing, ports, and building basic network tools.'
  },
  {
    day: 9,
    title: 'REST APIs, Requests & Web Scraping',
    videoId: 'DPz4bQ9xH_4',
    description: 'Interacting with external APIs, handling JSON, and parsing web data with BeautifulSoup.'
  },
  {
    day: 10,
    title: 'Linux Task Scheduling (Cron & Daemons)',
    videoId: '_uQrJ0TkZlc',
    description: 'Writing Python daemons, cron automated scripts, and systemd service creation.'
  },
  {
    day: 11,
    title: 'Database Connectivity (SQLite & MongoDB)',
    videoId: 'rfscVS0vtbw',
    description: 'CRUD operations, database drivers, indexing, and ORM basics.'
  },
  {
    day: 12,
    title: 'Docker & Containerizing Python Apps',
    videoId: 'DPz4bQ9xH_4',
    description: 'Dockerfiles, container images, volume mounts, and network bridges on Linux.'
  },
  {
    day: 13,
    title: 'CI/CD Pipelines & Cloud Deployment',
    videoId: '_uQrJ0TkZlc',
    description: 'Deploying servers to cloud VMs, reverse proxies (Nginx), and automated builds.'
  },
  {
    day: 14,
    title: 'Capstone Project & Final Industry Review',
    videoId: 'rfscVS0vtbw',
    description: 'Full-stack automation engine walkthrough, review, and certification summary.'
  }
];

// Anchored Live Start Date: September 16, 2026 at 17:30:00 IST (+05:30)
const BATCH_START_TIMESTAMP = new Date('2026-09-16T17:30:00+05:30').getTime();

export default function StudentCoursePortal() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [unlockedDays, setUnlockedDays] = useState<number[]>([]);
  const [countdownText, setCountdownText] = useState('');
  const [isCurrentSelectedUnlocked, setIsCurrentSelectedUnlocked] = useState(false);
  const [currentIstTime, setCurrentIstTime] = useState('');

  useEffect(() => {
    const evaluateAccess = () => {
      const now = Date.now();

      // Show live running clock in Indian Standard Time (IST)
      const istString = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(new Date(now));
      setCurrentIstTime(istString);

      // Day 1 unlocks at BATCH_START_TIMESTAMP.
      // Day N unlocks at BATCH_START_TIMESTAMP + (N - 1) * 24 hours.
      const oneDayMs = 24 * 60 * 60 * 1000;
      const unlocked: number[] = [];

      MODULES.forEach((mod) => {
        const modUnlockTimestamp = BATCH_START_TIMESTAMP + (mod.day - 1) * oneDayMs;
        if (now >= modUnlockTimestamp) {
          unlocked.push(mod.day);
        }
      });

      setUnlockedDays(unlocked);

      const targetSelectedUnlockTime = BATCH_START_TIMESTAMP + (selectedDay - 1) * oneDayMs;

      if (now >= targetSelectedUnlockTime) {
        setIsCurrentSelectedUnlocked(true);

        const nextDayUnlockTime = targetSelectedUnlockTime + oneDayMs;
        const diffNext = nextDayUnlockTime - now;

        if (diffNext > 0 && selectedDay < MODULES.length) {
          const h = Math.floor(diffNext / (1000 * 60 * 60));
          const m = Math.floor((diffNext % (1000 * 60 * 60)) / (1000 * 60));
          const s = Math.floor((diffNext % (1000 * 60)) / 1000);
          setCountdownText(`Day ${selectedDay + 1} unlocks in ${h}h ${m}m ${s}s`);
        } else {
          setCountdownText('Lecture is Live & Unlocked');
        }
      } else {
        setIsCurrentSelectedUnlocked(false);
        const diff = targetSelectedUnlockTime - now;
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdownText(`Starts in ${h}h ${m}m ${s}s (at 5:30 PM IST)`);
      }
    };

    evaluateAccess();
    const interval = setInterval(evaluateAccess, 1000);
    return () => clearInterval(interval);
  }, [selectedDay]);

  const activeModule = MODULES.find((m) => m.day === selectedDay) || MODULES[0];

  return (
    <div className="min-h-screen bg-[#070b14] text-white pt-20 px-4 sm:px-8 pb-10">
      <div className="max-w-7xl mx-auto">
        {/* Top Header with Real-Time IST Badge */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-800 pb-5 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                Daily 5:30 PM Live Loop Batch
              </span>
              <span className="bg-emerald-950 text-emerald-400 border border-emerald-800/80 text-[11px] px-2 py-0.5 rounded font-mono">
                IST: {currentIstTime || 'Syncing...'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mt-1 text-white">
              Linux World Python Masterclass
            </h1>
          </div>
          <div className="bg-[#0f172a] border border-cyan-500/30 px-4 py-2.5 rounded-xl text-left sm:text-right">
            <div className="text-[11px] text-gray-400">Schedule Status</div>
            <div className="text-cyan-400 font-mono font-medium text-sm">{countdownText}</div>
          </div>
        </header>

        {/* Video Player & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Player Screen */}
          <div className="lg:col-span-2 space-y-4">
            <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden border border-gray-800 shadow-2xl relative">
              {isCurrentSelectedUnlocked ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${activeModule.videoId}?autoplay=1&rel=0`}
                  title={activeModule.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-[#090e1a]">
                  <div className="w-16 h-16 rounded-full bg-cyan-950/70 border border-cyan-500/40 flex items-center justify-center text-2xl mb-4 animate-pulse">
                    🔒
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Day {activeModule.day} Begins at 5:30:00 PM IST
                  </h3>
                  <p className="text-gray-400 text-sm max-w-sm mb-5">
                    This video starts automatically the moment the countdown hits zero. No manual page refresh required.
                  </p>
                  <div className="inline-block px-5 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 font-mono text-base font-bold shadow-lg shadow-cyan-500/10">
                    {countdownText}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2.5 py-0.5 rounded font-semibold">
                  Day {activeModule.day}
                </span>
                <h2 className="text-xl font-bold text-white">{activeModule.title}</h2>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{activeModule.description}</p>
            </div>
          </div>

          {/* Full 14-Day Schedule Sidebar */}
          <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-5 flex flex-col max-h-[620px]">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800 mb-3">
              <h3 className="font-bold text-base text-cyan-300">Curriculum Schedule</h3>
              <span className="text-xs text-gray-400">{MODULES.length} Days</span>
            </div>

            <div className="space-y-2.5 overflow-y-auto pr-1">
              {MODULES.map((mod) => {
                const isUnlocked = unlockedDays.includes(mod.day);
                const isSelected = selectedDay === mod.day;

                return (
                  <button
                    key={mod.day}
                    onClick={() => setSelectedDay(mod.day)}
                    className={`w-full text-left p-3.5 rounded-xl border transition cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-sm'
                        : 'bg-[#1e293b]/40 border-transparent text-gray-400 hover:text-white hover:bg-[#1e293b]/70'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold uppercase text-cyan-400">
                        Day {mod.day}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                          isUnlocked
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-gray-800 text-gray-400'
                        }`}
                      >
                        {isUnlocked ? 'Unlocked' : '5:30 PM Batch'}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-gray-200 line-clamp-1">
                      {mod.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { StudentCoursePortal };