'use client';

import { motion } from 'framer-motion';
import { GlobeVisualization } from '@/components/three/GlobeVisualization';
import { REACTOR_NODES, URANIUM_DEPOSITS } from '@/lib/syntheticData';
import { Globe, Zap, Radiation } from 'lucide-react';

export function GlobeSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal-light/30 to-charcoal" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <GlobeVisualization />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="data-tag text-uranium mb-3">// MODULE 02 — 3D DIGITAL TWIN</div>
            <h2 className="section-header text-4xl text-arctic mb-6">
              Global Reactor &<br />
              <span className="text-uranium">Uranium Intelligence</span>
            </h2>
            <p className="text-arctic-dim leading-relaxed mb-8">
              The ISOTOP Digital Twin provides a real-time geospatial overview of all 
              active reactor nodes and satellite-detected uranium deposits. Toggle between 
              operational and geological views, drag to explore.
            </p>

            {/* Reactor list */}
            <div className="mb-6">
              <div className="data-tag text-quantum mb-3">ACTIVE REACTOR NODES</div>
              <div className="space-y-2">
                {REACTOR_NODES.slice(0, 4).map(node => (
                  <div key={node.id} className="flex items-center gap-3 py-2 border-b border-charcoal-border/30">
                    <span className="w-2 h-2 rounded-full bg-quantum animate-pulse flex-shrink-0" />
                    <span className="font-mono text-xs text-arctic flex-1">{node.name}</span>
                    <span className="font-mono text-xs text-arctic-dim">{node.country}</span>
                    <span className="font-mono text-xs text-quantum">{node.power} MWe</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deposit summary */}
            <div className="terminal-border rounded-lg p-4">
              <div className="data-tag text-uranium mb-3">URANIUM DEPOSIT INTELLIGENCE</div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-display text-xl text-uranium font-700">
                    {URANIUM_DEPOSITS.filter(d => d.status === 'active').length}
                  </div>
                  <div className="data-tag">Active</div>
                </div>
                <div>
                  <div className="font-display text-xl text-amber-warn font-700">
                    {URANIUM_DEPOSITS.filter(d => d.status === 'survey').length}
                  </div>
                  <div className="data-tag">Survey</div>
                </div>
                <div>
                  <div className="font-display text-xl text-arctic-dim font-700">
                    {URANIUM_DEPOSITS.filter(d => d.status === 'dormant').length}
                  </div>
                  <div className="data-tag">Dormant</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
