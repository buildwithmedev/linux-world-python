import React, { useState, useEffect } from 'react';
import { getAdminDashboard, getAdminStudents, updateSettings } from '../services/api';
import { Users, DollarSign, Clock, CheckCircle2, Search, Filter, Save, LogOut } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [settings, setSettings] = useState<any>({});
  const [savingSettings, setSavingSettings] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const [dashRes, stuRes] = await Promise.all([
        getAdminDashboard(),
        getAdminStudents({ search, paymentStatus: paymentFilter })
      ]);
      if (dashRes.data.success) {
        setStats(dashRes.data.data.stats);
        setSettings(dashRes.data.data.settings);
      }
      if (stuRes.data.success) {
        setStudents(stuRes.data.students);
      }
    } catch (err) {
      console.error('Failed to load admin stats');
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [search, paymentFilter]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      await updateSettings(settings);
      alert('Batch settings successfully updated!');
    } catch (err) {
      alert('Failed to update settings');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 pt-24 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Linux World Admin Portal</h1>
          <p className="text-slate-400 text-xs sm:text-sm">Batch management, registrations, and fee configurations.</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-semibold flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Log Out
        </button>
      </div>

      {/* Metrics Row */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5"><Users className="w-4 h-4 text-cyan-400" /> Total Registrations</div>
            <div className="text-2xl font-bold text-white">{stats.totalRegistrations}</div>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-400" /> Verified Students</div>
            <div className="text-2xl font-bold text-green-400">{stats.paidStudents}</div>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5"><Clock className="w-4 h-4 text-amber-400" /> Pending Payments</div>
            <div className="text-2xl font-bold text-amber-400">{stats.pendingPayments}</div>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-purple-400" /> Total Revenue</div>
            <div className="text-2xl font-bold text-purple-400">₹{stats.totalRevenue.toLocaleString()}</div>
          </div>
        </div>
      )}

      {/* Dynamic Course Settings */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <h2 className="text-base font-bold text-white mb-4">Course & Batch Configurations</h2>
        <form onSubmit={handleSaveSettings} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Assigned Batch Start Date</label>
            <input
              type="text"
              value={settings.courseStartDate || ''}
              onChange={e => setSettings({ ...settings, courseStartDate: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Course Fee (INR)</label>
            <input
              type="number"
              value={settings.courseFee || 3000}
              onChange={e => setSettings({ ...settings, courseFee: Number(e.target.value) })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Receiving UPI ID</label>
            <input
              type="text"
              value={settings.upiId || ''}
              onChange={e => setSettings({ ...settings, upiId: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
            />
          </div>
          <div className="sm:col-span-3 flex justify-end">
            <button
              type="submit"
              disabled={savingSettings}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> {savingSettings ? 'Saving...' : 'Save Configuration'}
            </button>
          </div>
        </form>
      </div>

      {/* Student Management Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-base font-bold text-white">Registered Candidates</h2>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="Search name / ID..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white"
              />
            </div>
            <select
              value={paymentFilter}
              onChange={e => setPaymentFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300"
            >
              <option value="">All Statuses</option>
              <option value="PAYMENT_VERIFIED">Verified</option>
              <option value="PAYMENT_PENDING">Pending</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="p-3">Reg ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Mobile</th>
                <th className="p-3">College</th>
                <th className="p-3">Status</th>
                <th className="p-3">Start Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {students.map((s) => (
                <tr key={s._id} className="hover:bg-slate-800/50">
                  <td className="p-3 font-mono text-cyan-400">{s.registrationId}</td>
                  <td className="p-3 font-semibold text-white">{s.fullName}</td>
                  <td className="p-3">{s.mobile}</td>
                  <td className="p-3">{s.collegeName}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      s.paymentStatus === 'PAYMENT_VERIFIED' 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {s.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3">{s.courseStartDate || 'Pending Verification'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};