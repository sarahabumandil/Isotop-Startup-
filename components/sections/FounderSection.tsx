'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Award, Code2, TrendingUp, Globe, Brain, Stethoscope,
  Trophy, ChevronRight, MapPin, Star
} from 'lucide-react';

const achievements = [
  { icon: Trophy, label: 'Hackathon Champion', desc: 'Multiple international wins in AI & energy tech competitions', color: '#f59e0b' },
  { icon: Brain, label: 'AI Engineer', desc: 'Architected ISOTOP\'s quantum-classical neural inference stack', color: '#3b82f6' },
  { icon: TrendingUp, label: 'FX Market Analyst', desc: '3 years at FXTM — consistent alpha generation in quantitative analysis', color: '#4ade80' },
  { icon: Stethoscope, label: 'Dental Medicine', desc: 'Medical science foundation informing precision AI system design', color: '#a78bfa' },
];

const skills = [
  { name: 'Quantum ML', level: 92 },
  { name: 'Nuclear Physics Modeling', level: 87 },
  { name: 'FX Quantitative Analysis', level: 95 },
  { name: 'Reinforcement Learning', level: 89 },
  { name: 'Geospatial AI (SAR/Spectral)', level: 84 },
  { name: 'Medical Data Science', level: 91 },
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="mb-3"
    >
      <div className="flex justify-between items-center mb-1">
        <span className="font-mono text-xs text-arctic-dim">{name}</span>
        <span className="font-mono text-xs text-uranium">{level}%</span>
      </div>
      <div className="h-1 bg-charcoal-mid rounded overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 1, ease: 'easeOut' }}
          className="h-full rounded"
          style={{
            background: `linear-gradient(90deg, #4ade80, #3b82f6)`,
            boxShadow: '0 0 8px rgba(74,222,128,0.4)',
          }}
        />
      </div>
    </motion.div>
  );
}

export function FounderSection() {
  return (
    <section className="py-24 relative overflow-hidden" id="founder">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-uranium/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-quantum/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="data-tag text-uranium mb-3">// MODULE 05 — FOUNDER PROFILE</div>
          <h2 className="section-header text-4xl text-arctic mb-4">
            Meet the <span className="text-uranium">Architect</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: Profile */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Photo container */}
              <div className="relative mb-6">
                {/* Decorative frame */}
                <div className="absolute -inset-3 border border-uranium/20 rounded-2xl" />
                <div className="absolute -inset-6 border border-uranium/10 rounded-3xl" />

                {/* Corner accents */}
                {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-6 h-6`}>
                    <div className={`absolute inset-0 border-uranium/60 ${
                      i === 0 ? 'border-t-2 border-l-2 rounded-tl' :
                      i === 1 ? 'border-t-2 border-r-2 rounded-tr' :
                      i === 2 ? 'border-b-2 border-l-2 rounded-bl' :
                      'border-b-2 border-r-2 rounded-br'
                    }`} />
                  </div>
                ))}

                {/* Profile image */}
                <div className="aspect-[3/4] rounded-xl overflow-hidden terminal-border relative">
                  <img
                    src="/images/sarah.jpg"
                    alt="Sarah Ahmed Abumandil — Founder, ISOTOP"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                  {/* Name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="font-display text-lg font-700 text-arctic">Sarah Ahmed Abumandil</div>
                    <div className="data-tag text-uranium">FOUNDER & CHIEF AI OFFICER</div>
                  </div>
                </div>
              </div>

              {/* Location badge */}
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={14} className="text-uranium" />
                <span className="font-mono text-sm text-arctic-dim">Gaza, Palestine 🇵🇸</span>
              </div>

              {/* Status tags */}
              <div className="flex flex-wrap gap-2">
                {['AI Engineer', 'Dentist-in-Training', 'FX Analyst', 'Hackathon Champion'].map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded font-mono text-xs text-uranium border border-uranium/20 bg-uranium/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="terminal-border rounded-xl panel-dark p-6"
            >
              <div className="data-tag text-uranium mb-3">// PROFILE.bio</div>
              <p className="text-arctic leading-relaxed mb-4">
                Sarah Ahmed Abumandil is a rare convergence of disciplines — a dental medicine student, 
                AI engineer, and quantitative market analyst who has turned the boundaries between fields 
                into competitive advantages. From Gaza, Palestine, she builds systems that operate at the 
                frontier of human knowledge.
              </p>
              <p className="text-arctic-dim leading-relaxed mb-4">
                Her medical science background provides an intuition for <span className="text-arctic">precision, 
                systems biology, and measurement under uncertainty</span> — directly applied to reactor telemetry 
                interpretation and AI confidence calibration in ISOTOP's core engine.
              </p>
              <p className="text-arctic-dim leading-relaxed">
                At <span className="text-uranium font-semibold">FXTM</span>, she spent 3 years as a quantitative 
                market analyst, building proprietary models that consistently generated alpha — a discipline 
                that now informs ISOTOP's financial modeling for Green, Blue, and Circular economy valuation. 
                In competitions, she doesn't just participate — she wins.
              </p>
            </motion.div>

            {/* Achievement cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {achievements.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
                  className="border border-charcoal-border/50 rounded-lg p-4 panel-dark hover:border-opacity-100 transition-all group"
                  style={{ borderColor: `${item.color}20` }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                    >
                      <item.icon size={14} style={{ color: item.color }} />
                    </div>
                    <div>
                      <div className="font-mono text-sm font-semibold text-arctic mb-1">{item.label}</div>
                      <div className="font-mono text-xs text-arctic-dim leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Skill bars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="terminal-border rounded-xl panel-dark p-6"
            >
              <div className="data-tag text-uranium mb-4">// COMPETENCY_MATRIX</div>
              {skills.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.08} />
              ))}
            </motion.div>

            {/* Hackathon wins */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="border border-amber-warn/20 rounded-xl panel-dark p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Trophy size={16} className="text-amber-warn" />
                <div className="data-tag text-amber-warn">COMPETITION RECORD</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { value: '12+', label: 'Hackathons Entered' },
                  { value: '8', label: 'First Place Wins' },
                  { value: '100%', label: 'Podium Rate' },
                ].map(item => (
                  <div key={item.label}>
                    <div className="font-display text-2xl font-900 text-amber-warn">{item.value}</div>
                    <div className="data-tag mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-charcoal-border/30">
                <div className="font-mono text-xs text-arctic-dim">
                  "Building from Gaza to the world — proving that the most audacious systems 
                  emerge from the most constrained environments."
                </div>
                <div className="font-mono text-xs text-uranium mt-2">— Sarah Ahmed Abumandil</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
