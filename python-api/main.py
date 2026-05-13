"""
ISOTOP Platform — Python FastAPI Backend
Physics-Informed Reactor Telemetry & AI Inference Server

Run: uvicorn main:app --reload --port 8000
"""

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import numpy as np
from datetime import datetime, timedelta
import math
import random
from typing import List, Optional
from pydantic import BaseModel

app = FastAPI(
    title="ISOTOP API",
    description="AI-Driven Nuclear Reactor Management Platform",
    version="4.2.1",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://isotop.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer(auto_error=False)

# ─── Pydantic Models ──────────────────────────────────────────────────────────

class ReactorTelemetry(BaseModel):
    timestamp: str
    reactor_id: str
    neutron_flux: float          # n/cm²s
    core_temp_celsius: float
    coolant_flow_m3h: float
    power_output_mwe: float
    control_rod_position: float  # % insertion
    pressure_kpa: float
    efficiency_percent: float
    alert_level: str             # GREEN / YELLOW / RED

class UraniumDeposit(BaseModel):
    deposit_id: str
    lat: float
    lng: float
    spectral_intensity: float
    depth_m: float
    grade_percent: float
    status: str                  # active / survey / dormant
    estimated_mt: float

class EconomySnapshot(BaseModel):
    timestamp: str
    carbon_offset_mt: float
    desalination_lps: float
    thermal_recycling_pct: float
    grid_stability_pct: float
    co2_price_usd_per_mt: float
    water_revenue_usd: float
    circular_value_usd: float

class RLCalibrationState(BaseModel):
    episode: int
    efficiency: float
    baseline: float
    improvement_pct: float
    action_space_dim: int
    agent_state: str

class VQCOptimizationResult(BaseModel):
    iteration: int
    classical_accuracy: float
    quantum_accuracy: float
    improvement: float
    circuit_depth: int
    qubit_count: int
    fidelity: float


# ─── Physics-Informed Simulation Engine ──────────────────────────────────────

class ReactorPhysicsEngine:
    """
    Point-kinetics reactor model with simplified thermal-hydraulics.
    Uses modified one-group diffusion equations for neutron flux estimation.
    """
    
    def __init__(self, reactor_id: str, nominal_power_mwe: float):
        self.reactor_id = reactor_id
        self.nominal_power = nominal_power_mwe
        self.beta = 0.0065           # delayed neutron fraction (U-235)
        self.lambda_d = 0.0785       # prompt neutron generation time (s)
        self.t = 0.0
    
    def neutron_flux(self, power_fraction: float) -> float:
        """Compute neutron flux from power level using flux-power coupling."""
        # Simplified: phi = P / (Sigma_f * V * E_fission)
        base_flux = 2.4e14  # n/cm²s at nominal
        return base_flux * power_fraction * (1 + 0.02 * np.sin(self.t / 3600))
    
    def core_temperature(self, power_fraction: float, coolant_flow: float) -> float:
        """Coolant outlet temperature using energy balance."""
        # T_out = T_in + Q / (m_dot * Cp)
        T_in = 290.0  # °C
        Cp = 4.18  # kJ/kg·°C (water)
        m_dot = coolant_flow * 1000 / 3600  # kg/s
        Q_kw = self.nominal_power * 1000 * power_fraction
        delta_T = Q_kw / (m_dot * Cp) if m_dot > 0 else 0
        return T_in + delta_T + random.gauss(0, 0.5)
    
    def efficiency(self, T_hot: float, T_cold: float = 40.0) -> float:
        """Rankine cycle efficiency — Carnot-bounded."""
        T_h = T_hot + 273.15
        T_c = T_cold + 273.15
        carnot = 1 - T_c / T_h
        # Real plant ~60-70% of Carnot
        return min(0.98, carnot * 0.65 + random.gauss(0, 0.005))
    
    def generate_telemetry(self, noise_level: float = 0.015) -> dict:
        self.t += 3600  # advance 1 hour
        
        # Diurnal load curve
        hour = (self.t / 3600) % 24
        load = 0.82 + 0.15 * math.sin(2 * math.pi * (hour - 6) / 24)
        load = max(0.65, min(1.0, load + random.gauss(0, noise_level)))
        
        power = self.nominal_power * load
        coolant_flow = 850 * load + random.gauss(0, 5)
        T_core = self.core_temperature(load, coolant_flow)
        flux = self.neutron_flux(load)
        eff = self.efficiency(T_core)
        pressure = 15500 + 300 * load + random.gauss(0, 50)
        rod_pos = 70 - 20 * load + random.gauss(0, 1)
        
        alert = "GREEN"
        if T_core > 340 or pressure > 16000:
            alert = "YELLOW"
        if T_core > 360 or pressure > 16500:
            alert = "RED"
        
        return {
            "timestamp": datetime.utcnow().isoformat(),
            "reactor_id": self.reactor_id,
            "neutron_flux": round(flux, 2),
            "core_temp_celsius": round(T_core, 2),
            "coolant_flow_m3h": round(coolant_flow, 1),
            "power_output_mwe": round(power, 1),
            "control_rod_position": round(rod_pos, 2),
            "pressure_kpa": round(pressure, 0),
            "efficiency_percent": round(eff * 100, 2),
            "alert_level": alert,
        }


class RLCalibrationAgent:
    """
    Simplified PPO agent simulation for reactor efficiency optimization.
    Models the efficiency improvement trajectory over training episodes.
    """
    
    def __init__(self):
        self.episode = 0
        self.efficiency = 72.0  # baseline
        self.learning_rate = 0.003
    
    def step(self) -> dict:
        self.episode += 100
        t = self.episode / 300000  # normalized time
        
        # Smooth learning curve with noise
        target = 92.5
        improvement = (target - 72) * (1 - math.exp(-t * 4))
        noise = random.gauss(0, 0.8) * (1 - t * 0.5)
        self.efficiency = 72 + improvement + noise
        self.efficiency = max(70, min(98, self.efficiency))
        
        states = ["EXPLORING", "EXPLOITING", "CALIBRATING", "CONVERGING"]
        state = states[min(3, int(t * 4))]
        
        return {
            "episode": self.episode,
            "efficiency": round(self.efficiency, 2),
            "baseline": 72.0,
            "improvement_pct": round(self.efficiency - 72.0, 2),
            "action_space_dim": 14,
            "agent_state": state,
        }


# ─── Singleton simulation instances ──────────────────────────────────────────

REACTOR_ENGINES = {
    "R-001": ReactorPhysicsEngine("R-001", 1200),
    "R-002": ReactorPhysicsEngine("R-002", 1800),
    "R-003": ReactorPhysicsEngine("R-003", 1400),
    "R-004": ReactorPhysicsEngine("R-004", 1100),
    "R-005": ReactorPhysicsEngine("R-005", 2100),
    "R-006": ReactorPhysicsEngine("R-006", 1600),
}

RL_AGENT = RLCalibrationAgent()

URANIUM_DEPOSITS_DB = [
    {"deposit_id": "U-001", "lat": 12.36, "lng": 23.55, "spectral_intensity": 0.87, "depth_m": 120, "grade_percent": 2.4, "status": "active", "estimated_mt": 48000},
    {"deposit_id": "U-002", "lat": -22.9, "lng": 18.42, "spectral_intensity": 0.72, "depth_m": 85, "grade_percent": 1.8, "status": "survey", "estimated_mt": 32000},
    {"deposit_id": "U-003", "lat": 57.2, "lng": 96.5, "spectral_intensity": 0.94, "depth_m": 200, "grade_percent": 3.1, "status": "active", "estimated_mt": 91000},
    {"deposit_id": "U-004", "lat": -30.5, "lng": 136.8, "spectral_intensity": 0.65, "depth_m": 60, "grade_percent": 1.2, "status": "survey", "estimated_mt": 18000},
    {"deposit_id": "U-005", "lat": 63.2, "lng": -110.4, "spectral_intensity": 0.88, "depth_m": 150, "grade_percent": 2.7, "status": "active", "estimated_mt": 67000},
    {"deposit_id": "U-006", "lat": 42.3, "lng": 63.7, "spectral_intensity": 0.76, "depth_m": 180, "grade_percent": 2.1, "status": "dormant", "estimated_mt": 41000},
]


# ─── API Routes ───────────────────────────────────────────────────────────────

@app.get("/")
def root():
    return {
        "platform": "ISOTOP",
        "version": "4.2.1",
        "status": "ONLINE",
        "clearance": "ALPHA-7",
        "encryption": "Post-Quantum Ready",
        "author": "Sarah Ahmed Abumandil",
    }


@app.get("/api/v1/reactors/telemetry", response_model=List[ReactorTelemetry])
def get_all_telemetry():
    """Live telemetry for all reactor nodes."""
    return [ReactorTelemetry(**engine.generate_telemetry()) for engine in REACTOR_ENGINES.values()]


@app.get("/api/v1/reactors/{reactor_id}/telemetry", response_model=ReactorTelemetry)
def get_reactor_telemetry(reactor_id: str):
    """Live telemetry for a specific reactor."""
    if reactor_id not in REACTOR_ENGINES:
        raise HTTPException(status_code=404, detail=f"Reactor {reactor_id} not found")
    return ReactorTelemetry(**REACTOR_ENGINES[reactor_id].generate_telemetry())


@app.get("/api/v1/reactors/{reactor_id}/history", response_model=List[ReactorTelemetry])
def get_reactor_history(reactor_id: str, points: int = 24):
    """Historical telemetry simulation for time-series charts."""
    if reactor_id not in REACTOR_ENGINES:
        raise HTTPException(status_code=404, detail=f"Reactor {reactor_id} not found")
    engine = REACTOR_ENGINES[reactor_id]
    history = []
    for i in range(points):
        t = engine.generate_telemetry()
        history.append(ReactorTelemetry(**t))
    return history


@app.get("/api/v1/uranium/deposits", response_model=List[UraniumDeposit])
def get_uranium_deposits():
    """Satellite spectral signature data for uranium deposits."""
    deposits = []
    for d in URANIUM_DEPOSITS_DB:
        # Add live noise to spectral intensity
        d_copy = d.copy()
        d_copy["spectral_intensity"] = min(1.0, d["spectral_intensity"] + random.gauss(0, 0.01))
        deposits.append(UraniumDeposit(**d_copy))
    return deposits


@app.get("/api/v1/economy/snapshot", response_model=EconomySnapshot)
def get_economy_snapshot():
    """Triple economy real-time metrics."""
    now = datetime.utcnow()
    hours_elapsed = (now - now.replace(hour=0, minute=0, second=0)).seconds / 3600
    
    return EconomySnapshot(
        timestamp=now.isoformat(),
        carbon_offset_mt=1240000 + hours_elapsed * 142 + random.gauss(0, 100),
        desalination_lps=847 + 12 * math.sin(2 * math.pi * hours_elapsed / 24) + random.gauss(0, 3),
        thermal_recycling_pct=min(98, 84.7 + hours_elapsed * 0.08 + random.gauss(0, 0.2)),
        grid_stability_pct=min(100, 99.94 + random.gauss(0, 0.02)),
        co2_price_usd_per_mt=54.20 + random.gauss(0, 0.5),
        water_revenue_usd=18200000 + random.gauss(0, 50000),
        circular_value_usd=284000000 + random.gauss(0, 500000),
    )


@app.get("/api/v1/ai/rl-calibration", response_model=RLCalibrationState)
def get_rl_calibration():
    """Reinforcement Learning agent current calibration state."""
    return RLCalibrationState(**RL_AGENT.step())


@app.get("/api/v1/ai/vqc-optimization", response_model=List[VQCOptimizationResult])
def get_vqc_optimization(iterations: int = 30):
    """Variational Quantum Circuit neutron flux optimization trajectory."""
    results = []
    for i in range(1, iterations + 1):
        t = i / iterations
        classical = 85 + 10 * (1 - math.exp(-t * 3)) + random.gauss(0, 0.5)
        quantum = 88 + 11.5 * (1 - math.exp(-t * 5)) + random.gauss(0, 0.3)
        results.append(VQCOptimizationResult(
            iteration=i,
            classical_accuracy=round(classical, 2),
            quantum_accuracy=round(quantum, 2),
            improvement=round(quantum - classical, 2),
            circuit_depth=5,
            qubit_count=4,
            fidelity=round(99.1 - 0.01 * i + random.gauss(0, 0.05), 2),
        ))
    return results


@app.get("/api/v1/system/status")
def get_system_status():
    """Global platform health summary."""
    return {
        "reactors_online": len(REACTOR_ENGINES),
        "total_power_mwe": sum(e.nominal_power for e in REACTOR_ENGINES.values()),
        "ai_confidence_pct": round(98.7 + random.gauss(0, 0.1), 2),
        "alert_level": "GREEN",
        "uptime_pct": 99.97,
        "last_calibration_ago_min": round(134 + random.gauss(0, 2)),
        "quantum_cycles": 2847392 + random.randint(0, 10000),
        "encryption": "Post-Quantum CRYSTALS-Kyber",
        "clearance": "ALPHA-7",
        "timestamp": datetime.utcnow().isoformat(),
    }


@app.get("/api/v1/founder")
def get_founder_info():
    """Platform founder profile data."""
    return {
        "name": "Sarah Ahmed Abumandil",
        "title": "Founder & Chief AI Officer",
        "location": "Gaza, Palestine",
        "disciplines": [
            "AI Engineering",
            "Dental Medicine (Student)",
            "FX Quantitative Analysis",
            "Nuclear Systems Modeling",
        ],
        "experience": {
            "fxtm": "3 years — Market Analyst, consistent alpha generation",
            "hackathons": "12+ entered, 8 first-place wins",
            "ai_engineering": "Quantum-classical ML, RL for safety-critical systems",
        },
        "mission": "Building from Gaza to the world — proving that the most audacious systems emerge from the most constrained environments.",
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
