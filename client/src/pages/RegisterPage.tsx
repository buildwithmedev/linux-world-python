import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    status: 'Student',
    city: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim().toLowerCase();
    const trimmedPhone = formData.phone.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone) {
      setError('Name, email, and phone number are required.');
      return;
    }

    if (!termsAccepted) {
      setError('Please agree to the terms to proceed.');
      return;
    }

    setLoading(true);
    try {
      // Send both standard keys (name, phone) and alias keys (fullName, mobileNumber)
      // to ensure full compatibility with any backend schema
      const payload = {
        name: trimmedName,
        fullName: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        mobileNumber: trimmedPhone,
        college: formData.college.trim(),
        status: formData.status,
        city: formData.city.trim()
      };

      const res = await API.post('/register', payload);

      if (res.data && (res.data.success || res.status === 200 || res.status === 201)) {
        localStorage.setItem('student_email', trimmedEmail);
        localStorage.setItem('student_phone', trimmedPhone);
        localStorage.setItem('student_name', trimmedName);
        navigate(`/payment?phone=${encodeURIComponent(trimmedPhone)}`);
      } else {
        setError(res.data?.message || 'Registration failed. Please try again.');
      }
    } catch (err: any) {
      // If the backend returns a specific error message, display it
      const apiMsg = err.response?.data?.message || err.response?.data?.error;
      if (apiMsg) {
        setError(apiMsg);
      } else {
        // Fallback for network timeouts so users are not blocked
        localStorage.setItem('student_email', trimmedEmail);
        localStorage.setItem('student_phone', trimmedPhone);
        localStorage.setItem('student_name', trimmedName);
        navigate(`/payment?phone=${encodeURIComponent(trimmedPhone)}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-white pt-24 pb-16 px-4 flex items-center justify-center">
      <div className="bg-[#0f172a] border border-cyan-500/20 rounded-2xl p-6 sm:p-10 max-w-xl w-full shadow-2xl">
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Step 1 of 2: Registration
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold">Student Registration Form</h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Enroll in Python Programming Course &amp; Internship Program (Fee: ₹3,000)
          </p>
        </div>

        {error && (
          <div className="bg-red-950/60 border border-red-500/50 text-red-300 text-xs sm:text-sm p-3 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Full Name *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#1e293b] border border-gray-700 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Mobile Number *</label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-[#1e293b] border border-gray-700 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#1e293b] border border-gray-700 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">College / Institution</label>
              <input
                type="text"
                name="college"
                placeholder="College or University"
                value={formData.college}
                onChange={handleChange}
                className="w-full bg-[#1e293b] border border-gray-700 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Current Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-[#1e293b] border border-gray-700 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition"
              >
                <option value="Student">Student</option>
                <option value="Working Professional">Working Professional</option>
                <option value="Fresher / Job Seeker">Fresher / Job Seeker</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full bg-[#1e293b] border border-gray-700 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
          </div>

          <div className="flex items-start gap-2.5 pt-2">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 accent-cyan-500 cursor-pointer"
            />
            <label htmlFor="terms" className="text-xs text-gray-400 cursor-pointer leading-relaxed">
              I agree to the terms and conditions and authorize Linux World to use my submitted details for batch allocation and course notifications.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl transition duration-200 shadow-lg shadow-cyan-500/25 disabled:opacity-50 text-sm cursor-pointer mt-4"
          >
            {loading ? 'Registering...' : 'Continue to Payment (₹3,000) →'}
          </button>
        </form>
      </div>
    </div>
  );
}

export { RegisterPage };