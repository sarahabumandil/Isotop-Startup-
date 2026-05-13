'use client';

import Link from 'next/link';
import { Zap, Shield, Globe, Lock, Activity } from 'lucide-react';

export function FooterSection() {
  return (
    <footer className="border-t border-charcoal-border/50 py-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 border-2 border-uranium/30 rotate-45" />
                <div className="absolute inset-1 border border-uranium/50 rotate-12" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap size={12} className="text-uranium" />
                </div>
              </div>
              <span className="font-display font-900 text-lg tracking-[0.2em] text-arctic">ISOTOP</span>
            </div>
            <p className="text-arctic-dim text-sm leading-relaxed max-w-sm mb-6">
              AI-Driven Nuclear Reactor Management & Geospatial Uranium Localization. 
              Managing the future of global energy with quantum-classical intelligence.
            </p>
            <div className="flex flex-wrap gap-3">
              {['IAEA Compliant', 'ISO 27001', 'Post-Quantum Ready', 'SOC 2 Type II'].map(badge => (
                <span
                  key={badge}
                  className="px-2 py-1 rounded font-mono text-xs text-arctic-dim border border-charcoal-border/70"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="data-tag text-uranium mb-4">NAVIGATION</div>
            <nav className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/operations', label: 'Operations' },
                { href: '/insights', label: 'Strategic Insights' },
                { href: '/about', label: 'About Founder' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block font-mono text-sm text-arctic-dim hover:text-uranium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* System status */}
          <div>
            <div className="data-tag text-uranium mb-4">SYSTEM STATUS</div>
            <div className="space-y-2">
              {[
                { label: 'Reactor Network', status: 'ONLINE' },
                { label: 'AI Core', status: 'ACTIVE' },
                { label: 'Quantum Bridge', status: 'RUNNING' },
                { label: 'Secure Vault', status: 'ARMED' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="font-mono text-xs text-arctic-dim">{item.label}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-uranium animate-pulse" />
                    <span className="font-mono text-xs text-uranium">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-charcoal-border/30 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs text-arctic-dim">
            © 2024 ISOTOP Platform · Designed & Engineered by Sarah Ahmed Abumandil · Gaza, Palestine 🇵🇸
          </div>
          <div className="flex items-center gap-6">
            <span className="data-tag">All transmissions encrypted</span>
            <div className="flex items-center gap-1.5">
              <Activity size={12} className="text-uranium" />
              <span className="font-mono text-xs text-uranium">LIVE</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
