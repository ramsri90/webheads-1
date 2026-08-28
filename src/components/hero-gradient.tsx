"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Star } from "lucide-react";
import { Hero3DLogoScene } from "@/components/3d/hero-3d-logo-scene";
import { TwinklingStars } from "@/components/ui/twinkling-stars";

export function WebbheadsHeroAnimated() {
  const [isMounted, setIsMounted] = useState(false);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Direct DOM manipulation on mouse move — eliminates React state re-render loop
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!spotlightRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    spotlightRef.current.style.background = `radial-gradient(500px circle at ${x.toFixed(1)}% ${y.toFixed(1)}%, rgba(13, 148, 136, 0.12), rgba(34, 211, 238, 0.08) 50%, transparent 80%)`;
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative isolate min-h-screen pt-28 pb-16 overflow-hidden bg-transparent text-teal-950 flex flex-col justify-between"
    >
      {/* Organic Twinkling Teal Starfield Background */}
      <TwinklingStars count={35} />

      {/* Dynamic Interactive Mouse Spotlight Ambient Glow (DOM updated directly) */}
      <div 
        ref={spotlightRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-25 transition-opacity duration-300 opacity-60"
        style={{
          background: "radial-gradient(500px circle at 50% 50%, rgba(13, 148, 136, 0.12), rgba(34, 211, 238, 0.08) 50%, transparent 80%)",
        }}
      />

      {/* 3D WebGL Interactive Floating WebbHeads Logo & Orbiting Particles */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-85">
        <Hero3DLogoScene />
      </div>

      {/* Background Gradient */}
      <div
        aria-hidden
        className="absolute inset-0 -z-30 pointer-events-none"
        style={{
          backgroundImage: [
            "radial-gradient(80% 55% at 50% 52%, rgba(255,255,255,0.9) 0%, rgba(240,253,250,0.85) 27%, rgba(204,251,241,0.6) 47%, rgba(204,251,241,0.4) 60%, rgba(255,255,255,0.3) 78%, rgba(255,255,255,0) 95%)",
            "radial-gradient(85% 60% at 14% 0%, rgba(45,212,191,0.18) 0%, rgba(20,184,166,0.12) 30%, rgba(255,255,255,0) 64%)",
            "radial-gradient(70% 50% at 86% 22%, rgba(34,211,238,0.16) 0%, rgba(255,255,255,0) 55%)",
            "linear-gradient(to bottom, rgba(13,148,136,0.05), rgba(255,255,255,0) 50%)",
          ].join(","),
        }}
      />

      {/* Vignette corners */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-[radial-gradient(140%_120%_at_50%_0%,transparent_75%,rgba(13,148,136,0.05))]" />

      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 mix-blend-multiply opacity-25"
        style={{
          backgroundImage: [
            "repeating-linear-gradient(90deg, rgba(13,148,136,0.10) 0 1px, transparent 1px 96px)",
            "repeating-linear-gradient(90deg, rgba(13,148,136,0.05) 0 1px, transparent 1px 24px)",
            "repeating-radial-gradient(80% 55% at 50% 52%, rgba(13,148,136,0.06) 0 1px, transparent 1px 120px)"
          ].join(","),
          backgroundBlendMode: "multiply",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl place-items-center px-6 pt-12 pb-16 md:pt-24 lg:pt-28">
        <div className={`mx-auto text-center ${isMounted ? 'animate-fadeInUp' : 'opacity-0'}`}>
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full bg-teal-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-teal-600 ring-1 ring-teal-500/30 backdrop-blur-md shadow-inner">
            <div className="relative flex items-center justify-center">
              <img 
                src="/images/webbheads-logo-black.png" 
                alt="WebbHeads Logo" 
                className="h-5 w-auto object-contain transition-transform duration-500 hover:scale-125 drop-shadow-[0_0_8px_rgba(13,148,136,0.5)]" 
              />
            </div>
            <span>Web Design • Apps • AI Automation • SEO</span>
          </div>

          {/* Headline */}
          <h1 style={{ animationDelay: '200ms' }} className={`mt-8 text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[58px] max-w-6xl leading-[1.15] text-animated-purple-white ${isMounted ? 'animate-fadeInUp' : 'opacity-0'}`}>
            Premium Digital Ecosystems<br className="hidden sm:inline" /> for Vizag Businesses
          </h1>

          {/* Subtitle */}
          <p style={{ animationDelay: '300ms' }} className={`mx-auto mt-8 max-w-3xl text-balance text-base text-teal-950/90 sm:text-lg md:text-xl font-medium leading-relaxed ${isMounted ? 'animate-fadeInUp' : 'opacity-0'}`}>
            Tech plus content, executed as a system: we align your website, apps, and social content so everything works together to grow your business in Vizag.
          </p>



          {/* Action CTAs */}
          <div style={{ animationDelay: '400ms' }} className={`mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row ${isMounted ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <a 
              href="/Webbheads_company_profile.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-teal-600 px-8 py-3.5 text-xs font-bold text-white shadow-xl shadow-teal-600/25 transition-all duration-300 hover:bg-teal-500 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Know More</span>
              <ArrowRight className="h-4 w-4 text-white" />
            </a>
            <a 
              href="#services" 
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-teal-500/40 bg-teal-500/5 backdrop-blur-md px-8 py-4 text-xs font-semibold text-teal-950 transition-all duration-300 hover:border-teal-500 hover:bg-teal-500/10 hover:scale-[1.03]"
            >
              <span>Explore Services</span>
            </a>
          </div>

          {/* Key Value Highlights */}
          <div style={{ animationDelay: '500ms' }} className={`mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-teal-950/70 ${isMounted ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-teal-600" />
              <span>Proven 3-Step Process</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-teal-600" />
              <span>Full Ecosystem Strategy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              <span>Local Vizag Expertise</span>
            </div>
          </div>
        </div>
      </div>

      {/* Client Brands */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-teal-950/50 mb-6 font-mono">
          Trusted By Vizag &amp; Global Organizations
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-xs font-mono uppercase tracking-wider text-teal-950/70">
          {["Sri Chess Academy", "Aum Free Yoga", "Thompson Luxury Homes", "TripSpark"].map((brand) => (
            <div 
              key={brand} 
              className="rounded-full border border-teal-500/20 bg-white/70 px-4 py-2 backdrop-blur-sm hover:border-teal-500/50 hover:text-teal-600 hover:bg-teal-500/5 transition-all cursor-default"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
