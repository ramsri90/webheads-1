"use client";

import React from "react";
import { TrendingUp, Clock, Zap, UserCheck, ShieldCheck, Eye } from "lucide-react";
import { useMultiScrollReveal } from "@/hooks/use-scroll-reveal";
import { Card3DTilt } from "@/components/ui/card-3d-tilt";

const benefits = [
  {
    icon: Eye,
    title: "Content That Builds Visibility",
    description: "Stay visible with strategic content that keeps your business in front of the right audience consistently.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Growth",
    description: "Expand your operations with systems designed to grow alongside your business without complexity.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Your business never sleeps. Capture every opportunity and customer interaction around the clock.",
  },
  {
    icon: Zap,
    title: "Time Saving Automation",
    description: "Automate routine processes and reduce manual effort so you can focus on what matters.",
  },
  {
    icon: UserCheck,
    title: "Enhanced Customer Experience",
    description: "Deliver faster, personalized interactions that improve satisfaction and build lasting relationships.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable & Secure",
    description: "Operate with confidence using secure systems designed to protect your data and ensure reliability.",
  }
];

export function Benefits3DSection() {
  const sectionRef = useMultiScrollReveal();

  return (
    <section id="benefits" className="relative z-10 bg-transparent py-20 md:py-28 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* 3D Soft Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 -z-10 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      <div ref={sectionRef} className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20 scroll-reveal">
          <p className="text-teal-600 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">Why WebbHeads</p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-animated-white-neongreen leading-tight">
            The difference you&apos;ll actually feel
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card3DTilt
                key={idx}
                className="scroll-reveal-scale group relative rounded-2xl p-6 sm:p-7 synapse-glass"
                style={{ transitionDelay: `${idx * 90}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-teal-500/20 bg-teal-500/5 shrink-0 group-hover:border-teal-500/50 group-hover:bg-teal-500/10 group-hover:scale-105 transition-all duration-300 shadow-md">
                    <Icon className="h-6 w-6 text-teal-600" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-teal-950 group-hover:text-teal-600 transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-teal-950/70 leading-relaxed font-medium">
                  {item.description}
                </p>
              </Card3DTilt>
            );
          })}
        </div>
      </div>
    </section>
  );
}
