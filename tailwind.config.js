/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'uranium': '#4ade80',
        'uranium-dim': '#22c55e',
        'uranium-dark': '#16a34a',
        'quantum': '#3b82f6',
        'quantum-dim': '#2563eb',
        'quantum-dark': '#1d4ed8',
        'slate-950': '#020617',
        'charcoal': '#0d1117',
        'charcoal-light': '#161b22',
        'charcoal-mid': '#21262d',
        'charcoal-border': '#30363d',
        'arctic': '#f0f6ff',
        'arctic-dim': '#8b949e',
        'threat-red': '#ef4444',
        'amber-warn': '#f59e0b',
      },
      fontFamily: {
        'display': ['var(--font-orbitron)', 'monospace'],
        'body': ['var(--font-inter)', 'sans-serif'],
        'mono': ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'data-flow': 'dataFlow 1.5s ease infinite',
        'flicker': 'flicker 8s linear infinite',
        'rotate-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #4ade80, 0 0 10px #4ade80' },
          '100%': { boxShadow: '0 0 20px #4ade80, 0 0 40px #4ade80, 0 0 60px #4ade80' },
        },
        dataFlow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '92%': { opacity: 1 },
          '93%': { opacity: 0.8 },
          '94%': { opacity: 1 },
          '96%': { opacity: 0.9 },
          '97%': { opacity: 1 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234ade80' fill-opacity='0.03'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'hex-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.04'%3E%3Cpath d='M30 0L60 17.3v34.6L30 69.3 0 51.9V17.3z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
