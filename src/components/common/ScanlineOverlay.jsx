import React from 'react';

export function ScanlineOverlay({ enabled = true }) {
  if (!enabled) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden crt-overlay opacity-60"
      aria-hidden="true"
    >
      {/* Moving scanline laser line */}
      <div className="w-full h-1 bg-cyber-cyan/10 animate-scanline shadow-[0_0_12px_rgba(0,245,212,0.3)]" />
      {/* Corner CRT vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  );
}
