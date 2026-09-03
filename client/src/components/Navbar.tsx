import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Terminal } from 'lucide-react';

const NAV_LINKS = ['about', 'course', 'curriculum', 'internship', 'gallery', 'faq', 'contact'];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle navbar background blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler that works across routes
  const scrollTo = useCallback((id: string) => {
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.pathname, navigate]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-purple-950/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand / Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white block">Linux World</span>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-cyan-400">
                Training & Internships
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="text-sm font-medium text-slate-300 hover:text-cyan-400 capitalize transition-colors"
              >
                {item === 'faq' ? 'FAQ' : item}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/register"
              className="relative group px-6 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-cyan-500/30 transition-all active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Register Now
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">₹3,000</span>
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 backdrop-blur-2xl px-4 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          {NAV_LINKS.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="block w-full text-left py-2 text-base font-medium text-slate-300 hover:text-cyan-400 capitalize transition-colors"
            >
              {item === 'faq' ? 'FAQ' : item}
            </button>
          ))}
          <Link
            to="/register"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold shadow-lg shadow-cyan-500/20 active:scale-95 transition-transform"
          >
            Register Now (₹3,000)
          </Link>
        </div>
      )}
    </nav>
  );
};