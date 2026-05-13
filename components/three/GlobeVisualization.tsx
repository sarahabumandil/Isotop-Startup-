'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { REACTOR_NODES, URANIUM_DEPOSITS } from '@/lib/syntheticData';

type GlobeMode = 'reactors' | 'uranium';

function latLngToXYZ(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

export function GlobeVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const rotationRef = useRef(0);
  const [mode, setMode] = useState<GlobeMode>('reactors');
  const [hovered, setHovered] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ x: number; rotation: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const R = Math.min(W, H) * 0.36;

    function drawGlobe(rotation: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      // Deep space background
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.8);
      bgGrad.addColorStop(0, 'rgba(13,17,23,0)');
      bgGrad.addColorStop(1, 'rgba(13,17,23,0)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Atmosphere glow
      const atmosphereGrad = ctx.createRadialGradient(cx, cy, R * 0.95, cx, cy, R * 1.15);
      atmosphereGrad.addColorStop(0, mode === 'uranium' ? 'rgba(74,222,128,0.08)' : 'rgba(59,130,246,0.08)');
      atmosphereGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = atmosphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.15, 0, Math.PI * 2);
      ctx.fill();

      // Globe sphere
      const globeGrad = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R);
      globeGrad.addColorStop(0, '#1a2535');
      globeGrad.addColorStop(0.5, '#0d1420');
      globeGrad.addColorStop(1, '#060c14');
      ctx.fillStyle = globeGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // Grid lines (latitude/longitude)
      ctx.strokeStyle = 'rgba(74,222,128,0.06)';
      ctx.lineWidth = 0.5;

      // Latitude lines
      for (let lat = -75; lat <= 75; lat += 15) {
        const y = cy + R * Math.sin(lat * Math.PI / 180);
        const rx = R * Math.cos(lat * Math.PI / 180);
        if (rx > 5) {
          ctx.beginPath();
          ctx.ellipse(cx, y, rx, rx * 0.15, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Longitude lines
      for (let lng = 0; lng < 180; lng += 20) {
        const angle = (lng * Math.PI / 180) + rotation;
        ctx.beginPath();
        ctx.ellipse(cx, cy, R * Math.abs(Math.cos(angle)), R, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Continent outlines (simplified dots)
      const continentPoints = [
        // North America
        [40, -100], [45, -75], [35, -90], [50, -110], [30, -85],
        // Europe
        [50, 10], [48, 2], [52, 13], [40, 28], [55, 25],
        // Africa
        [5, 20], [-15, 30], [10, 10], [0, 35], [20, 15],
        // Asia
        [35, 80], [40, 105], [55, 60], [25, 55], [35, 130],
        // Australia
        [-25, 135], [-30, 150], [-20, 125],
        // South America
        [-10, -60], [-25, -50], [5, -75], [-35, -65],
      ];

      continentPoints.forEach(([lat, lng]) => {
        const lngRad = (lng * Math.PI / 180) + rotation;
        const latRad = lat * Math.PI / 180;
        const cosLng = Math.cos(lngRad);
        if (cosLng < 0) return; // back face culling

        const x = cx + R * Math.cos(latRad) * Math.sin(lngRad);
        const y = cy - R * Math.sin(latRad);
        const size = 2.5 + cosLng * 1.5;

        ctx.fillStyle = `rgba(30,60,40,${0.3 + cosLng * 0.3})`;
        ctx.beginPath();
        ctx.arc(x, y, size * 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw data points
      const points = mode === 'reactors' ? REACTOR_NODES : URANIUM_DEPOSITS;
      const isReactorMode = mode === 'reactors';

      points.forEach((point) => {
        const lat = point.lat;
        const lng = point.lng;
        const lngRad = (lng * Math.PI / 180) + rotation;
        const latRad = lat * Math.PI / 180;
        const cosLng = Math.cos(lngRad);

        if (cosLng < 0.1) return; // skip back-face points

        const x = cx + R * Math.cos(latRad) * Math.sin(lngRad);
        const y = cy - R * Math.sin(latRad);
        const depth = 0.3 + cosLng * 0.7;

        if (isReactorMode) {
          const node = point as typeof REACTOR_NODES[0];
          // Pulse ring
          ctx.strokeStyle = `rgba(59,130,246,${depth * 0.4})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(x, y, 12 * depth, 0, Math.PI * 2);
          ctx.stroke();

          // Core dot
          ctx.fillStyle = `rgba(59,130,246,${depth})`;
          ctx.beginPath();
          ctx.arc(x, y, 4 * depth, 0, Math.PI * 2);
          ctx.fill();

          // Glow
          const grad = ctx.createRadialGradient(x, y, 0, x, y, 15 * depth);
          grad.addColorStop(0, `rgba(59,130,246,${depth * 0.3})`);
          grad.addColorStop(1, 'rgba(59,130,246,0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(x, y, 15 * depth, 0, Math.PI * 2);
          ctx.fill();

          // Label
          if (depth > 0.6) {
            ctx.fillStyle = `rgba(240,246,255,${depth * 0.8})`;
            ctx.font = `${8 + depth * 3}px "JetBrains Mono", monospace`;
            ctx.fillText(node.name || node.id, x + 8, y - 4);
          }
        } else {
          const deposit = point as typeof URANIUM_DEPOSITS[0];
          const intensity = deposit.intensity * depth;

          // Heatmap blob
          const grad = ctx.createRadialGradient(x, y, 0, x, y, 20 * depth);
          grad.addColorStop(0, `rgba(74,222,128,${intensity * 0.8})`);
          grad.addColorStop(0.5, `rgba(74,222,128,${intensity * 0.3})`);
          grad.addColorStop(1, 'rgba(74,222,128,0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(x, y, 20 * depth, 0, Math.PI * 2);
          ctx.fill();

          // Center dot
          ctx.fillStyle = `rgba(74,222,128,${intensity})`;
          ctx.beginPath();
          ctx.arc(x, y, 5 * depth, 0, Math.PI * 2);
          ctx.fill();

          // ID label
          if (depth > 0.6) {
            ctx.fillStyle = `rgba(74,222,128,${depth * 0.9})`;
            ctx.font = `${7 + depth * 3}px "JetBrains Mono", monospace`;
            ctx.fillText(deposit.id, x + 7, y + 3);
          }
        }
      });

      // Specular highlight
      const specGrad = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.35, 0, cx, cy, R);
      specGrad.addColorStop(0, 'rgba(255,255,255,0.04)');
      specGrad.addColorStop(0.3, 'rgba(255,255,255,0.01)');
      specGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = specGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // Globe border
      ctx.strokeStyle = mode === 'uranium' ? 'rgba(74,222,128,0.15)' : 'rgba(59,130,246,0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();
    }

    let lastTime = 0;
    function animate(time: number) {
      if (!isDragging) {
        rotationRef.current += 0.003;
      }
      drawGlobe(rotationRef.current);
      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [mode, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, rotation: rotationRef.current };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragStart.current) return;
    const delta = (e.clientX - dragStart.current.x) * 0.005;
    rotationRef.current = dragStart.current.rotation + delta;
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="flex flex-col items-center">
      {/* Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode('reactors')}
          className={`px-4 py-2 font-mono text-xs tracking-widest uppercase rounded transition-all ${
            mode === 'reactors'
              ? 'bg-quantum/20 text-quantum border border-quantum/40'
              : 'text-arctic-dim border border-charcoal-border hover:text-arctic'
          }`}
        >
          Reactor Nodes
        </button>
        <button
          onClick={() => setMode('uranium')}
          className={`px-4 py-2 font-mono text-xs tracking-widest uppercase rounded transition-all ${
            mode === 'uranium'
              ? 'bg-uranium/20 text-uranium border border-uranium/40'
              : 'text-arctic-dim border border-charcoal-border hover:text-arctic'
          }`}
        >
          Uranium Deposits
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="cursor-grab active:cursor-grabbing rounded-full"
        style={{ maxWidth: '100%' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      <p className="data-tag mt-3 text-center">
        {mode === 'reactors'
          ? `${REACTOR_NODES.length} Active Reactor Nodes — Drag to Rotate`
          : `${URANIUM_DEPOSITS.length} Uranium Deposits — Spectral Intelligence`}
      </p>
    </div>
  );
}
