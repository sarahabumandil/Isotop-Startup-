'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend
} from 'recharts';
import { generateVQCData, generateRLData } from '@/lib/syntheticData';
import { Cpu, Zap, TrendingUp, Activity } from 'lucide-react';

// VQC Circuit visual (canvas-based)
function VQCCircuit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;

    const qubits = 4;
    const layers = 5;
    const padding = { x: 60, y: 40 };
    const wireSpacing = (H - padding.y * 2) / (qubits - 1);
    const layerSpacing = (W - padding.x * 2) / (layers + 1);

    function drawCircuit(t: number) {
      ctx!.clearRect(0, 0, W, H);

      // Qubit wires
      for (let q = 0; q < qubits; q++) {
        const y = padding.y + q * wireSpacing;
        ctx!.strokeStyle = 'rgba(74,222,128,0.2)';
        ctx!.lineWidth = 1;
        ctx!.setLineDash([4, 4]);
        ctx!.beginPath();
        ctx!.moveTo(padding.x, y);
        ctx!.lineTo(W - padding.x, y);
        ctx!.stroke();
        ctx!.setLineDash([]);

        // Qubit label
        ctx!.fillStyle = 'rgba(74,222,128,0.7)';
        ctx!.font = '10px JetBrains Mono, monospace';
        ctx!.fillText(`|q${q}⟩`, 8, y + 4);
      }

      // Gates
      const gates = [
        { layer: 0, qubit: 0, type: 'H' },
        { layer: 0, qubit: 2, type: 'H' },
        { layer: 1, qubit: 0, type: 'Rx' },
        { layer: 1, qubit: 1, type: 'Ry' },
        { layer: 1, qubit: 2, type: 'Rz' },
        { layer: 1, qubit: 3, type: 'Rx' },
        { layer: 2, qubit: 0, type: 'CNOT', target: 1 },
        { layer: 2, qubit: 2, type: 'CNOT', target: 3 },
        { layer: 3, qubit: 1, type: 'Ry' },
        { layer: 3, qubit: 3, type: 'Rz' },
        { layer: 4, qubit: 0, type: 'M' },
        { layer: 4, qubit: 1, type: 'M' },
        { layer: 4, qubit: 2, type: 'M' },
        { layer: 4, qubit: 3, type: 'M' },
      ];

      gates.forEach(gate => {
        const x = padding.x + (gate.layer + 1) * layerSpacing;
        const y = padding.y + gate.qubit * wireSpacing;
        const phase = t * 0.05 + gate.layer * 0.8 + gate.qubit * 0.5;
        const pulse = 0.6 + 0.4 * Math.sin(phase);

        if (gate.type === 'CNOT' && gate.target !== undefined) {
          const targetY = padding.y + gate.target * wireSpacing;
          // Control dot
          ctx!.fillStyle = `rgba(59,130,246,${pulse})`;
          ctx!.beginPath();
          ctx!.arc(x, y, 5, 0, Math.PI * 2);
          ctx!.fill();
          // Line to target
          ctx!.strokeStyle = `rgba(59,130,246,${pulse * 0.6})`;
          ctx!.lineWidth = 1.5;
          ctx!.beginPath();
          ctx!.moveTo(x, y);
          ctx!.lineTo(x, targetY);
          ctx!.stroke();
          // Target circle
          ctx!.strokeStyle = `rgba(59,130,246,${pulse})`;
          ctx!.lineWidth = 1.5;
          ctx!.beginPath();
          ctx!.arc(x, targetY, 8, 0, Math.PI * 2);
          ctx!.stroke();
          ctx!.beginPath();
          ctx!.moveTo(x - 8, targetY);
          ctx!.lineTo(x + 8, targetY);
          ctx!.stroke();
          ctx!.beginPath();
          ctx!.moveTo(x, targetY - 8);
          ctx!.lineTo(x, targetY + 8);
          ctx!.stroke();
          return;
        }

        // Gate box
        const gateColor = gate.type === 'M' ? '#f59e0b' :
                         gate.type === 'H' ? '#a78bfa' : '#3b82f6';
        ctx!.fillStyle = `${gateColor}${Math.floor(pulse * 30).toString(16).padStart(2, '0')}`;
        ctx!.strokeStyle = `${gateColor}${Math.floor(pulse * 200).toString(16).padStart(2, '0')}`;
        ctx!.lineWidth = 1;
        ctx!.fillRect(x - 12, y - 10, 24, 20);
        ctx!.strokeRect(x - 12, y - 10, 24, 20);

        // Gate label
        ctx!.fillStyle = `rgba(240,246,255,${pulse})`;
        ctx!.font = 'bold 9px JetBrains Mono, monospace';
        ctx!.textAlign = 'center';
        ctx!.fillText(gate.type, x, y + 3);
        ctx!.textAlign = 'left';
      });

      // Travelling quantum state (photon)
      const photonX = padding.x + ((t * 1.5) % (W - padding.x * 2));
      const photonQ = Math.floor(((t * 0.03) % qubits));
      const photonY = padding.y + photonQ * wireSpacing;
      const glow = ctx!.createRadialGradient(photonX, photonY, 0, photonX, photonY, 12);
      glow.addColorStop(0, 'rgba(74,222,128,0.8)');
      glow.addColorStop(1, 'rgba(74,222,128,0)');
      ctx!.fillStyle = glow;
      ctx!.beginPath();
      ctx!.arc(photonX, photonY, 12, 0, Math.PI * 2);
      ctx!.fill();
    }

    function animate() {
      timeRef.current += 1;
      drawCircuit(timeRef.current);
      animRef.current = requestAnimationFrame(animate);
    }
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={480}
      height={220}
      className="w-full rounded"
      style={{ maxWidth: '100%' }}
    />
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="terminal-border rounded p-3 panel-dark text-xs font-mono">
      <div className="text-arctic-dim mb-1">{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ color: p.color }}>{p.name}: {p.value}%</div>
      ))}
    </div>
  );
};

export function TechnicalMoatSection() {
  const [vqcData] = useState(() => generateVQCData(30));
  const [rlData, setRlData] = useState(() => generateRLData(25));
  const [liveEfficiency, setLiveEfficiency] = useState(92.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveEfficiency(v => Math.min(99, +(v + (Math.random() - 0.3) * 0.2).toFixed(2)));
      setRlData(prev => {
        const last = prev[prev.length - 1];
        const next = {
          episode: last.episode + 100,
          efficiency: Math.min(98, +(last.efficiency + (Math.random() - 0.2) * 0.5).toFixed(2)),
          target: 92,
          baseline: 72,
        };
        return [...prev.slice(-24), next];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="data-tag text-uranium mb-3">// MODULE 04 — TECHNICAL MOAT</div>
          <h2 className="section-header text-4xl text-arctic mb-4">
            Quantum-Classical <span className="text-quantum">Intelligence</span>
          </h2>
          <p className="text-arctic-dim max-w-2xl">
            Variational Quantum Circuits (VQC) optimize neutron flux predictions while 
            Reinforcement Learning agents autonomously calibrate reactor parameters — 
            achieving sustained efficiency gains impossible with classical systems alone.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* VQC Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="quantum-border rounded-xl panel-dark p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded flex items-center justify-center bg-quantum/10 border border-quantum/30">
                <Cpu size={16} className="text-quantum" />
              </div>
              <div>
                <div className="font-display text-sm font-700 text-arctic">Quantum-Classical Bridge</div>
                <div className="data-tag">Variational Quantum Circuit — Neutron Flux Optimization</div>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-quantum animate-pulse" />
                <span className="font-mono text-xs text-quantum">ACTIVE</span>
              </div>
            </div>

            <VQCCircuit />

            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { label: 'Qubits', value: '4', color: 'text-quantum' },
                { label: 'Circuit Depth', value: '5L', color: 'text-quantum' },
                { label: 'Fidelity', value: '99.1%', color: 'text-uranium' },
              ].map(item => (
                <div key={item.label} className="text-center p-2 rounded border border-charcoal-border/50">
                  <div className={`font-display text-lg font-700 ${item.color}`}>{item.value}</div>
                  <div className="data-tag">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <div className="data-tag mb-2">VQC vs Classical Accuracy</div>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vqcData}>
                    <XAxis dataKey="iteration" hide />
                    <YAxis domain={[83, 101]} hide />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="classical" name="Classical" stroke="#8b949e" strokeWidth={1.5} dot={false} />
                    <Line type="monotone" dataKey="quantum" name="VQC" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* RL Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="terminal-border rounded-xl panel-dark p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded flex items-center justify-center bg-uranium/10 border border-uranium/30">
                <TrendingUp size={16} className="text-uranium" />
              </div>
              <div>
                <div className="font-display text-sm font-700 text-arctic">RL Calibration Engine</div>
                <div className="data-tag">Autonomous Efficiency Optimization — Live Feed</div>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-uranium animate-pulse" />
                <span className="font-mono text-xs text-uranium">LIVE</span>
              </div>
            </div>

            {/* Big efficiency number */}
            <div className="text-center py-6 mb-4 border border-charcoal-border/30 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-uranium/3" />
              <div className="relative">
                <div className="data-tag mb-2">CURRENT EFFICIENCY BOOST</div>
                <div className="font-display text-6xl font-900 text-uranium text-glow-uranium">
                  +{(liveEfficiency - 72).toFixed(1)}%
                </div>
                <div className="font-mono text-xs text-arctic-dim mt-2">
                  vs. baseline: 72% → {liveEfficiency.toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="h-48 mb-4">
              <div className="data-tag mb-2">Efficiency over Training Episodes</div>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rlData}>
                  <XAxis dataKey="episode" hide />
                  <YAxis domain={[68, 100]} hide />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={72} stroke="#8b949e" strokeDasharray="3 3" label={{ value: 'Baseline', fill: '#8b949e', fontSize: 10 }} />
                  <ReferenceLine y={92} stroke="#4ade80" strokeDasharray="3 3" label={{ value: 'Target', fill: '#4ade80', fontSize: 10 }} />
                  <Line type="monotone" dataKey="efficiency" name="RL Agent" stroke="#4ade80" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Training Episodes', value: '2.84M', color: 'text-uranium' },
                { label: 'Reward Function', value: 'Multi-obj.', color: 'text-uranium' },
                { label: 'Action Space', value: '14-dim', color: 'text-arctic-dim' },
                { label: 'Convergence', value: 'PPO-CLIP', color: 'text-arctic-dim' },
              ].map(item => (
                <div key={item.label} className="p-2 rounded border border-charcoal-border/50">
                  <div className={`font-mono text-sm font-semibold ${item.color}`}>{item.value}</div>
                  <div className="data-tag">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
