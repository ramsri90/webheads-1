"use client";

import React from "react";

/**
 * High-Performance Teal & White Mesh Background
 * Uses hardware-accelerated static CSS radial gradients.
 * Eliminates large continuous GPU blur composition loops to prevent RAM & CPU memory spikes.
 */
export function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-white"
      aria-hidden="true"
    >
      {/* Hardware-accelerated Seamless Gradient Canvas */}
      <div 
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage: `
            radial-gradient(80% 50% at 50% 0%, rgba(13,148,136,0.12) 0%, rgba(20,184,166,0.06) 35%, transparent 80%),
            radial-gradient(70% 60% at 90% 30%, rgba(34,211,238,0.10) 0%, rgba(224,242,241,0.25) 40%, transparent 75%),
            radial-gradient(80% 70% at 10% 60%, rgba(13,148,136,0.08) 0%, rgba(240,253,250,0.30) 50%, transparent 85%),
            radial-gradient(75% 60% at 80% 90%, rgba(34,211,238,0.08) 0%, rgba(224,242,241,0.25) 45%, transparent 80%)
          `,
        }}
      />

      {/* Morphing Cloud Blob 1 (Top Left) */}
      <div
        className="absolute top-[5%] -left-[10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-teal-500/10 rounded-full blur-[90px] opacity-60 pointer-events-none animate-cloudMorph1"
        style={{
          backgroundImage: "radial-gradient(circle at center, rgba(13,148,136,0.22) 0%, rgba(34,211,238,0.05) 50%, transparent 80%)",
        }}
      />

      {/* Morphing Cloud Blob 2 (Middle Right) */}
      <div
        className="absolute top-[40%] -right-[15%] w-[65vw] h-[65vw] max-w-[800px] max-h-[800px] bg-cyan-400/10 rounded-full blur-[100px] opacity-50 pointer-events-none animate-cloudMorph2"
        style={{
          backgroundImage: "radial-gradient(circle at center, rgba(34,211,238,0.18) 0%, rgba(13,148,136,0.04) 55%, transparent 80%)",
        }}
      />

      {/* Morphing Cloud Blob 3 (Bottom Left - Mist White) */}
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] bg-white rounded-full blur-[80px] opacity-75 pointer-events-none animate-cloudMorph3"
        style={{
          backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(224,242,241,0.3) 50%, transparent 80%)",
        }}
      />

      {/* Misty Fog Overlap Layer (adds depth and realistic light dispersion) */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[3px] pointer-events-none mix-blend-overlay" />

      {/* SVG Fine Fog Noise Texture Overlay (gives physical presence to the fog) */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-15 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, rgba(13,148,136,0.06) 0 1px, transparent 1px 96px), repeating-linear-gradient(0deg, rgba(13,148,136,0.04) 0 1px, transparent 1px 48px)`,
        }}
      />
    </div>
  );
}
