# ISOTOP — AI-Driven Nuclear Reactor Management Platform

> *"Managing the future of global energy."*  
> Designed & Engineered by **Sarah Ahmed Abumandil** · Gaza, Palestine 🇵🇸

---

## Overview

ISOTOP is a high-end industrial SaaS platform for AI-driven nuclear reactor management and geospatial uranium localization. Built with a Palantir/Tesla-grade aesthetic and heavy technical depth, it combines quantum-classical intelligence, reinforcement learning, and satellite spectral analysis into a unified operations platform.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + custom design system |
| Animation | Framer Motion |
| 3D/Canvas | Custom Canvas 2D globe (Three.js-ready) |
| Charts | Recharts |
| Backend | Python FastAPI |
| Physics Engine | NumPy (point-kinetics model) |
| Deployment | Vercel (frontend) |

## Project Structure

```
isotop/
├── app/                         # Next.js App Router
│   ├── page.tsx                 # Home page
│   ├── operations/page.tsx      # SaaS Operations Dashboard
│   ├── insights/page.tsx        # Strategic Financial Insights
│   ├── about/page.tsx           # Founder Profile
│   ├── layout.tsx               # Root layout + metadata
│   └── globals.css              # Design system CSS
│
├── components/
│   ├── sections/
│   │   ├── Navigation.tsx       # Fixed nav with status bar
│   │   ├── HeroSection.tsx      # Landing hero + live metrics
│   │   ├── GlobeSection.tsx     # Globe wrapper section
│   │   ├── TripleEconomyDashboard.tsx  # Green/Blue/Circular
│   │   ├── TechnicalMoatSection.tsx    # VQC + RL panels
│   │   ├── FounderSection.tsx   # Sarah Abumandil profile
│   │   ├── SecureVaultEntry.tsx # Animated auth portal
│   │   └── FooterSection.tsx    # Footer
│   ├── three/
│   │   └── GlobeVisualization.tsx  # Interactive canvas globe
│   └── ui/
│       └── NoiseOverlay.tsx     # Film grain overlay
│
├── lib/
│   └── syntheticData.ts         # Physics-informed data generator
│
├── public/
│   └── images/
│       └── sarah.jpg            # ← ADD YOUR PHOTO HERE
│
├── python-api/                  # Python FastAPI backend
│   ├── main.py                  # Full REST API
│   └── requirements.txt
│
├── tailwind.config.js
├── next.config.js
├── vercel.json
└── package.json
```

## Quick Start

### Frontend

```bash
npm install
npm run dev
# → http://localhost:3000
```

### Python API (optional — frontend uses synthetic data by default)

```bash
cd python-api
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
# → http://localhost:8000/docs
```

## Adding Sarah's Photo

1. Place `sarah.jpg` (or rename your image) in `public/images/`
2. The `FounderSection` component references `/images/sarah.jpg` automatically
3. For best results, use a portrait-oriented photo (3:4 ratio)

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero + Globe + Economy + VQC/RL + Founder + Vault |
| Operations | `/operations` | Full reactor management dashboard |
| Insights | `/insights` | Financial modeling for triple economy |
| About | `/about` | Sarah Abumandil founder profile |

## Visual Identity

- **Background**: Ultra-dark (`#0d1117` charcoal, `#161b22` slate)
- **Uranium Green**: `#4ade80` — energy metrics, primary accent
- **Quantum Blue**: `#3b82f6` — AI/ML metrics, secondary accent
- **Arctic White**: `#f0f6ff` — typography
- **Font Display**: Orbitron (military/aerospace terminal feel)
- **Font Body**: Inter
- **Font Mono**: JetBrains Mono

## Python Physics Model

The `ReactorPhysicsEngine` in `python-api/main.py` implements:

- **Point kinetics**: one-group neutron balance with delayed neutrons (β = 0.0065 for U-235)
- **Thermal hydraulics**: `T_out = T_in + Q / (ṁ · Cp)` energy balance
- **Rankine efficiency**: Carnot-bounded with empirical 65% correction factor
- **Diurnal load curve**: sinusoidal demand variation (peak morning/evening)

## Deployment

```bash
# Vercel
vercel --prod

# Environment variables (optional — for live Python API)
NEXT_PUBLIC_API_URL=https://your-python-api.railway.app
```

---

**Author**: Sarah Ahmed Abumandil  
**Contact**: sarah@isotop.ai  
**Location**: Gaza, Palestine 🇵🇸  
**Clearance Level**: ALPHA-7
