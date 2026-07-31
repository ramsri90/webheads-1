"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Star } from "lucide-react";
import { Hero3DLogoScene } from "@/components/3d/hero-3d-logo-scene";
import { TwinklingStars } from "@/components/ui/twinkling-stars";

export function WebbheadsHeroAnimated() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative isolate min-h-screen pt-28 pb-16 overflow-hidden bg-transparent text-white flex flex-col justify-between">
      {/* Organic Twinkling Night Sky Starfield Background */}
      <TwinklingStars count={80} />

      {/* 3D WebGL Interactive Floating WebbHeads Logo & Orbiting Particles */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-85">
        <Hero3DLogoScene />
      </div>
      {/* ================== BACKGROUND GRADIENT ================== */}
      <div
        aria-hidden
        className="absolute inset-0 -z-30 pointer-events-none"
        style={{
          backgroundImage: [
            "radial-gradient(80% 55% at 50% 52%, rgba(252,166,154,0.45) 0%, rgba(214,76,82,0.46) 27%, rgba(61,36,47,0.38) 47%, rgba(39,38,67,0.45) 60%, rgba(8,8,12,0.6) 78%, rgba(0,0,0,0) 95%)",
            "radial-gradient(85% 60% at 14% 0%, rgba(255,193,171,0.65) 0%, rgba(233,109,99,0.58) 30%, rgba(48,24,28,0.0) 64%)",
            "radial-gradient(70% 50% at 86% 22%, rgba(88,112,255,0.40) 0%, rgba(16,18,28,0.0) 55%)",
            "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0) 50%)",
          ].join(","),
        }}
      />

      {/* Vignette corners */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-[radial-gradient(140%_120%_at_50%_0%,transparent_70%,rgba(0,0,0,0.3))]" />

      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 mix-blend-screen opacity-30"
        style={{
          backgroundImage: [
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.09) 0 1px, transparent 1px 96px)",
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 24px)",
            "repeating-radial-gradient(80% 55% at 50% 52%, rgba(255,255,255,0.08) 0 1px, transparent 1px 120px)"
          ].join(","),
          backgroundBlendMode: "screen",
        }}
      />

      {/* ================== HERO CONTENT ================== */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl place-items-center px-6 pt-12 pb-16 md:pt-24 lg:pt-28">
        <div className={`mx-auto text-center ${isMounted ? 'animate-fadeInUp' : 'opacity-0'}`}>
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-rose-300 ring-1 ring-white/20 backdrop-blur-md shadow-inner">
            <Sparkles className="h-4 w-4 text-rose-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Web Design • Apps • AI Automation • SEO</span>
          </div>

          {/* Headline - Dedicated Gradient (Purple & White Slide Slowly) */}
          <h1 style={{ animationDelay: '200ms' }} className={`mt-8 text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[58px] max-w-6xl leading-[1.15] text-animated-purple-white ${isMounted ? 'animate-fadeInUp' : 'opacity-0'}`}>
            Smart, Premium Digital Ecosystems<br className="hidden sm:inline" /> for Vizag Businesses
          </h1>

          {/* Subtitle */}
          <p style={{ animationDelay: '300ms' }} className={`mx-auto mt-8 max-w-3xl text-balance text-base text-white/80 sm:text-lg md:text-xl font-normal leading-relaxed ${isMounted ? 'animate-fadeInUp' : 'opacity-0'}`}>
            Tech plus content, executed as a system: we align your website, apps, and social content so everything works together to grow your business in Vizag.
          </p>

          {/* Action CTAs: Know More (PDF) & Explore Services */}
          <div style={{ animationDelay: '400ms' }} className={`mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row ${isMounted ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <a 
              href="/Webbheads_company_profile.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-xs font-bold text-black shadow-2xl transition-all duration-300 hover:bg-white/90 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Know More</span>
              <ArrowRight className="h-4 w-4 text-black" />
            </a>
            <a 
              href="#services" 
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-8 py-4 text-xs font-semibold text-white/90 transition-all duration-300 hover:border-cyan-500/50 hover:bg-white/10 hover:scale-[1.03]"
            >
              <span>Explore Services</span>
            </a>
          </div>

          {/* Key Value Highlights */}
          <div style={{ animationDelay: '500ms' }} className={`mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/70 ${isMounted ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#99F54E]" />
              <span>Proven 3-Step Process</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-rose-400" />
              <span>Full Ecosystem Strategy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              <span>Local Vizag Expertise</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================== CLIENT BRANDS ================== */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-white/40 mb-6 font-mono">
          Trusted By Vizag &amp; Global Organizations
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-xs font-mono uppercase tracking-wider text-white/70">
          {["Sri Chess Academy", "Aum Free Yoga", "Gitam Institution", "Thompson Luxury Homes", "TripSpark"].map((brand) => (
            <div 
              key={brand} 
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm hover:border-purple-500/40 hover:text-white transition-all cursor-default"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
