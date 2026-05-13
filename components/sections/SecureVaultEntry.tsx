'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Shield, Eye, EyeOff, ChevronRight, AlertCircle, Fingerprint } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SecureVaultEntry() {
  const [phase, setPhase] = useState<'idle' | 'scanning' | 'auth' | 'granted'>('idle');
  const [progress, setProgress] = useState(0);
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const startScan = () => {
    setPhase('scanning');
    setProgress(0);
    setError('');
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setPhase('auth');
          return 100;
        }
        return p + 2;
      });
    }, 40);
  };

  const handleAuth = () => {
    if (code === 'ISOTOP-2024' || code.length >= 4) {
      setPhase('granted');
      setTimeout(() => router.push('/operations'), 1500);
    } else {
      setError('ACCESS DENIED — INVALID CREDENTIALS');
      setTimeout(() => setError(''), 2500);
    }
  };

  return (
    <section className="py-24 relative">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="data-tag text-uranium mb-3">// SECURE VAULT — ENTRY POINT</div>
          <h2 className="section-header text-3xl text-arctic mb-3">
            Operations <span className="text-quantum">Access Portal</span>
          </h2>
          <p className="text-arctic-dim text-sm">Post-Quantum Encrypted · Zero-Knowledge Authentication</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="quantum-border rounded-2xl panel-dark overflow-hidden"
        >
          {/* Vault door header */}
          <div className="bg-charcoal-mid/50 border-b border-charcoal-border px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock size={18} className="text-quantum" />
              <span className="font-display text-sm tracking-widest text-arctic">SECURE VAULT v4.2</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="data-tag">TLS 1.3+PQ</span>
              <div className="flex gap-1.5">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-uranium"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Security levels display */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { label: 'Biometric', status: 'PASS', icon: Fingerprint },
                { label: 'Zero-Knowledge', status: 'ACTIVE', icon: Shield },
                { label: 'PQ-Lattice', status: 'ARMED', icon: Lock },
              ].map(({ label, status, icon: Icon }) => (
                <div key={label} className="text-center p-3 rounded border border-charcoal-border/50 bg-charcoal/30">
                  <Icon size={18} className="text-uranium mx-auto mb-2" />
                  <div className="font-mono text-xs text-uranium font-semibold">{status}</div>
                  <div className="data-tag">{label}</div>
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {phase === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 border-2 border-uranium/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                    <div className="absolute inset-3 border border-uranium/40 rounded-full" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Fingerprint size={36} className="text-uranium" />
                    </div>
                  </div>
                  <p className="text-arctic-dim font-mono text-sm mb-6">
                    Biometric & credential verification required to access<br />
                    classified reactor operations dashboard.
                  </p>
                  <button onClick={startScan} className="btn-primary mx-auto">
                    <Shield size={16} />
                    Initiate Authentication
                    <ChevronRight size={14} />
                  </button>
                </motion.div>
              )}

              {phase === 'scanning' && (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="data-tag text-uranium mb-4 animate-pulse">
                    SCANNING BIOMETRICS...
                  </div>
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(74,222,128,0.1)" strokeWidth="4" />
                      <circle
                        cx="60" cy="60" r="54"
                        fill="none"
                        stroke="#4ade80"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 54}`}
                        strokeDashoffset={`${2 * Math.PI * 54 * (1 - progress / 100)}`}
                        style={{ transition: 'stroke-dashoffset 0.1s', filter: 'drop-shadow(0 0 6px #4ade80)' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-2xl text-uranium">{progress}%</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {['Verifying identity matrix...', 'Cross-referencing clearance DB...', 'Lattice encryption handshake...'].map((msg, i) => (
                      <div
                        key={msg}
                        className={`font-mono text-xs transition-all duration-500 ${
                          progress > (i + 1) * 30 ? 'text-uranium' : 'text-arctic-dim/40'
                        }`}
                      >
                        {progress > (i + 1) * 30 ? '✓' : '○'} {msg}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {phase === 'auth' && (
                <motion.div
                  key="auth"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="text-center mb-6">
                    <div className="data-tag text-uranium mb-2">BIOMETRIC VERIFIED — ENTER ACCESS CODE</div>
                    <p className="font-mono text-xs text-arctic-dim">Try: ISOTOP-2024 or any 4+ character code</p>
                  </div>

                  <div className="relative">
                    <input
                      type={showCode ? 'text' : 'password'}
                      value={code}
                      onChange={e => setCode(e.target.value.toUpperCase())}
                      onKeyDown={e => e.key === 'Enter' && handleAuth()}
                      placeholder="ENTER ACCESS CODE"
                      className="w-full bg-charcoal-mid border border-charcoal-border rounded px-4 py-3 font-mono text-sm text-uranium placeholder-arctic-dim/30 outline-none focus:border-uranium/50 tracking-widest"
                    />
                    <button
                      onClick={() => setShowCode(!showCode)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-arctic-dim hover:text-arctic"
                    >
                      {showCode ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-threat-red font-mono text-xs"
                      >
                        <AlertCircle size={14} />
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button onClick={handleAuth} className="btn-primary w-full justify-center">
                    <Lock size={16} />
                    Authenticate & Enter
                  </button>
                </motion.div>
              )}

              {phase === 'granted' && (
                <motion.div
                  key="granted"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="text-6xl mb-4">✓</div>
                  <div className="font-display text-xl text-uranium text-glow-uranium mb-2">ACCESS GRANTED</div>
                  <div className="data-tag">Redirecting to Operations Dashboard...</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="border-t border-charcoal-border px-6 py-3 flex items-center justify-between">
            <span className="data-tag">SESSION ENCRYPTED</span>
            <span className="data-tag">ISOTOP SECURE VAULT v4.2 · IAEA COMPLIANT</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
