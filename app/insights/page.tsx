'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PolarRadiusAxis, Cell
} from 'recharts';
import { TrendingUp, DollarSign, Leaf, Droplets, RefreshCw, Globe } from 'lucide-react';
import { generateEconomyTimeSeries } from '@/lib/syntheticData';

const economyData = generateEconomyTimeSeries(24);

const radarData = [
  { metric: 'Green Economy', A: 88, fullMark: 100 },
  { metric: 'Blue Economy', A: 76, fullMark: 100 },
  { metric: 'Circular Economy', A: 84, fullMark: 100 },
  { metric: 'Carbon Credits', A: 92, fullMark: 100 },
  { metric: 'Grid Stability', A: 99, fullMark: 100 },
  { metric: 'Desalination', A: 81, fullMark: 100 },
];

const projectionData = Array.from({ length: 12 }, (_, i) => ({
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  green: 180 + i * 25 + Math.random() * 20,
  blue: 120 + i * 18 + Math.random() * 15,
  circular: 80 + i * 12 + Math.random() * 10,
}));

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="border border-uranium/20 rounded p-3 bg-charcoal/95 text-xs font-mono">
      <div className="text-arctic-dim mb-1">{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ color: p.color }}>{p.name}: ${(+p.value).toFixed(1)}M</div>
      ))}
    </div>
  );
};

export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState<'green' | 'blue' | 'circular' | 'overview'>('overview');

  return (
    <div className="min-h-screen pt-24 pb-16 grid-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <div className="data-tag text-uranium mb-2">// STRATEGIC INTELLIGENCE — FINANCIAL MODELING</div>
          <h1 className="font-display text-4xl text-arctic font-700 mb-4">
            Economy <span className="text-uranium">Insights</span>
          </h1>
          <p className="text-arctic-dim max-w-2xl">
            Physics-informed financial projections for the Green, Blue, and Circular economy 
            models powered by ISOTOP's reactor fleet. All figures derived from synthetic 
            telemetry and economic modeling.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {(['overview', 'green', 'blue', 'circular'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded font-mono text-xs tracking-widest uppercase whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-uranium/20 text-uranium border border-uranium/40'
                  : 'text-arctic-dim border border-charcoal-border hover:text-arctic'
              }`}
            >
              {tab === 'overview' ? '📊 Overview' :
               tab === 'green' ? '🌿 Green Economy' :
               tab === 'blue' ? '💧 Blue Economy' :
               '♻️ Circular Economy'}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Portfolio Value', value: '$2.4B', sub: 'Annual projection', icon: DollarSign, color: 'text-uranium' },
                { label: 'Carbon Credits', value: '1.24M MT', sub: 'CO₂ offset value: $62M', icon: Leaf, color: 'text-uranium' },
                { label: 'Water Revenue', value: '$18.2M', sub: 'Desalination throughput', icon: Droplets, color: 'text-quantum' },
                { label: 'Circular Value', value: '$284M', sub: 'Waste heat monetized', icon: RefreshCw, color: 'text-amber-warn' },
              ].map((kpi, i) => (
                <motion.div
                  key={kpi.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="terminal-border rounded-xl panel-dark p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <kpi.icon size={14} className={kpi.color} />
                    <span className="data-tag">{kpi.label}</span>
                  </div>
                  <div className={`font-display text-2xl font-700 ${kpi.color} mb-1`}>{kpi.value}</div>
                  <div className="data-tag">{kpi.sub}</div>
                </motion.div>
              ))}
            </div>

            {/* Revenue projection chart */}
            <div className="terminal-border rounded-xl panel-dark p-6">
              <div className="data-tag text-uranium mb-4">12-MONTH REVENUE PROJECTION BY ECONOMY</div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={projectionData}>
                    <defs>
                      <linearGradient id="gGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4ade80" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="bGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="cGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fill: '#8b949e', fontSize: 10 }} />
                    <YAxis tick={{ fill: '#8b949e', fontSize: 10 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="green" name="Green" stroke="#4ade80" fill="url(#gGrad)" strokeWidth={2} />
                    <Area type="monotone" dataKey="blue" name="Blue" stroke="#3b82f6" fill="url(#bGrad)" strokeWidth={2} />
                    <Area type="monotone" dataKey="circular" name="Circular" stroke="#f59e0b" fill="url(#cGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Radar + metrics */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="terminal-border rounded-xl panel-dark p-6">
                <div className="data-tag text-uranium mb-4">PORTFOLIO PERFORMANCE MATRIX</div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="rgba(74,222,128,0.1)" />
                      <PolarAngleAxis dataKey="metric" tick={{ fill: '#8b949e', fontSize: 10 }} />
                      <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar name="Score" dataKey="A" stroke="#4ade80" fill="#4ade80" fillOpacity={0.2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="terminal-border rounded-xl panel-dark p-6">
                <div className="data-tag text-uranium mb-4">ECONOMIC IMPACT METRICS</div>
                <div className="space-y-4">
                  {[
                    { label: 'Jobs Created (Direct)', value: '4,200+', change: '+12%', color: 'text-uranium' },
                    { label: 'GDP Contribution', value: '$890M', change: '+18%', color: 'text-uranium' },
                    { label: 'Carbon Price/MT', value: '$54.20', change: '+7%', color: 'text-quantum' },
                    { label: 'Water Cost/kL', value: '$0.42', change: '-15%', color: 'text-quantum' },
                    { label: 'Thermal Recovery ROI', value: '340%', change: '+22%', color: 'text-amber-warn' },
                    { label: 'AI Cost Reduction', value: '$124M', change: '+31%', color: 'text-amber-warn' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-charcoal-border/30">
                      <span className="font-mono text-xs text-arctic-dim">{item.label}</span>
                      <div className="flex items-center gap-3">
                        <span className={`font-display text-sm font-700 ${item.color}`}>{item.value}</span>
                        <span className="font-mono text-xs text-uranium">{item.change} YoY</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Individual economy tabs */}
        {activeTab !== 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="terminal-border rounded-xl panel-dark p-8"
          >
            <div className="text-center py-16">
              <div className="font-display text-2xl text-arctic mb-4">
                {activeTab === 'green' ? '🌿 Green Economy Deep Dive' :
                 activeTab === 'blue' ? '💧 Blue Economy Analytics' :
                 '♻️ Circular Economy Intelligence'}
              </div>
              <div className="text-arctic-dim font-mono text-sm mb-6">
                Detailed modeling available in full enterprise license.
              </div>
              <div className="data-tag text-uranium">
                Contact: sarah@isotop.ai · clearance required
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
