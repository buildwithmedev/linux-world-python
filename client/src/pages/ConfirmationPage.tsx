import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { CheckCircle2, Download, Calendar, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { getStudent } from '../services/api';
import { Student } from '../types';

export const ConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getStudent(id).then(res => {
        if (res.data.success) {
          setStudent(res.data.student);
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      }).finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div className="min-h-screen pt-32 text-center text-slate-400">Loading receipt...</div>;
  if (!student) return <div className="min-h-screen pt-32 text-center text-red-400">Student not found.</div>;

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-slate-950 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/10 rounded-full blur-3xl" />

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-green-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold text-green-400 tracking-widest uppercase">Payment Confirmed</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">Registration Successful 🎉</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Welcome to Linux World Python Training & Internship Program.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 mb-6 space-y-3">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-slate-400">Registration ID</span>
            <span className="font-mono font-bold text-cyan-400">{student.registrationId}</span>
          </div>
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-slate-400">Student Name</span>
            <span className="font-semibold text-white">{student.fullName}</span>
          </div>
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-slate-400">Course</span>
            <span className="font-semibold text-white">{student.course}</span>
          </div>
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-slate-400">Amount Paid</span>
            <span className="font-bold text-green-400">₹{student.amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-slate-400">Payment ID</span>
            <span className="font-mono text-slate-300">{student.paymentId}</span>
          </div>
          <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
            <span className="text-xs sm:text-sm font-semibold text-amber-400 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> Assigned Batch Start Date
            </span>
            <span className="text-xs sm:text-sm font-bold text-white bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
              {student.courseStartDate || '15 September 2026'}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => window.print()}
            className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" /> Download Receipt
          </button>
          <Link
            to="/"
            className="flex-1 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors"
          >
            Return to Homepage <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};