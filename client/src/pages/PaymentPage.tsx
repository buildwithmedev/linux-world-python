import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../services/api';

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [utr, setUtr] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const studentPhone = queryParams.get('phone') || localStorage.getItem('student_phone') || '';

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Strict 12-digit check
    if (!/^\d{12}$/.test(utr.trim())) {
      setError('Invalid UTR! Please enter the exact 12-digit numeric reference number from your payment app.');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/verify-payment', {
        phone: studentPhone,
        utr: utr.trim()
      });

      if (res.data.success) {
        setIsPending(true); // Show pending approval message
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Verification failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#070b14] text-white flex items-center justify-center p-4">
        <div className="bg-[#0f172a] border border-cyan-500/20 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-3xl mx-auto mb-4">
            ⏳
          </div>
          <h2 className="text-2xl font-bold mb-2">Payment Verification Pending</h2>
          <p className="text-gray-300 text-sm mb-4">
            Your 12-digit UTR (<strong>{utr}</strong>) has been submitted.
          </p>
          <p className="text-gray-400 text-xs mb-6">
            We are verifying your transaction with bank records. Your access will unlock automatically upon verification.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-semibold rounded-xl transition"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-white flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-cyan-500/20 rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl">
        <h2 className="text-2xl font-bold mb-2">Scan & Pay ₹3,000</h2>
        <p className="text-gray-400 text-xs sm:text-sm mb-6">
          Scan using Google Pay, PhonePe, or Paytm, then enter your 12-digit UTR reference ID.
        </p>

        <div className="bg-white p-4 rounded-2xl inline-block mb-5 shadow-lg">
          <img
            src="/qr-code.png"
            alt="Payment QR"
            className="w-52 h-52 object-contain mx-auto"
          />
        </div>

        {error && (
          <div className="bg-red-950/60 border border-red-500/50 text-red-300 text-xs p-3 rounded-lg text-center mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            maxLength={12}
            required
            placeholder="Enter 12-digit UTR / UPI Ref ID"
            value={utr}
            onChange={(e) => setUtr(e.target.value.replace(/\D/g, ''))} // only numbers
            className="w-full bg-[#1e293b] border border-gray-700 rounded-xl p-3 text-white text-center font-mono tracking-widest focus:outline-none focus:border-cyan-500"
          />

          <button
            type="submit"
            disabled={loading || utr.length !== 12}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl transition duration-200 shadow-lg shadow-cyan-500/25 disabled:opacity-50 text-sm cursor-pointer"
          >
            {loading ? 'Submitting...' : 'Submit UTR for Verification →'}
          </button>
        </form>
      </div>
    </div>
  );
}