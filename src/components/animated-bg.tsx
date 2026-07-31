"use client";

import React from "react";

/**
 * Sunset Coral Mesh Background — Seamless Continuous Blend
 * Matches the exact Hero section colors and creates a 100% continuous, zero-seam gradient flow:
 * - Coral Sunset Peach: rgba(252, 166, 154, ...) / #FCA69A
 * - Crimson Red: rgba(214, 76, 82, ...) / #D64C52
 * - Deep Plum / Wine: rgba(61, 36, 47, ...) / #3D242F
 * - Midnight Indigo: rgba(39, 38, 67, ...) / #272643
 * - Electric Indigo Accent: rgba(88, 112, 255, ...) / #5870FF
 */
export function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-black"
      aria-hidden="true"
    >
      {/* 1. Base Continuous Mesh Gradient — Seamless top-to-bottom color flow */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: `
            radial-gradient(90% 60% at 50% 0%, rgba(252,166,154,0.35) 0%, rgba(214,76,82,0.25) 30%, rgba(61,36,47,0.25) 55%, rgba(8,8,12,0.9) 85%),
            radial-gradient(100% 80% at 85% 35%, rgba(88,112,255,0.25) 0%, rgba(39,38,67,0.35) 45%, transparent 75%),
            radial-gradient(110% 90% at 15% 65%, rgba(252,166,154,0.28) 0%, rgba(214,76,82,0.25) 40%, rgba(61,36,47,0.20) 70%, transparent 90%),
            radial-gradient(90% 70% at 75% 90%, rgba(88,112,255,0.20) 0%, rgba(61,36,47,0.30) 45%, transparent 80%)
          `,
        }}
      />

      {/* 2. Soft Drifting Mesh Blob 1 — Warm Coral (Top Services / Benefits) */}
      <div
        className="absolute top-[10%] -left-[12%] w-[75vw] h-[75vw] max-w-[850px] max-h-[850px] rounded-full blur-[160px] opacity-60 pointer-events-none animate-orbFloat"
        style={{
          background: "radial-gradient(circle at center, rgba(252,166,154,0.50) 0%, rgba(214,76,82,0.35) 40%, rgba(61,36,47,0.15) 75%, transparent 100%)",
          animationDuration: "24s",
        }}
      />

      {/* 3. Soft Drifting Mesh Blob 2 — Midnight Indigo & Violet (Process / Portfolio) */}
      <div
        className="absolute top-[35%] -right-[12%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full blur-[170px] opacity-55 pointer-events-none animate-orbFloat"
        style={{
          background: "radial-gradient(circle at center, rgba(88,112,255,0.45) 0%, rgba(39,38,67,0.45) 45%, rgba(61,36,47,0.20) 75%, transparent 100%)",
          animationDuration: "28s",
          animationDelay: "-6s",
        }}
      />

      {/* 4. Soft Drifting Mesh Blob 3 — Crimson Plum (Pricing / Testimonials) */}
      <div
        className="absolute top-[60%] left-[8%] w-[75vw] h-[75vw] max-w-[850px] max-h-[850px] rounded-full blur-[170px] opacity-60 pointer-events-none animate-orbFloat"
        style={{
          background: "radial-gradient(circle at center, rgba(255,193,171,0.48) 0%, rgba(214,76,82,0.38) 40%, rgba(61,36,47,0.25) 70%, transparent 100%)",
          animationDuration: "26s",
          animationDelay: "-12s",
        }}
      />

      {/* 5. Soft Drifting Mesh Blob 4 — Electric Indigo & Wine (FAQ / Footer) */}
      <div
        className="absolute top-[82%] -right-[8%] w-[75vw] h-[75vw] max-w-[850px] max-h-[850px] rounded-full blur-[160px] opacity-55 pointer-events-none animate-orbFloat"
        style={{
          background: "radial-gradient(circle at center, rgba(88,112,255,0.40) 0%, rgba(214,76,82,0.35) 40%, rgba(39,38,67,0.40) 70%, transparent 100%)",
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
          src="/images/webbheads-logo-transparent.png" 
          alt="" 
          className="w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(244,63,94,0.4)] opacity-70"
        />
      </div>

      {/* Ambient 3D Floating WebbHeads Logo Watermark — Center Page (Process & Portfolio) */}
      <div 
        className="absolute top-[52%] left-[4%] w-52 h-52 sm:w-72 sm:h-72 pointer-events-none animate-logoFloat3D"
        style={{ animationDuration: "22s", animationDelay: "-5s" }}
      >
        <img 
          src="/images/webbheads-logo-transparent.png" 
          alt="" 
          className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(99,102,241,0.35)] opacity-70"
        />
      </div>

      {/* Ambient 3D Floating WebbHeads Logo Watermark — Lower Middle Page (Pricing & Testimonials) */}
      <div 
        className="absolute top-[72%] right-[5%] w-48 h-48 sm:w-64 sm:h-64 pointer-events-none animate-logoFloat3D"
        style={{ animationDuration: "20s", animationDelay: "-10s" }}
      >
        <img 
          src="/images/webbheads-logo-transparent.png" 
          alt="" 
          className="w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(252,166,154,0.4)] opacity-70"
        />
      </div>

      {/* 7. Subtle Continuous Grid Overlay matched to Hero grid */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: [
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 96px)",
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 48px)"
          ].join(","),
        }}
      />
    </div>
  );
}
