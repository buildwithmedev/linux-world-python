import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../services/api';

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Read phone from URL query params or local storage
  const queryParams = new URLSearchParams(location.search);
  const studentPhone =
    queryParams.get('phone') ||
    localStorage.getItem('student_phone') ||
    '';

  const handleAccessCourse = async () => {
    setLoading(true);

    try {
      if (studentPhone) {
        // Automatically confirm payment on backend without UTR
        await API.post('/confirm-payment', { phone: studentPhone });
      }
    } catch (error) {
      console.warn('Backend sync bypassed. Unlocking frontend course access directly.');
    } finally {
      // Store local access permission and redirect directly to course
      localStorage.setItem('course_access_granted', 'true');
      if (studentPhone) {
        localStorage.setItem('student_phone', studentPhone);
      }
      setLoading(false);
      navigate('/portal');
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-white flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-cyan-500/20 rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl">
        <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          Direct Enrollment
        </span>
        <h2 className="text-2xl font-bold mt-1 mb-2">Scan & Pay ₹3,000</h2>
        <p className="text-gray-400 text-xs sm:text-sm mb-6">
          Scan with any UPI app (Google Pay, PhonePe, Paytm). Click below to access your lectures immediately.
        </p>

        {/* QR Code */}
        <div className="bg-white p-4 rounded-2xl inline-block mb-6 shadow-lg">
          <img
            src="/qr-code.png"
            alt="Payment QR Code"
            className="w-52 h-52 object-contain mx-auto"
          />
        </div>

        <div className="bg-cyan-950/50 border border-cyan-500/30 rounded-xl p-3 text-cyan-300 text-xs mb-6">
          ⚡ Course access unlocks instantly. No UTR submission required.
        </div>

        {/* Direct One-Click Course Access */}
        <button
          onClick={handleAccessCourse}
          disabled={loading}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl transition duration-200 shadow-lg shadow-cyan-500/25 disabled:opacity-50 text-sm sm:text-base cursor-pointer"
        >
          {loading ? 'Opening Portal...' : 'I Have Completed Payment — Open Course Videos →'}
        </button>
      </div>
    </div>
  );
}