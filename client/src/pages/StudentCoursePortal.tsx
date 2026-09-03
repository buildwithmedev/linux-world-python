import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { COURSE_SCHEDULE, VideoSession } from '../data/schedule';
import { Lock, Play, Clock, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';

const API = axios.create({ baseURL: 'http://127.0.0.1:5000/api' });

export const StudentCoursePortal: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [activeSession, setActiveSession] = useState<VideoSession>(COURSE_SCHEDULE[0]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (id) {
      API.get(`/students/${id}`)
        .then((res) => {
          if (res.data.success) {
            setStudent(res.data.student);
          }
        })
        .catch(() => setStudent(null))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 bg-slate-950 text-center text-slate-400">
        Verifying enrollment security token...
      </div>
    );
  }

  // Strict Protection: If student record doesn't exist or is not verified, block access completely
  if (!student || student.paymentStatus !== 'PAYMENT_VERIFIED') {
    return (
      <div className="min-h-screen pt-32 px-4 bg-slate-950 flex items-center justify-center">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 bg-red-500/20 text-red-400 rounded-xl flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Course Access Restricted 🔒</h2>
          <p className="text-xs text-slate-400">
            Payment has not been completed or verified for registration ID: <br />
            <span className="font-mono text-cyan-400 font-bold">{id}</span>
          </p>
          <div className="p-3 bg-slate-950 rounded-xl text-xs text-amber-400 border border-amber-500/20">
            Lectures will only unlock after entering your payment reference (UTR).
          </div>
          <Link
            to={`/payment/${id}`}
            className="block w-full py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all"
          >
            Complete Payment (₹3,000)
          </Link>
        </div>
      </div>
    );
  }

  const isUnlocked = (session: VideoSession) => {
    return currentTime >= new Date(session.unlockTimeISO);
  };

  const getRemainingTime = (unlockISO: string) => {
    const diff = new Date(unlockISO).getTime() - currentTime.getTime();
    if (diff <= 0) return 'Available Now';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `Unlocks in ${hours}h ${mins}m (at 5:30 PM)`;
  };

  const activeIsUnlocked = isUnlocked(activeSession);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-950 text-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase">
              <ShieldCheck className="w-3.5 h-3.5" /> Enrolled: {student.fullName}
            </div>
            <h1 className="text-2xl font-black text-white mt-1">Python Course & Internship Portal</h1>
            <p className="text-xs text-slate-400">
              Daily live/uploaded sessions release consecutively at <strong className="text-cyan-300">5:30 PM IST</strong> starting 15 September.
            </p>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-slate-500 block">Registration Code</span>
            <span className="text-xs font-mono font-bold text-cyan-400">{student.registrationId}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl relative">
              {activeIsUnlocked ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${activeSession.videoId}?autoplay=1`}
                  title={activeSession.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-slate-950/90 backdrop-blur-sm">
                  <div className="w-16 h-16 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-amber-400 mb-4 shadow-xl">
                    <Lock className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Lecture Locked</h3>
                  <p className="text-xs text-slate-400 max-w-sm mb-4">
                    This session will automatically unlock on <strong className="text-white">{activeSession.releaseDate}</strong> at <strong className="text-cyan-400">5:30 PM IST</strong>.
                  </p>
                  <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {getRemainingTime(activeSession.unlockTimeISO)}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Day {activeSession.day} • {activeSession.releaseDate} @ 5:30 PM
                </span>
                {activeIsUnlocked && (
                  <a
                    href={activeSession.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                  >
                    Watch Directly on YouTube <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              <h2 className="text-xl font-bold text-white">{activeSession.title}</h2>
              <p className="text-xs sm:text-sm text-slate-400">{activeSession.topic}</p>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-sm font-bold text-slate-300 px-1 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" /> Daily Release Schedule
            </h3>
            <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
              {COURSE_SCHEDULE.map((session) => {
                const unlocked = isUnlocked(session);
                const isSelected = activeSession.id === session.id;

                return (
                  <div
                    key={session.id}
                    onClick={() => setActiveSession(session)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-slate-800 border-cyan-500/50 shadow-md shadow-cyan-950/30'
                        : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                    }`}
                  >
                    <div className="pt-0.5">
                      {unlocked ? (
                        <div className="w-7 h-7 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center">
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-500 flex items-center justify-center">
                          <Lock className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
                          Day {session.day} ({session.releaseDate})
                        </span>
                        <span className={`text-[10px] font-semibold ${unlocked ? 'text-green-400' : 'text-amber-400'}`}>
                          {unlocked ? 'Unlocked' : '5:30 PM'}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-white truncate mt-0.5">{session.title}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};