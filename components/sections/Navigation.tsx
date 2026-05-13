'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Menu, X, Activity, Lock } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', code: '01' },
  { href: '/operations', label: 'Operations', code: '02' },
  { href: '/insights', label: 'Insights', code: '03' },
  { href: '/about', label: 'Founder', code: '04' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [time, setTime] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().substring(11, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-charcoal/95 backdrop-blur-xl border-b border-uranium/10'
            : 'bg-transparent'
        }`}
      >
        {/* Top status bar */}
        <div className="border-b border-charcoal-border/50 px-6 py-1 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="data-tag flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-uranium animate-pulse inline-block" />
              SYSTEM ONLINE
            </span>
            <span className="data-tag hidden sm:block">CLEARANCE: ALPHA-7</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="data-tag font-mono hidden md:block">{time}</span>
            <span className="data-tag flex items-center gap-1">
              <Lock size={10} className="text-uranium" />
              PQ-ENCRYPTED
            </span>
          </div>
        </div>

        {/* Main nav */}
        <div className="px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 border-2 border-uranium/30 rotate-45 group-hover:rotate-90 transition-transform duration-500" />
              <div className="absolute inset-1 border border-uranium/50 rotate-12 group-hover:rotate-45 transition-transform duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap size={16} className="text-uranium" />
              </div>
            </div>
            <div>
              <div className="font-display font-900 text-xl tracking-[0.2em] text-arctic text-glow-uranium">
                ISOTOP
              </div>
              <div className="data-tag text-[0.55rem] leading-none mt-0.5">
                NUCLEAR AI PLATFORM
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative group px-5 py-2 font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
                  pathname === link.href
                    ? 'text-uranium'
                    : 'text-arctic-dim hover:text-arctic'
                }`}
              >
                <span className="text-[0.55rem] text-uranium/40 absolute top-1 left-2">
                  {link.code}
                </span>
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-uranium"
                    style={{ boxShadow: '0 0 8px rgba(74, 222, 128, 0.6)' }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link href="/operations" className="hidden md:flex btn-primary text-xs py-2">
              <Shield size={14} />
              Secure Access
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-arctic-dim hover:text-uranium transition-colors p-2"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-40 bg-charcoal/98 backdrop-blur-xl flex flex-col pt-24 px-6"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-4 py-4 border-b border-charcoal-border/50 font-mono text-sm tracking-widest uppercase ${
                      pathname === link.href ? 'text-uranium' : 'text-arctic-dim'
                    }`}
                  >
                    <span className="text-uranium/40 text-xs">{link.code}</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-8">
              <div className="terminal-border p-4 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <Activity size={12} className="text-uranium animate-pulse" />
                  <span className="data-tag">System Status</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {['Reactor A', 'Reactor B', 'AI Core', 'Vault'].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-uranium animate-pulse" />
                      <span className="font-mono text-xs text-arctic-dim">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
