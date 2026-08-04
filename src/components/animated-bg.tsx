"use client";

import React from "react";

/**
 * Teal & White Mesh Background — Seamless Continuous Blend
 * Fresh, clean white canvas with soft drifting teal/cyan glow:
 * - Teal: rgba(13, 148, 136, ...) / #0D9488
 * - Cyan: rgba(34, 211, 238, ...) / #22D3EE
 * - Deep Teal: rgba(4, 47, 46, ...) / #042F2E
 */
export function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-white"
      aria-hidden="true"
    >
      {/* 1. Base Continuous Mesh Gradient — Seamless top-to-bottom color flow */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: `
            radial-gradient(90% 60% at 50% 0%, rgba(13,148,136,0.10) 0%, rgba(20,184,166,0.08) 30%, rgba(240,253,250,0.5) 55%, rgba(255,255,255,0.9) 85%),
            radial-gradient(100% 80% at 85% 35%, rgba(34,211,238,0.10) 0%, rgba(224,242,241,0.35) 45%, transparent 75%),
            radial-gradient(110% 90% at 15% 65%, rgba(13,148,136,0.08) 0%, rgba(20,184,166,0.08) 40%, rgba(240,253,250,0.30) 70%, transparent 90%),
            radial-gradient(90% 70% at 75% 90%, rgba(34,211,238,0.08) 0%, rgba(224,242,241,0.30) 45%, transparent 80%)
          `,
        }}
      />

      {/* 2. Soft Drifting Mesh Blob 1 — Teal (Top Services / Benefits) */}
      <div
        className="absolute top-[10%] -left-[12%] w-[75vw] h-[75vw] max-w-[850px] max-h-[850px] rounded-full blur-[160px] opacity-50 pointer-events-none animate-orbFloat"
        style={{
          background: "radial-gradient(circle at center, rgba(13,148,136,0.35) 0%, rgba(20,184,166,0.25) 40%, rgba(240,253,250,0.15) 75%, transparent 100%)",
          animationDuration: "24s",
        }}
      />

      {/* 3. Soft Drifting Mesh Blob 2 — Cyan (Process / Portfolio) */}
      <div
        className="absolute top-[35%] -right-[12%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full blur-[170px] opacity-45 pointer-events-none animate-orbFloat"
        style={{
          background: "radial-gradient(circle at center, rgba(34,211,238,0.30) 0%, rgba(224,242,241,0.35) 45%, rgba(255,255,255,0.15) 75%, transparent 100%)",
          animationDuration: "28s",
          animationDelay: "-6s",
        }}
      />

      {/* 4. Soft Drifting Mesh Blob 3 — Deep Teal (Pricing / Testimonials) */}
      <div
        className="absolute top-[60%] left-[8%] w-[75vw] h-[75vw] max-w-[850px] max-h-[850px] rounded-full blur-[170px] opacity-50 pointer-events-none animate-orbFloat"
        style={{
          background: "radial-gradient(circle at center, rgba(45,212,191,0.30) 0%, rgba(13,148,136,0.28) 40%, rgba(240,253,250,0.20) 70%, transparent 100%)",
          animationDuration: "26s",
          animationDelay: "-12s",
        }}
      />

      {/* 5. Soft Drifting Mesh Blob 4 — Cyan (FAQ / Footer) */}
      <div
        className="absolute top-[82%] -right-[8%] w-[75vw] h-[75vw] max-w-[850px] max-h-[850px] rounded-full blur-[160px] opacity-45 pointer-events-none animate-orbFloat"
        style={{
          background: "radial-gradient(circle at center, rgba(8,145,178,0.28) 0%, rgba(34,211,238,0.25) 40%, rgba(224,242,241,0.35) 70%, transparent 100%)",
          animationDuration: "32s",
          animationDelay: "-18s",
        }}
      />

      {/* 6. Ambient 3D Floating WebbHeads Logo Watermark — Middle of Page (Services & Benefits) */}
      <div 
        className="absolute top-[32%] right-[6%] w-48 h-48 sm:w-64 sm:h-64 pointer-events-none animate-logoFloat3D"
        style={{ animationDuration: "18s" }}
      >
        <img 
          src="/images/webbheads-logo-black.png" 
          alt="" 
          className="w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(13,148,136,0.35)] opacity-60"
        />
      </div>

      {/* Ambient 3D Floating WebbHeads Logo Watermark — Center Page (Process & Portfolio) */}
      <div 
        className="absolute top-[52%] left-[4%] w-52 h-52 sm:w-72 sm:h-72 pointer-events-none animate-logoFloat3D"
        style={{ animationDuration: "22s", animationDelay: "-5s" }}
      >
        <img 
          src="/images/webbheads-logo-black.png" 
          alt="" 
          className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(13,148,136,0.30)] opacity-60"
        />
      </div>

      {/* Ambient 3D Floating WebbHeads Logo Watermark — Lower Middle Page (Pricing & Testimonials) */}
      <div 
        className="absolute top-[72%] right-[5%] w-48 h-48 sm:w-64 sm:h-64 pointer-events-none animate-logoFloat3D"
        style={{ animationDuration: "20s", animationDelay: "-10s" }}
      >
        <img 
          src="/images/webbheads-logo-black.png" 
          alt="" 
          className="w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(13,148,136,0.35)] opacity-60"
        />
      </div>

      {/* 7. Subtle Continuous Grid Overlay matched to Hero grid */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: [
            "repeating-linear-gradient(90deg, rgba(13,148,136,0.06) 0 1px, transparent 1px 96px)",
            "repeating-linear-gradient(0deg, rgba(13,148,136,0.04) 0 1px, transparent 1px 48px)"
          ].join(","),
        }}
      />
    </div>
  );
}
