// Synthetic Physics-Informed Data Generator
// Simulates real-world reactor telemetry and satellite spectral signatures

export interface ReactorTelemetry {
  timestamp: string;
  neutronFlux: number;
  coreTemp: number;
  coolantFlow: number;
  powerOutput: number;
  controlRodPosition: number;
  pressureKPa: number;
  efficiency: number;
}

export interface UraniumDeposit {
  id: string;
  lat: number;
  lng: number;
  intensity: number;
  depthM: number;
  gradePercent: number;
  status: 'active' | 'survey' | 'dormant';
}

export interface EconomyMetric {
  timestamp: string;
  carbonOffset: number;
  desalinationLps: number;
  thermalRecycling: number;
  gridStability: number;
}

// Simulated reactor nodes
export const REACTOR_NODES = [
  { id: 'R-001', name: 'Alpha Station', lat: 30.52, lng: 32.26, country: 'Egypt', power: 1200 },
  { id: 'R-002', name: 'Beta Complex', lat: 51.38, lng: 2.96, country: 'UK', power: 1800 },
  { id: 'R-003', name: 'Gamma Plant', lat: 43.55, lng: 7.02, country: 'France', power: 1400 },
  { id: 'R-004', name: 'Delta Core', lat: 35.68, lng: 139.76, country: 'Japan', power: 1100 },
  { id: 'R-005', name: 'Epsilon Hub', lat: 37.77, lng: -122.4, country: 'USA', power: 2100 },
  { id: 'R-006', name: 'Zeta Station', lat: 55.75, lng: 37.61, country: 'Russia', power: 1600 },
];

// Uranium deposit data (satellite spectral signatures)
export const URANIUM_DEPOSITS: UraniumDeposit[] = [
  { id: 'U-001', lat: 12.36, lng: 23.55, intensity: 0.87, depthM: 120, gradePercent: 2.4, status: 'active' },
  { id: 'U-002', lat: -22.9, lng: 18.42, intensity: 0.72, depthM: 85, gradePercent: 1.8, status: 'survey' },
  { id: 'U-003', lat: 57.2, lng: 96.5, intensity: 0.94, depthM: 200, gradePercent: 3.1, status: 'active' },
  { id: 'U-004', lat: -30.5, lng: 136.8, intensity: 0.65, depthM: 60, gradePercent: 1.2, status: 'survey' },
  { id: 'U-005', lat: 63.2, lng: -110.4, intensity: 0.88, depthM: 150, gradePercent: 2.7, status: 'active' },
  { id: 'U-006', lat: 42.3, lng: 63.7, intensity: 0.76, depthM: 180, gradePercent: 2.1, status: 'dormant' },
];

// Generate reactor telemetry time series
export function generateReactorTimeSeries(points: number = 24): ReactorTelemetry[] {
  const data: ReactorTelemetry[] = [];
  const baseFlux = 2.4e14;
  const baseTemp = 320;
  
  for (let i = 0; i < points; i++) {
    const t = i / points;
    const noise = () => (Math.random() - 0.5) * 0.02;
    
    // Physics-informed oscillation (simulate diurnal load curve)
    const loadFactor = 0.85 + 0.12 * Math.sin(2 * Math.PI * t) + noise();
    const efficiency = 0.88 + 0.12 * (1 - Math.abs(Math.sin(Math.PI * t))) + noise();
    
    const now = new Date();
    now.setHours(now.getHours() - (points - i));
    
    data.push({
      timestamp: now.toISOString().substring(11, 16),
      neutronFlux: +(baseFlux * loadFactor * (1 + noise())).toFixed(2),
      coreTemp: +(baseTemp + 15 * loadFactor + noise() * 50).toFixed(1),
      coolantFlow: +(850 * loadFactor + noise() * 20).toFixed(0),
      powerOutput: +(1200 * loadFactor).toFixed(0),
      controlRodPosition: +(65 + 10 * (1 - loadFactor) + noise() * 5).toFixed(1),
      pressureKPa: +(15500 + 200 * loadFactor + noise() * 100).toFixed(0),
      efficiency: +(efficiency * 100).toFixed(2),
    });
  }
  return data;
}

// Generate economy metrics
export function generateEconomyTimeSeries(points: number = 30): EconomyMetric[] {
  const data: EconomyMetric[] = [];
  let carbonOffset = 1240000;
  let desal = 847;
  let thermal = 72;
  let grid = 99.4;

  for (let i = 0; i < points; i++) {
    const noise = () => (Math.random() - 0.5) * 0.01;
    carbonOffset += Math.random() * 8000 + 2000;
    desal = Math.max(800, Math.min(950, desal + (Math.random() - 0.5) * 20));
    thermal = Math.min(98, thermal + 0.3 + noise() * 5);
    grid = Math.max(97, Math.min(100, grid + noise() * 0.5));

    const d = new Date();
    d.setDate(d.getDate() - (points - i));

    data.push({
      timestamp: `${d.getMonth() + 1}/${d.getDate()}`,
      carbonOffset: +carbonOffset.toFixed(0),
      desalinationLps: +desal.toFixed(1),
      thermalRecycling: +thermal.toFixed(1),
      gridStability: +grid.toFixed(2),
    });
  }
  return data;
}

// VQC optimization data
export function generateVQCData(points: number = 50) {
  return Array.from({ length: points }, (_, i) => {
    const t = i / points;
    const classical = 85 + 10 * (1 - Math.exp(-t * 3)) + (Math.random() - 0.5) * 2;
    const quantum = 88 + 11.5 * (1 - Math.exp(-t * 5)) + (Math.random() - 0.5) * 1;
    return {
      iteration: i + 1,
      classical: +classical.toFixed(2),
      quantum: +quantum.toFixed(2),
      improvement: +(quantum - classical).toFixed(2),
    };
  });
}

// RL calibration data
export function generateRLData(points: number = 40) {
  let efficiency = 72;
  return Array.from({ length: points }, (_, i) => {
    const t = i / points;
    const boost = 20 * (1 - Math.exp(-t * 4));
    efficiency = 72 + boost + (Math.random() - 0.5) * 1.5;
    return {
      episode: (i + 1) * 100,
      efficiency: +efficiency.toFixed(2),
      target: 92,
      baseline: 72,
    };
  });
}

// Current system status
export const SYSTEM_STATUS = {
  reactorsOnline: 6,
  totalPowerMW: 9200,
  aiConfidence: 98.7,
  alertLevel: 'GREEN',
  uptime: '99.97%',
  lastCalibration: '2h 14m ago',
  quantumCycles: 2847392,
  carbonOffsetMT: 1.24,
};
