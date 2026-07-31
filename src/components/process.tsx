"use client";

import React from "react";
import { Compass, Cpu, Rocket } from "lucide-react";
import { useMultiScrollReveal } from "@/hooks/use-scroll-reveal";
import { Card3DTilt } from "@/components/ui/card-3d-tilt";

const steps = [
  {
    number: "01",
    title: "Discover & Design",
    description: "We dive deep into your goals, audience and market to uncover opportunities and craft the right strategy.",
    tags: ["Market Research", "User Insights", "Strategy", "Roadmap"],
    icon: Compass,
  },
  {
    number: "02",
    title: "Build & Create",
    description: "We design, develop and refine every detail to build a high-performance, scalable solution.",
    tags: ["Design", "Development", "Testing", "AI Integration"],
    icon: Cpu,
  },
  {
    number: "03",
    title: "Launch & Grow",
    description: "We launch with precision and optimize for growth, ensuring long-term success and measurable results.",
    tags: ["Deployment", "Optimization", "Support", "Growth"],
    icon: Rocket,
  }
];

export function ProcessSection() {
  const sectionRef = useMultiScrollReveal();

  return (
    <section id="process" className="relative z-10 bg-transparent py-20 md:py-28 px-4 sm:px-6 md:px-8 overflow-hidden" style={{ perspective: "1200px" }}>
      {/* 3D Floating Glow Orbs */}
      <div className="absolute top-1/4 right-[5%] -z-10 h-72 w-72 rounded-full bg-rose-500/10 blur-[120px] pointer-events-none animate-orbFloat" />
      <div className="absolute bottom-1/4 left-[5%] -z-10 h-80 w-80 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none animate-orbFloat" style={{ animationDelay: "7s" }} />

      <div ref={sectionRef} className="mx-auto max-w-7xl">
        <div className="max-w-2xl mb-14 md:mb-20 scroll-reveal">
          <p className="text-[#99F54E] text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">How It Works</p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-animated-white-neongreen leading-tight">
            Three steps. Zero guesswork.
          </h2>
          <p className="mt-4 text-white/85 text-sm sm:text-base leading-relaxed">
            A proven process from strategy to launch — designed to get results without wasting your time.
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const revealClass = idx % 2 === 0 ? "scroll-reveal-left" : "scroll-reveal-right";

            return (
              <Card3DTilt
                key={idx}
                className={`${revealClass} group relative flex flex-col md:flex-row md:items-center gap-6 rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 sm:p-8 backdrop-blur-xl hover:border-purple-500/40 hover:bg-white/[0.06]`}
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                <div className="flex items-center gap-4 md:w-56 shrink-0">
                  <span className="text-4xl font-extrabold text-white/20 font-mono group-hover:text-purple-400/40 transition-colors">
                    {step.number}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-purple-500/10 shrink-0 group-hover:bg-purple-500/20 group-hover:scale-105 transition-all duration-300 shadow-md">
                    <Icon className="h-6 w-6 text-purple-400" strokeWidth={1.8} />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/85 leading-relaxed mb-4 font-medium">
                    {step.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {step.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-xs text-white/70 bg-white/10 border border-white/10 px-3 py-1 rounded-full font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card3DTilt>
            );
          })}
        </div>
      </div>
    </section>
  );
}
