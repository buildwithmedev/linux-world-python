import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Module {
  day: number;
  title: string;
  videoId: string;
  description: string;
  starterCode?: string;
  taskTitle?: string;
}

// Full Masterclass Schedule
const MODULES: Module[] = [
  {
    day: 1,
    title: 'Python Architecture & Linux Terminal Basics',
    videoId: '_uQrJ0TkZlc',
    description: 'Setting up developer tooling, shell automation, and core syntax fundamentals.',
    starterCode: '# Day 1 Starter Code\nimport sys\nimport os\n\nprint(f"Running Python {sys.version}")\nprint(f"Current Directory: {os.getcwd()}")',
    taskTitle: 'Set up virtualenv on Linux and inspect sys.version in a script.'
  },
  {
    day: 2,
    title: 'Variables, Data Structures & Control Flow',
    videoId: 'rfscVS0vtbw',
    description: 'Lists, dictionaries, tuples, sets, branching conditions, and loop logic.',
    starterCode: '# Day 2 Data Structures\nserver_nodes = ["192.168.1.10", "192.168.1.11", "192.168.1.12"]\nstatus_map = {ip: "online" for ip in server_nodes}\nprint(status_map)',
    taskTitle: 'Write a script that parses a log list and generates a frequency dictionary of IPs.'
  },
  {
    day: 3,
    title: 'Functions, Scopes & Modular Programming',
    videoId: 'DPz4bQ9xH_4',
    description: 'Reusable functions, args/kwargs, modules, packages, and virtual environments.',
    starterCode: 'def monitor_service(service_name, *args, **kwargs):\n    print(f"Checking {service_name} with params: {kwargs}")\n\nmonitor_service("nginx", timeout=5, retries=3)',
    taskTitle: 'Build a modular CLI calculator with variable argument parsers.'
  },
  {
    day: 4,
    title: 'Linux File Systems & Automated File I/O',
    videoId: '_uQrJ0TkZlc',
    description: 'File streams, directory manipulation, log parsing, and regex pattern searches.',
    starterCode: 'import re\n\nwith open("/var/log/syslog", "r") as f:\n    errors = [line for line in f if re.search(r"ERROR|FAIL", line)]\nprint(f"Found {len(errors)} error entries.")',
    taskTitle: 'Automate search and extraction of timestamped error lines from a sample log.'
  },
  {
    day: 5,
    title: 'Object-Oriented Programming (OOP) in Python',
    videoId: 'rfscVS0vtbw',
    description: 'Classes, inheritance, encapsulation, polymorphism, and magic dunder methods.',
    starterCode: 'class LinuxDaemon:\n    def __init__(self, name):\n        self.name = name\n    def start(self):\n        print(f"Starting {self.name} service...")',
    taskTitle: 'Create a ServerManager class hierarchy managing WebServer and DBServer instances.'
  },
  {
    day: 6,
    title: 'Error Handling, Debugging & Logging',
    videoId: 'DPz4bQ9xH_4',
    description: 'Custom exceptions, stack trace debugging, and production logging frameworks.',
    starterCode: 'import logging\n\nlogging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")\nlogging.info("Masterclass daemon initialized.")',
    taskTitle: 'Implement rotating file handlers to prevent log overflow on Linux.'
  },
  {
    day: 7,
    title: 'OS Process Management & Subprocesses',
    videoId: '_uQrJ0TkZlc',
    description: 'Controlling Linux processes, running shell commands via subprocess, and signals.',
    starterCode: 'import subprocess\n\nresult = subprocess.run(["uname", "-a"], capture_output=True, text=True)\nprint(result.stdout)',
    taskTitle: 'Write a script to check CPU utilization via subprocess and alert if above 80%.'
  },
  {
    day: 8,
    title: 'Networking & Socket Programming',
    videoId: 'rfscVS0vtbw',
    description: 'TCP/UDP sockets, packet routing, ports, and building basic network tools.',
    starterCode: 'import socket\n\ns = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\ns.settimeout(2.0)\nstatus = s.connect_ex(("127.0.0.1", 80))\nprint("Port 80 open" if status == 0 else "Port 80 closed")',
    taskTitle: 'Build a multi-port scanner that scans localhost ports 20 through 100.'
  },
  {
    day: 9,
    title: 'REST APIs, Requests & Web Scraping',
    videoId: 'DPz4bQ9xH_4',
    description: 'Interacting with external APIs, handling JSON, and parsing web data with BeautifulSoup.',
    starterCode: 'import requests\n\nresp = requests.get("https://api.github.com")\nprint("Status:", resp.status_code)\nprint(resp.json())',
    taskTitle: 'Fetch public user repository lists from GitHub API and summarize them into a CSV.'
  },
  {
    day: 10,
    title: 'Linux Task Scheduling (Cron & Daemons)',
    videoId: '_uQrJ0TkZlc',
    description: 'Writing Python daemons, cron automated scripts, and systemd service creation.',
    starterCode: '# 0 17 * * * /usr/bin/python3 /opt/automation/run_task.py\nimport datetime\nprint(f"Scheduled cron job triggered at {datetime.datetime.now()}")',
    taskTitle: 'Write a systemd unit configuration file to manage a persistent Python loop daemon.'
  },
  {
    day: 11,
    title: 'Database Connectivity (SQLite & MongoDB)',
    videoId: 'rfscVS0vtbw',
    description: 'CRUD operations, database drivers, indexing, and ORM basics.',
    starterCode: 'import sqlite3\n\nconn = sqlite3.connect("masterclass.db")\ncur = conn.cursor()\ncur.execute("CREATE TABLE IF NOT EXISTS metrics (id INTEGER PRIMARY KEY, val TEXT)")\nconn.commit()',
    taskTitle: 'Write a dual-database syncing function moving records from SQLite to MongoDB Atlas.'
  },
  {
    day: 12,
    title: 'Docker & Containerizing Python Apps',
    videoId: 'DPz4bQ9xH_4',
    description: 'Dockerfiles, container images, volume mounts, and network bridges on Linux.',
    starterCode: '# Dockerfile reference\nFROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nCMD ["python", "app.py"]',
    taskTitle: 'Build and run your custom Python API inside a lightweight Docker container.'
  },
  {
    day: 13,
    title: 'CI/CD Pipelines & Cloud Deployment',
    videoId: '_uQrJ0TkZlc',
    description: 'Deploying servers to cloud VMs, reverse proxies (Nginx), and automated builds.',
    starterCode: '# GitHub Actions Workflow sample\nname: Python CI\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - run: python -m unittest discover',
    taskTitle: 'Set up an automated GitHub Actions lint test pipeline for Python code.'
  },
  {
    day: 14,
    title: 'Capstone Project & Final Industry Review',
    videoId: 'rfscVS0vtbw',
    description: 'Full-stack automation engine walkthrough, review, and certification summary.',
    starterCode: '# Capstone Entry Point\ndef main():\n    print("Welcome to Linux World Python Capstone Project Engine")\n\nif __name__ == "__main__":\n    main()',
    taskTitle: 'Submit your GitHub repository link and production VM URL for final verification.'
  }
];

// Anchored Live Start Date: September 16, 2026 at 17:30:00 IST (+05:30)
const BATCH_START_TIMESTAMP = new Date('2026-09-16T17:30:00+05:30').getTime();

export default function StudentCoursePortal() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(1);
  const [unlockedDays, setUnlockedDays] = useState<number[]>([]);
  const [countdownText, setCountdownText] = useState('');
  const [isCurrentSelectedUnlocked, setIsCurrentSelectedUnlocked] = useState(false);
  const [currentIstTime, setCurrentIstTime] = useState('');
  const [activeTab, setActiveTab] = useState<'notes' | 'doubts' | 'submission'>('notes');
  const [copiedCode, setCopiedCode] = useState(false);

  // In-portal doubts system state
  const [doubts, setDoubts] = useState<Array<{ id: number; author: string; text: string; time: string }>>([
    { id: 1, author: 'Student (Batch 1)', text: 'Can we run these scripts in WSL Ubuntu on Windows?', time: '10 mins ago' },
    { id: 2, author: 'Linux World Mentor', text: 'Yes! WSL2 with Ubuntu gives you identical native bash and socket behaviors.', time: '5 mins ago' }
  ]);
  const [newQuestion, setNewQuestion] = useState('');

  // Assignment submission link state
  const [submissionLink, setSubmissionLink] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const studentEmail = localStorage.getItem('student_email') || 'student@linuxworld.com';

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

  const handleCopyCode = () => {
    if (activeModule.starterCode) {
      navigator.clipboard.writeText(activeModule.starterCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handlePostDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    setDoubts([
      ...doubts,
      {
        id: Date.now(),
        author: studentEmail.split('@')[0],
        text: newQuestion.trim(),
        time: 'Just now'
      }
    ]);
    setNewQuestion('');
  };

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionLink.trim()) return;
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
    setSubmissionLink('');
  };

  const progressPercent = Math.round((unlockedDays.length / MODULES.length) * 100);

  return (
    <div className="min-h-screen bg-[#070b14] text-white pt-20 px-4 sm:px-8 pb-16">
      <div className="max-w-7xl mx-auto">
        {/* Top Header with Real-Time IST Badge & Student Quick Info */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-800 pb-5 mb-6 gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                Daily 5:30 PM Live Loop Batch
              </span>
              <span className="bg-emerald-950 text-emerald-400 border border-emerald-800/80 text-[11px] px-2 py-0.5 rounded font-mono">
                IST: {currentIstTime || 'Syncing...'}
              </span>
              <span className="bg-[#1e293b] text-gray-300 text-[11px] px-2 py-0.5 rounded border border-gray-700">
                {studentEmail}
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

        {/* Progress Tracker Bar */}
        <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-3.5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs text-gray-400 font-medium">Batch Progress:</span>
            <div className="w-full sm:w-48 bg-gray-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-mono text-cyan-400 font-semibold">{progressPercent}%</span>
          </div>
          <div className="text-xs text-gray-400">
            <span className="text-emerald-400 font-semibold">{unlockedDays.length}</span> of {MODULES.length} Lectures Unlocked
          </div>
        </div>

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

            {/* Video Controls & Information */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2.5 py-0.5 rounded font-semibold">
                    Day {activeModule.day}
                  </span>
                  <h2 className="text-xl font-bold text-white">{activeModule.title}</h2>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{activeModule.description}</p>
              </div>

              {/* Prev / Next Navigation Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  disabled={selectedDay === 1}
                  onClick={() => setSelectedDay((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-1.5 rounded-lg bg-[#1e293b] border border-gray-700 text-xs font-medium text-gray-300 hover:text-white hover:border-gray-500 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  ← Previous
                </button>
                <button
                  disabled={selectedDay === MODULES.length}
                  onClick={() => setSelectedDay((prev) => Math.min(MODULES.length, prev + 1))}
                  className="px-3 py-1.5 rounded-lg bg-[#1e293b] border border-gray-700 text-xs font-medium text-gray-300 hover:text-white hover:border-gray-500 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Interactive Sub-Tabs Section (Notes, Q&A, Tasks) */}
            <div className="mt-8 bg-[#0f172a] border border-gray-800 rounded-2xl p-6">
              {/* Tab Headers */}
              <div className="flex border-b border-gray-800 pb-3 mb-6 gap-6 text-xs sm:text-sm font-medium">
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`pb-3 -mb-3 transition cursor-pointer ${
                    activeTab === 'notes'
                      ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  📝 Notes &amp; Code
                </button>
                <button
                  onClick={() => setActiveTab('doubts')}
                  className={`pb-3 -mb-3 transition cursor-pointer ${
                    activeTab === 'doubts'
                      ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  💬 Doubt Forum ({doubts.length})
                </button>
                <button
                  onClick={() => setActiveTab('submission')}
                  className={`pb-3 -mb-3 transition cursor-pointer ${
                    activeTab === 'submission'
                      ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  🚀 Daily Task
                </button>
              </div>

              {/* Tab 1: Notes & Code */}
              {activeTab === 'notes' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Day {activeModule.day} Starter Script:</span>
                    <button
                      onClick={handleCopyCode}
                      className="px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg text-xs font-mono transition cursor-pointer"
                    >
                      {copiedCode ? '✓ Copied!' : 'Copy Code'}
                    </button>
                  </div>
                  <pre className="p-4 bg-[#070b14] border border-gray-800 rounded-xl text-xs font-mono text-cyan-300 overflow-x-auto">
                    <code>{activeModule.starterCode || '# No code required for this module.'}</code>
                  </pre>
                  <div className="p-3.5 rounded-xl bg-[#1e293b]/40 border border-gray-800 text-xs text-gray-300 leading-relaxed">
                    💡 <strong className="text-white">Pro-tip:</strong> Run this script natively on Linux or inside WSL with{' '}
                    <code className="bg-black/50 px-1.5 py-0.5 rounded text-cyan-400">python3 script.py</code>.
                  </div>
                </div>
              )}

              {/* Tab 2: Doubt Forum (Interactive Q&A) */}
              {activeTab === 'doubts' && (
                <div className="space-y-5">
                  <form onSubmit={handlePostDoubt} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ask a technical doubt about this lecture..."
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      className="flex-1 bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl text-xs font-semibold cursor-pointer shrink-0 transition"
                    >
                      Post Doubt
                    </button>
                  </form>

                  <div className="space-y-3">
                    {doubts.map((d) => (
                      <div key={d.id} className="p-3 bg-[#070b14] border border-gray-800 rounded-xl text-xs">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-cyan-400">{d.author}</span>
                          <span className="text-[10px] text-gray-500 font-mono">{d.time}</span>
                        </div>
                        <p className="text-gray-300">{d.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Daily Task Submission */}
              {activeTab === 'submission' && (
                <div className="space-y-4 text-xs">
                  <div className="p-4 bg-[#070b14] border border-gray-800 rounded-xl">
                    <span className="text-cyan-400 font-bold uppercase tracking-wider text-[11px] block mb-1">
                      Hands-on Challenge:
                    </span>
                    <p className="text-white font-medium text-sm">
                      {activeModule.taskTitle || 'Complete the hands-on lab demonstrated in today’s session.'}
                    </p>
                  </div>

                  {isSubmitted && (
                    <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500 text-emerald-300 text-xs">
                      ✓ Assignment submitted successfully for evaluation!
                    </div>
                  )}

                  <form onSubmit={handleAssignmentSubmit} className="space-y-3">
                    <label className="text-gray-400 block">
                      Submit your GitHub repository or commit URL:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        required
                        placeholder="https://github.com/your-username/linux-python-task"
                        value={submissionLink}
                        onChange={(e) => setSubmissionLink(e.target.value)}
                        className="flex-1 bg-[#1e293b] border border-gray-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold cursor-pointer shrink-0 transition"
                      >
                        Submit Lab
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Full 14-Day Schedule Sidebar */}
          <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-5 flex flex-col max-h-[820px]">
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