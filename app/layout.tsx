import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/sections/Navigation';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';

export const metadata: Metadata = {
  title: 'ISOTOP | AI-Driven Nuclear Reactor Management',
  description: 'Pioneer platform for AI-driven nuclear reactor management and geospatial uranium localization. Quantum-classical intelligence for the future of global energy.',
  keywords: ['nuclear energy', 'AI management', 'reactor control', 'uranium localization', 'quantum computing', 'green energy'],
  authors: [{ name: 'Sarah Ahmed Abumandil' }],
  openGraph: {
    title: 'ISOTOP | Nuclear AI Management Platform',
    description: 'The future of global energy management starts here.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-charcoal text-arctic antialiased">
        <NoiseOverlay />
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
