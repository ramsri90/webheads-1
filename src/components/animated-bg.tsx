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

      {/* Subtle Static Decorative Glow Orbs (No high blur recalculations) */}
      <div
        className="absolute top-[12%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full blur-[80px] opacity-40 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(13,148,136,0.25) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[55%] -right-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full blur-[80px] opacity-35 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(34,211,238,0.22) 0%, transparent 70%)",
        }}
      />

      {/* Lightweight WebbHeads Logo Watermarks (Clean PNG rendering without continuous filter repaints) */}
      <div className="absolute top-[32%] right-[6%] w-40 h-40 sm:w-56 sm:h-56 pointer-events-none opacity-[0.12]">
        <img 
          src="/images/webbheads-logo-black.png" 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>

      <div className="absolute top-[68%] left-[4%] w-44 h-44 sm:w-60 sm:h-60 pointer-events-none opacity-[0.10]">
        <img 
          src="/images/webbheads-logo-black.png" 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>

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
