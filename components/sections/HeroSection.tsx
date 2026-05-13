'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Activity, Globe, Lock, ChevronRight, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const TERMINAL_LINES = [
  '> ISOTOP_AI v4.2.1 INITIALIZED',
  '> Loading quantum-classical bridge...',
  '> Neutron flux calibration: OK',
  '> RL agent connected [EFFICIENCY: +20.4%]',
  '> Uranium spectral scan: 6 deposits active',
  '> Post-quantum encryption: ACTIVE',
  '> All systems nominal. Welcome, Commander.',
];

function TerminalBoot() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (currentLine >= TERMINAL_LINES.length) return;
    const timeout = setTimeout(() => {
      setLines((prev) => [...prev, TERMINAL_LINES[currentLine]]);
      setCurrentLine((c) => c + 1);
    }, 350 + Math.random() * 200);
    return () => clearTimeout(timeout);
  }, [currentLine]);

  return (
    <div className="terminal-border rounded-lg p-4 font-mono text-xs bg-charcoal/80 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-charcoal-border/50">
        <div className="w-2.5 h-2.5 rounded-full bg-threat-red" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-warn" />
        <div className="w-2.5 h-2.5 rounded-full bg-uranium" />
        <span className="ml-2 data-tag">ISOTOP TERMINAL — SECURE SESSION</span>
      </div>
      <div className="space-y-1">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`${
              line.includes('OK') || line.includes('ACTIVE') || line.includes('nominal')
                ? 'text-uranium'
                : line.includes('ERROR')
                ? 'text-threat-red'
                : 'text-arctic-dim'
            }`}
          >
            {line}
          </div>
        ))}
        {currentLine < TERMINAL_LINES.length && (
          <div className="text-uranium cursor-blink"> </div>
        )}
      </div>
    </div>
  );
}

function LiveMetric({ label, value, unit, color = 'uranium', delta }: {
  label: string;
  value: string;
  unit: string;
  color?: 'uranium' | 'quantum';
  delta?: string;
}) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const interval = setInterval(() => {
      const base = parseFloat(value);
      const variation = base * 0.002;
      const newVal = (base + (Math.random() - 0.5) * variation).toFixed(
        value.includes('.') ? value.split('.')[1].length : 0
      );
      setDisplay(newVal);
    }, 2000 + Math.random() * 1000);
    return () => clearInterval(interval);
  }, [value]);

  const colorClass = color === 'uranium' ? 'text-uranium' : 'text-quantum';
  const borderClass = color === 'uranium' ? 'terminal-border' : 'quantum-border';

  return (
    <div className={`${borderClass} rounded-lg p-4 panel-dark`}>
      <div className="data-tag mb-2">{label}</div>
      <div className="flex items-end gap-1">
        <span className={`metric-value ${colorClass}`} style={{ fontSize: '1.4rem' }}>
          {display}
        </span>
        <span className="font-mono text-xs text-arctic-dim mb-1">{unit}</span>
      </div>
      {delta && (
        <div className="flex items-center gap-1 mt-1">
          <span className="font-mono text-xs text-uranium">↑ {delta}</span>
        </div>
      )}
      <div className="mt-2 h-0.5 bg-charcoal-border rounded overflow-hidden">
        <div
          className={`h-full ${color === 'uranium' ? 'bg-uranium' : 'bg-quantum'} rounded`}
          style={{ width: `${60 + Math.random() * 35}%`, transition: 'width 2s ease' }}
        />
      </div>
    </div>
  );
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen pt-28 pb-16 overflow-hidden grid-bg">
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-uranium/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-quantum/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Alert banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex items-center gap-3 terminal-border rounded px-4 py-2 w-fit"
        >
          <Activity size={12} className="text-uranium animate-pulse" />
          <span className="font-mono text-xs text-arctic-dim tracking-widest">
            LIVE SYSTEM STATUS: <span className="text-uranium">6 REACTORS ONLINE</span> • AI CONFIDENCE: <span className="text-uranium">98.7%</span>
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="data-tag mb-4 text-uranium">
                // ISOTOP PLATFORM v4.2 — CLASSIFIED INTERFACE
              </div>

              <h1 className="font-display font-900 text-5xl lg:text-6xl xl:text-7xl leading-[0.95] tracking-tight mb-6">
                <span className="text-arctic">THE FUTURE</span>
                <br />
                <span className="text-arctic">OF GLOBAL</span>
                <br />
                <span className="text-uranium text-glow-uranium">ENERGY</span>
                <br />
                <span className="text-arctic">MANAGED BY</span>
                <br />
                <span className="text-quantum text-glow-quantum">AI.</span>
              </h1>

              <p className="text-arctic-dim text-base leading-relaxed max-w-lg mb-8">
                ISOTOP pioneers AI-driven nuclear reactor management with quantum-classical 
                intelligence, geospatial uranium localization, and autonomous reinforcement 
                learning calibration — achieving <span className="text-uranium font-semibold">+20% efficiency gains</span> over 
                conventional systems.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/operations" className="btn-primary">
                  <Shield size={16} />
                  Enter Operations
                  <ChevronRight size={14} />
                </Link>
                <Link href="/insights" className="btn-quantum">
                  <Zap size={16} />
                  Strategic Insights
                </Link>
              </div>

              {/* Security badges */}
              <div className="flex flex-wrap items-center gap-4">
                {[
                  { icon: Lock, label: 'Post-Quantum Ready' },
                  { icon: Shield, label: 'IAEA Compliant' },
                  { icon: AlertTriangle, label: 'ISO 27001' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-arctic-dim">
                    <Icon size={12} className="text-uranium" />
                    <span className="font-mono text-xs">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <TerminalBoot />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 gap-3"
            >
              <LiveMetric label="NEUTRON FLUX" value="2.41" unit="×10¹⁴ n/cm²s" color="uranium" delta="0.3%" />
              <LiveMetric label="CORE TEMP" value="326.4" unit="°C" color="quantum" />
              <LiveMetric label="POWER OUTPUT" value="9,214" unit="MWe" color="uranium" delta="2.1%" />
              <LiveMetric label="AI EFFICIENCY" value="92.4" unit="%" color="quantum" delta="+20.4%" />
            </motion.div>

            {/* Globe placeholder / status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="terminal-border rounded-lg p-4 panel-dark flex items-center gap-4"
            >
              <div className="relative w-16 h-16 flex-shrink-0">
                <div className="absolute inset-0 border-2 border-uranium/30 rounded-full animate-ping" />
                <div className="absolute inset-2 border border-uranium/50 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe size={24} className="text-uranium" />
                </div>
              </div>
              <div>
                <div className="data-tag mb-1">3D DIGITAL TWIN — ACTIVE</div>
                <div className="font-mono text-sm text-arctic">
                  6 Reactor Nodes • 6 Uranium Deposits
                </div>
                <div className="font-mono text-xs text-arctic-dim mt-1">
                  Geospatial coverage: 94.2% global
                </div>
              </div>
              <Link href="/operations" className="ml-auto btn-primary text-xs py-1.5 px-3">
                View Globe
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
