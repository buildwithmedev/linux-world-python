import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, User, Mail, Phone, School, MapPin } from 'lucide-react';
import { registerStudent } from '../services/api';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    collegeName: '',
    currentStatus: 'Student',
    city: '',
    message: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError('Please agree to terms and conditions.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await registerStudent(formData);
      if (response.data.success) {
        const student = response.data.student;
        navigate(`/payment/${student.registrationId}`);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please check your fields.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-slate-950 flex items-center justify-center relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative z-10"
      >
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full uppercase tracking-wider border border-cyan-500/20">
            Step 1 of 2: Registration
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">Student Registration Form</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Enroll in Python Programming Course & Internship Program (Fee: ₹3,000)
          </p>
        </div>

        {error && (
          <div className="p-3 mb-6 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" /> Full Name *
              </label>
              <input
                required
                type="text"
                placeholder="Enter your full name"
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-400" /> Mobile Number *
              </label>
              <input
                required
                type="tel"
                maxLength={10}
                placeholder="10-digit mobile number"
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                value={formData.mobile}
                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" /> Email Address *
              </label>
              <input
                required
                type="email"
                placeholder="e.g. yourname@gmail.com"
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-cyan-400" /> College / Institution *
              </label>
              <input
                required
                type="text"
                placeholder="College / University name"
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                value={formData.collegeName}
                onChange={e => setFormData({ ...formData, collegeName: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5">Current Status *</label>
              <select
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                value={formData.currentStatus}
                onChange={e => setFormData({ ...formData, currentStatus: e.target.value })}
              >
                <option value="Student">Student</option>
                <option value="Graduate">Graduate</option>
                <option value="Working Professional">Working Professional</option>
                <option value="Job Seeker">Job Seeker</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" /> City *
              </label>
              <input
                required
                type="text"
                placeholder="Your City"
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="mt-1 rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
              />
              <span className="text-xs text-slate-400 leading-normal">
                I agree to the terms and conditions and authorize Linux World to use my submitted details for batch allocation and course notifications.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Processing Details...' : 'Continue to Payment (₹3,000)'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};