"use client";

import React from "react";
import { Star, Trophy, Zap, Award, Users } from "lucide-react";
import { useMultiScrollReveal } from "@/hooks/use-scroll-reveal";

const stats = [
  { label: "Projects", value: "50+", icon: Trophy },
  { label: "Avg ROI", value: "10x", icon: Zap },
  { label: "PageSpeed", value: "99.9%", icon: Award },
  { label: "Retention", value: "98%", icon: Users }
];

const testimonials = [
  {
    name: "Srikanth",
    role: "Founder — Sri Chess Academy",
    content: "Best decision we made for our business! Their website and app designs are top-notch, and the AI automation feels like magic.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Chilaka Venkata Ramesh",
    role: "Founder — Aum Free Yoga",
    content: "They built our website exactly how we imagined — clean, modern, and super user-friendly. The AI automation made our workflow so much easier.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Gitam Institution",
    role: "Educational Institution",
    content: "Super impressed with their work! The UI/UX is smooth, and the app performs perfectly. Their solutions really boosted our productivity.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  }
];

export function TestimonialsAndStats() {
  const sectionRef = useMultiScrollReveal();

  return (
    <section id="testimonials" className="relative z-10 bg-transparent py-20 md:py-28 px-4 sm:px-6 md:px-8 overflow-hidden" style={{ perspective: "1200px" }}>
      {/* 3D Floating Glow Orbs */}
      <div className="absolute top-1/3 left-[5%] -z-10 h-72 w-72 rounded-full bg-rose-500/10 blur-[120px] pointer-events-none animate-orbFloat" />
      <div className="absolute bottom-1/4 right-[5%] -z-10 h-80 w-80 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none animate-orbFloat" style={{ animationDelay: "6s" }} />

      <div ref={sectionRef} className="mx-auto max-w-7xl space-y-16 sm:space-y-24">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="scroll-reveal-scale card-3d flex flex-col items-center justify-center p-6 rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl text-center hover:border-white/25"
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 mb-3 border border-white/10">
                  <Icon className="h-5 w-5 text-purple-400" strokeWidth={1.8} />
                </div>
                <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-mono">{s.value}</span>
                <span className="text-xs text-white/50 mt-1 font-mono">{s.label}</span>
              </div>
            );
          })}
        </div>

        {/* Testimonials Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 scroll-reveal">
            <p className="text-[#99F54E] text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">Testimonials</p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-animated-white-neongreen leading-tight">
              What our clients say
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="scroll-reveal-scale card-3d group flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl hover:border-purple-500/40"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed italic font-medium">
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10">
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="text-xs text-white/75 font-mono">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Card */}
        <div id="team" className="scroll-reveal-scale card-3d rounded-3xl border border-white/15 bg-gradient-to-r from-purple-500/10 via-white/[0.03] to-indigo-500/10 p-8 sm:p-10 md:p-12 backdrop-blur-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <p className="text-xs text-purple-400 font-mono uppercase tracking-widest mb-2 font-semibold">Our Team</p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
                Meet the mind behind it all
              </h3>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed max-w-xl font-medium">
                Driven by a passion for high-performance web engineering, mobile apps, and AI automation — building solutions that actually work for your business.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col items-center md:items-end text-center md:text-right">
              <img
                src="/images/kushal-founder.jpg"
                alt="DJ Kushal"
                className="h-28 w-28 rounded-2xl object-cover border-2 border-white/20 shadow-2xl mb-3"
              />
              <h4 className="text-lg font-bold text-white">DJ Kushal</h4>
              <p className="text-xs text-purple-400 font-mono font-semibold">Founder & CEO</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
