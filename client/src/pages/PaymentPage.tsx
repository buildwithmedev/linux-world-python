import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { getStudent, verifyPayment, getSettings } from '../services/api';
import { Student } from '../types';

export const PaymentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [upiId, setUpiId] = useState('linuxworld@icici');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        const [studentRes, settingsRes] = await Promise.all([
          getStudent(id),
          getSettings()
        ]);
        if (studentRes.data.success) {
          setStudent(studentRes.data.student);
          if (studentRes.data.student.paymentStatus === 'PAYMENT_VERIFIED') {
            navigate(`/confirmation/${id}`);
          }
        }
        if (settingsRes.data.success) {
          setUpiId(settingsRes.data.settings.upiId || 'linuxworld@icici');
        }
      } catch (err: any) {
        setError('Failed to load payment details.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatePayment = async () => {
    if (!student) return;
    setVerifying(true);
    setError('');
    try {
      const res = await verifyPayment({
        registrationId: student.registrationId,
        paymentId: `DEMO_TXN_${Date.now()}`,
        isDemo: true
      });
      if (res.data.success) {
        navigate(`/confirmation/${student.registrationId}`);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Payment simulation failed.');
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center text-slate-400">
        Loading payment gateway...
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center text-red-400">
        Registration record not found.
      </div>
    );
  }

  const upiQrString = `upi://pay?pa=${upiId}&pn=LinuxWorld%20Informatics&am=${student.amount}&cu=INR&tn=Reg_${student.registrationId}`;

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-slate-950 flex items-center justify-center relative">
      <div className="w-full max-w-xl bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="text-center mb-6">
          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full uppercase tracking-wider border border-amber-500/20">
            Payment Pending
          </span>
          <h1 className="text-2xl font-black text-white mt-2">Complete Course Payment</h1>
          <p className="text-slate-400 text-xs mt-1">Registration ID: <span className="font-mono text-cyan-400">{student.registrationId}</span></p>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
            {error}
          </div>
        )}

        <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 mb-6 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Student Name</div>
            <div className="text-sm font-bold text-white">{student.fullName}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400">Amount Due</div>
            <div className="text-xl font-black text-green-400">₹{student.amount.toLocaleString()}</div>
          </div>
        </div>

        {/* UPI QR & Details */}
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl mb-6 shadow-inner">
          <QRCodeSVG value={upiQrString} size={180} level="H" />
          <span className="text-[11px] font-semibold text-slate-700 mt-3">
            Scan using any UPI App (GPay, PhonePe, Paytm)
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400">Official UPI ID:</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400">{upiId}</span>
              <button
                onClick={handleCopyUpi}
                className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
                title="Copy UPI ID"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Development / Sandbox Box */}
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-left">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold mb-1">
              <ShieldCheck className="w-4 h-4" /> Demo Mode Enabled
            </div>
            <p className="text-[11px] text-slate-400 mb-3">
              Server payment verification active. You can simulate instant authorization in sandbox environment without live charges.
            </p>
            <button
              onClick={handleSimulatePayment}
              disabled={verifying}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              {verifying ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Simulate Successful Payment (₹3,000)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};