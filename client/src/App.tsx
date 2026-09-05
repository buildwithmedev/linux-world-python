import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { 
  Terminal, 
  ChevronRight, 
  CheckCircle2, 
  ChevronDown, 
  Play,
  Copy,
  Check,
  LogIn,
  Lock
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';
import { StudentCoursePortal } from './pages/StudentCoursePortal';

const API = axios.create({ baseURL: 'https://linux-world-python.onrender.com/api' });

// --- 1. NAVBAR COMPONENT ---
function Navbar() {
  const [showLookup, setShowLookup] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [lookupError, setLookupError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const savedStudentId = localStorage.getItem('linuxworld_active_student');

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLookupError('');
    try {
      const res = await API.post('/student-login', { identifier: identifier.trim() });
      if (res.data.success) {
        setShowLookup(false);
        if (res.data.isVerified) {
          localStorage.setItem('linuxworld_active_student', res.data.student.registrationId);
          navigate(`/portal/${res.data.student.registrationId}`);
        } else {
          // If payment was not verified, redirect to payment page
          navigate(`/payment/${res.data.student.registrationId}`);
        }
      }
    } catch (err: any) {
      setLookupError(err.response?.data?.message || 'No registration found for this mobile/email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white block">Linux World</span>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-cyan-400">Training & Internships</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="/#curriculum" className="hover:text-cyan-400 transition-colors">Curriculum</a>
            <a href="/#faq" className="hover:text-cyan-400 transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            {savedStudentId ? (
              <Link
                to={`/portal/${savedStudentId}`}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Open My Course
              </Link>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setShowLookup(true)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-all flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5 text-cyan-400" /> Already Paid? Access
                </button>
                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:shadow-lg transition-all"
                >
                  Register Now <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full ml-1">₹3,000</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Access Course Lookup Modal */}
      {showLookup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 relative shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-1">Access Enrolled Course</h2>
            <p className="text-xs text-slate-400 mb-4">
              Enter your registered mobile number or email to open your scheduled playlist.
            </p>
            {lookupError && (
              <div className="p-3 mb-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl">
                {lookupError}
              </div>
            )}
            <form onSubmit={handleLookup} className="space-y-4">
              <input
                required
                placeholder="Mobile (e.g. 9799375197) or Email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-cyan-500 outline-none"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all"
                >
                  {loading ? 'Verifying...' : 'Access My Course'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowLookup(false)}
                  className="px-4 py-2.5 rounded-xl text-xs text-slate-400 bg-slate-800 hover:bg-slate-700 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// --- 2. HERO SECTION ---
function HeroSection() {
  const savedStudentId = localStorage.getItem('linuxworld_active_student');

  return (
    <div className="relative min-h-[90vh] pt-32 pb-16 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Batch Admissions Open • 2026 Intake
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              Master Python. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
                Build Real Skills.
              </span> <br />
              Start Your Internship.
            </h1>
            <p className="text-slate-400 text-base sm:text-lg max-w-xl">
              Learn Python through practical training and gain hands-on experience through an internship program powered by Linux World. Daily sessions unlock at 5:30 PM starting September 15.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {savedStudentId ? (
                <Link
                  to={`/portal/${savedStudentId}`}
                  className="px-8 py-4 rounded-xl font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all flex items-center gap-2"
                >
                  Open My Portal <ChevronRight className="w-5 h-5" />
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all flex items-center gap-2"
                >
                  Enroll for ₹3,000 <ChevronRight className="w-5 h-5" />
                </Link>
              )}
              <a
                href="#curriculum"
                className="px-8 py-4 rounded-xl font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-all"
              >
                Explore Syllabus
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 font-mono text-sm shadow-2xl">
              <div className="flex items-center gap-2 pb-4 border-b border-slate-800 text-slate-500 text-xs">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span>main.py - Linux World Terminal</span>
              </div>
              <div className="py-4 space-y-2 text-slate-300">
                <p className="text-purple-400">class <span className="text-yellow-300">Developer</span>:</p>
                <p className="pl-4 text-slate-400">def <span className="text-cyan-400">__init__</span>(self):</p>
                <p className="pl-8 text-slate-300">self.track = <span className="text-green-300">"Python & Internship"</span></p>
                <p className="pl-8 text-slate-300">self.fee = <span className="text-amber-400">3000</span></p>
                <div className="pt-2 text-slate-500">// Output:</div>
                <div className="p-3 bg-slate-950 rounded-lg text-xs text-green-400">
                  &gt; Career started. Ready for industry internship.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 3. CURRICULUM SECTION ---
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

function CurriculumSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section id="curriculum" className="py-24 bg-slate-950 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Syllabus Blueprint
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">Structured Course Curriculum</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((m, index) => (
            <div
              key={m.id}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="cursor-pointer rounded-2xl p-5 border bg-slate-900/60 border-slate-800 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl text-xs font-mono font-bold bg-cyan-500 text-white">0{m.id}</div>
                  <h3 className="text-sm font-bold text-white">{m.title}</h3>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </div>
              {openIndex === index && (
                <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
                  {m.desc}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- 4. REGISTRATION PAGE ---
function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    collegeName: '',
    currentStatus: 'Student',
    city: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError('Please accept the registration terms.');
      return;
    }
    setLoading(true);
    setError('');

    const payload = {
      fullName: formData.fullName.trim(),
      mobile: formData.mobile.trim(),
      email: formData.email.trim().toLowerCase(),
      collegeName: formData.collegeName.trim(),
      currentStatus: formData.currentStatus,
      city: formData.city.trim()
    };

    try {
      const res = await API.post('/register', payload);
      if (res.data.success) {
        navigate(`/payment/${res.data.student.registrationId}`);
      }
    } catch (err: any) {
      const serverMessage = err.response?.data?.message;
      setError(serverMessage || 'Registration submission failed. Check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-slate-950 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-2xl font-black text-white text-center mb-6">Student Registration Form (₹3,000)</h1>
        
        {error && (
          <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              required
              placeholder="Full Name"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-cyan-500 outline-none"
              value={formData.fullName}
              onChange={e => setFormData({ ...formData, fullName: e.target.value })}
            />
            <input
              required
              maxLength={10}
              placeholder="10-Digit Mobile"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-cyan-500 outline-none"
              value={formData.mobile}
              onChange={e => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              required
              type="email"
              placeholder="Email Address"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-cyan-500 outline-none"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              required
              placeholder="College Name"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-cyan-500 outline-none"
              value={formData.collegeName}
              onChange={e => setFormData({ ...formData, collegeName: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-cyan-500 outline-none"
              value={formData.currentStatus}
              onChange={e => setFormData({ ...formData, currentStatus: e.target.value })}
            >
              <option value="Student">Student</option>
              <option value="Graduate">Graduate</option>
              <option value="Working Professional">Working Professional</option>
              <option value="Job Seeker">Job Seeker</option>
            </select>
            <input
              required
              placeholder="City"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-cyan-500 outline-none"
              value={formData.city}
              onChange={e => setFormData({ ...formData, city: e.target.value })}
            />
          </div>
          <label className="flex items-start gap-2 text-xs text-slate-400 pt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className="mt-1"
            />
            I authorize Linux World to use my submitted details for batch enrollment.
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Proceed to Payment (₹3,000)'}
          </button>
        </form>
      </div>
    </div>
  );
}

// --- 5. PAYMENT PAGE (UPDATED WITH MANVENDRA SINGH RATHORE UPI & QR) ---
function PaymentPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [transactionRef, setTransactionRef] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const OFFICIAL_UPI_ID = 'manvendrasinghr97@okicici';
  const PAYEE_NAME = 'Manvendra Singh Rathore';

  useEffect(() => {
    if (id) {
      API.get(`/students/${id}`)
        .then((res) => setStudent(res.data.student))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleVerifyPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionRef.trim() || transactionRef.trim().length < 8) {
      setErrorMsg('Please enter a valid UPI reference number / UTR (min 8-12 digits).');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await API.post('/verify-payment', {
        registrationId: id,
        transactionRef: transactionRef.trim(),
      });

      if (res.data.success) {
        localStorage.setItem('linuxworld_active_student', id!);
        navigate(`/confirmation/${id}`);
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Payment submission failed. Check your reference number.');
    } finally {
      setSubmitting(false);
    }
  };

  const copyUpi = () => {
    navigator.clipboard.writeText(OFFICIAL_UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <div className="min-h-screen pt-32 text-center text-slate-400">Loading payment details...</div>;
  if (!student) return <div className="min-h-screen pt-32 text-center text-red-400">Registration not found.</div>;

  const upiIntentString = `upi://pay?pa=${OFFICIAL_UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${student.amount}&tn=${student.registrationId}&cu=INR`;

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-slate-950 flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-5 shadow-2xl">
        <div>
          <span className="text-xs font-mono text-cyan-400">Registration ID: {student.registrationId}</span>
          <h1 className="text-xl font-black text-white mt-1">Course Enrollment Fee (₹{student.amount})</h1>
          <p className="text-xs text-slate-400 mt-1">Pay to: <strong className="text-slate-200">{PAYEE_NAME}</strong></p>
        </div>

        {/* QR Code Container (Shows uploaded QR or dynamic fallback) */}
        <div className="bg-white p-3 rounded-2xl inline-block shadow-lg max-w-[240px] mx-auto">
          <img
            src="/qr-code.png"
            alt="Google Pay QR Code - Manvendra Singh Rathore"
            className="w-full h-auto rounded-xl object-contain mx-auto"
            onError={(e) => {
              // Fallback dynamically renders if qr-code.png is not found in public/
              (e.target as HTMLElement).style.display = 'none';
              const fallback = document.getElementById('dynamic-qr-fallback');
              if (fallback) fallback.style.display = 'block';
            }}
          />
          <div id="dynamic-qr-fallback" style={{ display: 'none' }}>
            <QRCodeSVG value={upiIntentString} size={200} />
          </div>
          <span className="text-[11px] font-semibold text-slate-700 block mt-2">Scan to pay with any UPI app</span>
        </div>

        {/* Official UPI Copy Bar */}
        <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl text-xs border border-slate-800">
          <div className="text-left">
            <span className="text-[11px] text-slate-400 block">Official UPI ID</span>
            <span className="text-cyan-400 font-mono font-bold">{OFFICIAL_UPI_ID}</span>
          </div>
          <button
            onClick={copyUpi}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
            title="Copy UPI ID"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl">
            {errorMsg}
          </div>
        )}

        {/* Payment Confirmation via Reference / UTR Number */}
        <form onSubmit={handleVerifyPayment} className="space-y-3 pt-2 text-left">
          <div>
            <label className="text-xs text-slate-400 font-semibold block mb-1">
              UPI Reference ID / UTR No. (12 Digits)
            </label>
            <input
              required
              placeholder="e.g. 423589123456"
              value={transactionRef}
              onChange={(e) => setTransactionRef(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-cyan-500 outline-none font-mono"
            />
            <span className="text-[10px] text-slate-500 block mt-1">
              Find this 12-digit number in your Google Pay, PhonePe, or Paytm payment receipt.
            </span>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            {submitting ? 'Verifying Transaction...' : 'Submit UTR & Unlock Course Access'}
          </button>
        </form>
      </div>
    </div>
  );
}

// --- 6. CONFIRMATION PAGE ---
function ConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    if (id) API.get(`/students/${id}`).then(res => setStudent(res.data.student));
  }, [id]);

  if (!student) return <div className="min-h-screen pt-32 text-center text-slate-400">Loading receipt...</div>;

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-slate-950 flex items-center justify-center">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-5">
        <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black text-white">Registration & Payment Confirmed 🎉</h1>
        
        <div className="p-4 bg-slate-950 rounded-xl text-left text-xs space-y-2 text-slate-300 border border-slate-800">
          <div><strong className="text-slate-400">Reg ID:</strong> <span className="font-mono text-cyan-400">{student.registrationId}</span></div>
          <div><strong className="text-slate-400">Student:</strong> {student.fullName}</div>
          <div><strong className="text-slate-400">Amount Paid:</strong> ₹{student.amount}</div>
          <div><strong className="text-slate-400">UTR / Ref:</strong> <span className="font-mono text-green-400">{student.transactionRef}</span></div>
          <div><strong className="text-slate-400">Batch Start Date:</strong> {student.courseStartDate || '15 September 2026'}</div>
        </div>
        
        <Link 
          to={`/portal/${student.registrationId}`} 
          className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
        >
          <Play className="w-4 h-4 fill-current" /> Go to Course Learning Portal (Access Lectures)
        </Link>

        <Link to="/" className="block text-xs text-slate-500 hover:text-slate-400 transition-colors">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}

// --- 7. ADMIN DASHBOARD ---
function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    API.get('/admin/dashboard').then(res => setStats(res.data.data.stats)).catch(() => {});
    API.get('/admin/students').then(res => setStudents(res.data.students)).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen pt-28 p-6 bg-slate-950 text-white max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Linux World Admin Portal</h1>
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400">Registrations</div>
            <div className="text-2xl font-bold">{stats.totalRegistrations}</div>
          </div>
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400">Verified Paid</div>
            <div className="text-2xl font-bold text-green-400">{stats.paidStudents}</div>
          </div>
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400">Pending</div>
            <div className="text-2xl font-bold text-amber-400">{stats.pendingPayments}</div>
          </div>
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400">Total Revenue</div>
            <div className="text-2xl font-bold text-cyan-400">₹{stats.totalRevenue}</div>
          </div>
        </div>
      )}
      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
        <h2 className="text-sm font-bold mb-3">Enrolled Candidates</h2>
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-950 text-slate-400">
              <tr>
                <th className="p-2">Reg ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Status</th>
                <th className="p-2">Transaction Ref</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s._id} className="border-t border-slate-800">
                  <td className="p-2 font-mono text-cyan-400">{s.registrationId}</td>
                  <td className="p-2">{s.fullName}</td>
                  <td className="p-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      s.paymentStatus === 'PAYMENT_VERIFIED' 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {s.paymentStatus}
                    </span>
                  </td>
                  <td className="p-2 font-mono text-slate-300">{s.transactionRef || 'N/A'}</td>
                  <td className="p-2">
                    {s.paymentStatus === 'PAYMENT_VERIFIED' && (
                      <Link 
                        to={`/portal/${s.registrationId}`} 
                        className="text-cyan-400 hover:underline"
                        target="_blank"
                      >
                        View Portal
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- MAIN APP ROUTER ---
export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<><HeroSection /><CurriculumSection /></>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/payment/:id" element={<PaymentPage />} />
        <Route path="/confirmation/:id" element={<ConfirmationPage />} />
        <Route path="/portal/:id" element={<StudentCoursePortal />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}