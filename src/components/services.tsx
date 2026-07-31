"use client";

import React from "react";
import { Code2, Smartphone, Bot, Share2, Megaphone, Palette } from "lucide-react";
import { useMultiScrollReveal } from "@/hooks/use-scroll-reveal";
import { Card3DTilt } from "@/components/ui/card-3d-tilt";

const services = [
  {
    icon: Code2,
    title: "Website Design & Development",
    description: "When a customer searches for you in Vizag, what they find actually converts them.",
  },
  {
    icon: Smartphone,
    title: "App Development",
    description: "A mobile app your buyers actually want to use. Browse properties, book viewings, and close deals - all from their phone.",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    description: "We automate your enquiries, follow-ups, and customer communication so your business stays responsive 24/7 without extra manpower.",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description: "Consistent, on-brand content across Instagram, Facebook, and more - keeping your business visible and top-of-mind in Vizag.",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing & Ads",
    description: "Targeted Google and Meta ad campaigns putting your business in front of the right people in Vizag at exactly the right moment.",
  },
  {
    icon: Palette,
    title: "Content Strategy & Branding",
    description: "A clear brand voice, content plan, and visual identity that makes your business look premium and trustworthy.",
  }
];

export function ServicesSection() {
  const sectionRef = useMultiScrollReveal();

  return (
    <section id="services" className="relative z-10 bg-transparent py-20 md:py-28 px-4 sm:px-6 md:px-8 overflow-hidden" style={{ perspective: "1200px" }}>
      {/* 3D Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-[5%] -z-10 h-72 w-72 rounded-full bg-rose-500/10 blur-[120px] pointer-events-none animate-orbFloat" />
      <div className="absolute bottom-1/4 right-[5%] -z-10 h-80 w-80 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none animate-orbFloat" style={{ animationDelay: "6s" }} />

      <div ref={sectionRef} className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-2xl mb-14 md:mb-20 scroll-reveal">
          <p className="text-[#99F54E] text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">What We Do</p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-animated-white-neongreen leading-tight">
            Everything your business needs to grow online
          </h2>
          <p className="mt-4 text-white/85 text-sm sm:text-base leading-relaxed">
            We don&apos;t just build websites. We build the system around it - apps, automation, content, ads - so it all works together.
          </p>
        </div>

        {/* 3D Animated Grid with Rounded Boxes Around Each Item */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Card3DTilt
                key={idx}
                className="scroll-reveal-scale group relative flex flex-col justify-between rounded-2xl p-6 sm:p-7 synapse-glass"
                style={{ transitionDelay: `${idx * 90}ms` }}
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    {/* Squircle Rounded Icon Container */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shrink-0 group-hover:border-cyan-400/50 group-hover:bg-cyan-500/10 group-hover:scale-105 transition-all duration-300 shadow-md">
                      <Icon className="h-6 w-6 text-white group-hover:text-cyan-400 transition-colors duration-300" strokeWidth={1.8} />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 leading-snug">
                      {s.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-medium">
                    {s.description}
                  </p>
                </div>
              </Card3DTilt>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 scroll-reveal" style={{ transitionDelay: "450ms" }}>
          <a
            href="https://cal.com/webb-heads"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-rose-400 hover:text-rose-300 transition-colors"
          >
            <span>Talk to us about your project</span> &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
