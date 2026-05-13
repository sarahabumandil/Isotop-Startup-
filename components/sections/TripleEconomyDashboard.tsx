'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis,
  Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { generateEconomyTimeSeries } from '@/lib/syntheticData';
import { Leaf, Droplets, RefreshCw, TrendingUp } from 'lucide-react';

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setValue(target); clearInterval(timer); }
      else setValue(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{prefix}{value.toLocaleString()}{suffix}</span>;
}

const CustomTooltip = ({ active, payload, label, accentColor }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="terminal-border rounded p-3 panel-dark text-xs font-mono">
      <div className="text-arctic-dim mb-1">{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ color: accentColor }}>{p.name}: {p.value}</div>
      ))}
    </div>
  );
};

export function TripleEconomyDashboard() {
  const [data] = useState(() => generateEconomyTimeSeries(20));
  const [liveCarbon, setLiveCarbon] = useState(1240000);
  const [liveDesal, setLiveDesal] = useState(847.3);
  const [liveThermal, setLiveThermal] = useState(84.7);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCarbon(v => v + Math.floor(Math.random() * 500 + 100));
      setLiveDesal(v => +(v + (Math.random() - 0.5) * 5).toFixed(1));
      setLiveThermal(v => Math.min(98, +(v + (Math.random() - 0.5) * 0.3).toFixed(2)));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const economies = [
    {
      key: 'green',
      icon: Leaf,
      title: 'Green Economy',
      subtitle: 'Carbon Offset & Grid Stability',
      color: '#4ade80',
      borderClass: 'terminal-border',
      metrics: [
        { label: 'Carbon Offset', value: liveCarbon.toLocaleString(), unit: 'MT CO₂ avoided', live: true },
        { label: 'Grid Stability', value: '99.94', unit: '%', live: false },
        { label: 'Renewable Integration', value: '68.4', unit: '%', live: false },
      ],
      chartData: data,
      chartKey: 'thermalRecycling',
      chartName: 'Stability',
    },
    {
      key: 'blue',
      icon: Droplets,
      title: 'Blue Economy',
      subtitle: 'Desalination via Waste Heat',
      color: '#3b82f6',
      borderClass: 'quantum-border',
      metrics: [
        { label: 'Throughput', value: liveDesal.toFixed(1), unit: 'L/sec', live: true },
        { label: 'Daily Output', value: '73,207', unit: 'kL/day', live: false },
        { label: 'Energy Cost', value: '0.42', unit: 'kWh/kL', live: false },
      ],
      chartData: data,
      chartKey: 'desalinationLps',
      chartName: 'L/sec',
    },
    {
      key: 'circular',
      icon: RefreshCw,
      title: 'Circular Economy',
      subtitle: 'RL-Driven Thermal Recycling',
      color: '#f59e0b',
      borderClass: 'border border-amber-warn/20',
      metrics: [
        { label: 'Recycling Efficiency', value: liveThermal.toFixed(1), unit: '%', live: true },
        { label: 'Waste Heat Captured', value: '284', unit: 'MWt', live: false },
        { label: 'RL Improvement', value: '+20.4', unit: '%', live: false },
      ],
      chartData: data,
      chartKey: 'thermalRecycling',
      chartName: 'Efficiency %',
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 hex-pattern opacity-30" />
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="data-tag text-uranium mb-3">// MODULE 03 — ECONOMIC INTELLIGENCE</div>
          <h2 className="section-header text-4xl text-arctic mb-4">
            Triple Economy <span className="text-uranium">Dashboard</span>
          </h2>
          <p className="text-arctic-dim max-w-2xl">
            Real-time resource distribution across three interconnected economic models — 
            powered by physics-informed AI and autonomous reinforcement learning.
          </p>
        </motion.div>

        {/* Economy cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {economies.map((eco, i) => (
            <motion.div
              key={eco.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className={`${eco.borderClass} rounded-xl panel-dark p-6 relative overflow-hidden`}
            >
              {/* Background glow */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 pointer-events-none"
                style={{ background: eco.color }}
              />

              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${eco.color}15`, border: `1px solid ${eco.color}30` }}
                >
                  <eco.icon size={18} style={{ color: eco.color }} />
                </div>
                <div>
                  <div className="font-display text-sm font-700 text-arctic">{eco.title}</div>
                  <div className="data-tag">{eco.subtitle}</div>
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-3 mb-5">
                {eco.metrics.map((m) => (
                  <div key={m.label} className="flex items-center justify-between">
                    <span className="data-tag">{m.label}</span>
                    <div className="text-right">
                      <span className="font-mono text-sm font-semibold" style={{ color: eco.color }}>
                        {m.value}
                      </span>
                      <span className="font-mono text-xs text-arctic-dim ml-1">{m.unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live indicator */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: eco.color }} />
                <span className="data-tag">LIVE FEED</span>
              </div>

              {/* Chart */}
              <div className="h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={eco.chartData}>
                    <defs>
                      <linearGradient id={`grad-${eco.key}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={eco.color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={eco.color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="timestamp" hide />
                    <YAxis hide />
                    <Tooltip
                      content={<CustomTooltip accentColor={eco.color} />}
                    />
                    <Area
                      type="monotone"
                      dataKey={eco.chartKey}
                      name={eco.chartName}
                      stroke={eco.color}
                      strokeWidth={1.5}
                      fill={`url(#grad-${eco.key})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-8 terminal-border rounded-xl p-6 panel-dark grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Total Economic Value', value: '$2.4B', sub: 'Annual projection', color: 'text-uranium' },
            { label: 'CO₂ Equivalent Saved', value: '1.24M MT', sub: 'This fiscal year', color: 'text-uranium' },
            { label: 'Water Produced', value: '26.7B L', sub: 'Cumulative', color: 'text-quantum' },
            { label: 'Energy Recovered', value: '284 MWt', sub: 'Waste heat recycled', color: 'text-amber-warn' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className={`font-display text-2xl font-700 ${item.color} mb-1`}>{item.value}</div>
              <div className="font-mono text-xs text-arctic mb-0.5">{item.label}</div>
              <div className="data-tag">{item.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
