"use client";

import React from "react";
import { Compass, Cpu, Rocket } from "lucide-react";
import { useMultiScrollReveal } from "@/hooks/use-scroll-reveal";

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
      <div className="absolute top-1/4 right-[5%] -z-10 h-72 w-72 rounded-full bg-teal-500/10 blur-[120px] pointer-events-none animate-orbFloat" />
      <div className="absolute bottom-1/4 left-[5%] -z-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none animate-orbFloat" style={{ animationDelay: "7s" }} />

      <div ref={sectionRef} className="mx-auto max-w-7xl">
        <div className="max-w-2xl mb-14 md:mb-20 scroll-reveal">
          <p className="text-teal-600 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">How It Works</p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-animated-white-neongreen leading-tight">
            Three steps. Zero guesswork.
          </h2>
          <p className="mt-4 text-teal-950/75 text-sm sm:text-base leading-relaxed">
            A proven process from strategy to launch - designed to get results without wasting your time.
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const revealClass = idx % 2 === 0 ? "scroll-reveal-left" : "scroll-reveal-right";

            return (
              <div
                key={idx}
                className={`${revealClass} group relative flex flex-col md:flex-row md:items-center gap-6 rounded-2xl border border-teal-500/20 bg-gradient-to-b from-teal-500/10 to-teal-500/[0.02] p-6 sm:p-8 backdrop-blur-xl hover:border-teal-500/50 hover:bg-teal-500/5 transition-colors duration-300`}
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                <div className="flex items-center gap-4 md:w-56 shrink-0">
                  <span className="text-4xl font-extrabold text-teal-500/30 font-mono group-hover:text-teal-500/50 transition-colors">
                    {step.number}
                  </span>
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-500/25 bg-teal-500/10 shrink-0 group-hover:bg-teal-500/20 group-hover:border-teal-500/50 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-teal-500/10 overflow-hidden">
                    {/* Glowing background aura */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/25 to-cyan-500/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {idx === 0 && (
                      <Compass 
                        className="h-6 w-6 text-teal-600 group-hover:text-teal-500 transition-colors animate-spin" 
                        style={{ animationDuration: "12s" }}
                        strokeWidth={1.8} 
                      />
                    )}

                    {idx === 1 && (
                      <Cpu 
                        className="h-6 w-6 text-teal-600 group-hover:text-cyan-600 transition-colors animate-pulse" 
                        style={{ animationDuration: "2s" }}
                        strokeWidth={1.8} 
                      />
                    )}

                    {idx === 2 && (
                      <Rocket 
                        className="h-6 w-6 text-teal-600 group-hover:text-teal-400 transition-colors group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" 
                        strokeWidth={1.8} 
                      />
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-teal-950 mb-2 group-hover:text-teal-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-teal-950/70 leading-relaxed mb-4 font-medium">
                    {step.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {step.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-xs text-teal-700 bg-teal-500/5 border border-teal-500/20 px-3 py-1 rounded-full font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
