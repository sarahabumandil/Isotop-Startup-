# ISOTOP Python API

Physics-informed reactor telemetry simulation server built with FastAPI + NumPy.

## Setup

```bash
cd python-api
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Platform info |
| GET | `/api/v1/reactors/telemetry` | All reactor live telemetry |
| GET | `/api/v1/reactors/{id}/telemetry` | Single reactor telemetry |
| GET | `/api/v1/reactors/{id}/history?points=24` | Time-series history |
| GET | `/api/v1/uranium/deposits` | Satellite spectral data |
| GET | `/api/v1/economy/snapshot` | Triple economy metrics |
| GET | `/api/v1/ai/rl-calibration` | RL agent state |
| GET | `/api/v1/ai/vqc-optimization` | VQC accuracy trajectory |
| GET | `/api/v1/system/status` | Global health summary |
| GET | `/api/v1/founder` | Founder profile |

## Physics Model

The `ReactorPhysicsEngine` class uses:
- **Point kinetics** with one delayed neutron group
- **Thermal-hydraulics**: energy balance for coolant outlet temperature
- **Rankine cycle efficiency**: Carnot-bounded with empirical correction factor
- **Diurnal load curve**: sinusoidal demand variation

Interactive docs: `http://localhost:8000/docs`
