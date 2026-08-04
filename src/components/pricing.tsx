"use client";

import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { useMultiScrollReveal } from "@/hooks/use-scroll-reveal";

const plans = [
  {
    name: "Tech Services",
    price: "₹18,000",
    note: "One-time build. Domain & hosting billed separately.",
    description: "A professional digital presence that works for you around the clock.",
    popular: false,
    features: [
      "Landing Page / Static Website",
      "Mobile-friendly & SEO-ready",
      "AI Chatbot & Automation Setup",
      "CRM & Dashboard Integration",
      "Post-launch support included"
    ]
  },
  {
    name: "Content & Marketing",
    price: "₹26,400",
    note: "12 premium reels at ₹2,200 per reel.",
    description: "Stay consistently visible and turn your audience into actual customers.",
    popular: true,
    features: [
      "12 high-quality reels per month",
      "Content calendar & strategy",
      "Brand voice & visual consistency",
      "Platform management (IG / FB)",
      "Monthly performance report"
    ]
  },
  {
    name: "Your Ecosystem",
    price: "Custom",
    note: "Scoped to your business goals.",
    description: "Tech and content as one connected system - built and managed end to end.",
    popular: false,
    features: [
      "Full website or app development",
      "Automation & CRM setup",
      "Monthly content & reels",
      "Digital marketing & ads",
      "Dedicated WebbHeads team"
    ]
  }
];

export function PricingSection() {
  const sectionRef = useMultiScrollReveal();

  return (
    <section id="pricing" className="relative z-10 bg-transparent py-20 md:py-28 px-4 sm:px-6 md:px-8 overflow-hidden" style={{ perspective: "1200px" }}>
      {/* 3D Floating Glow Orbs */}
      <div className="absolute top-1/4 left-[10%] -z-10 h-72 w-72 rounded-full bg-teal-500/10 blur-[120px] pointer-events-none animate-orbFloat" />
      <div className="absolute bottom-1/4 right-[10%] -z-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none animate-orbFloat" style={{ animationDelay: "5s" }} />

      <div ref={sectionRef} className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20 scroll-reveal">
          <p className="text-teal-600 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">Pricing</p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-animated-white-neongreen leading-tight">
            Plans that scale with you
          </h2>
          <p className="mt-4 text-teal-950/70 text-sm sm:text-base">
            Flexible pricing designed to deliver real value - no hidden costs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, idx) => {
            return (
              <div
                key={idx}
                className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-b from-teal-500/10 via-teal-500/[0.02] to-transparent border border-teal-500/60 shadow-2xl shadow-teal-500/10 hover:border-teal-500"
                    : "synapse-glass"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-teal-600 px-4 py-1 text-[12px] font-bold text-white uppercase tracking-wider shadow-lg">
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-teal-950 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-teal-950">{plan.price}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-teal-950/80 mb-4 font-semibold leading-normal">{plan.note}</p>
                  <p className="text-xs sm:text-sm text-teal-950/70 leading-relaxed mb-6 font-normal">{plan.description}</p>

                  <div className="space-y-3 border-t border-teal-500/15 pt-6">
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-teal-950 font-medium">
                        <Check className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="https://cal.com/webb-heads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-xs sm:text-sm font-bold transition-all ${
                    plan.popular
                      ? "bg-teal-600 text-white hover:bg-teal-500 shadow-lg shadow-teal-500/25"
                      : "bg-teal-500/10 text-teal-950 hover:bg-teal-500/20"
                  }`}
                >
                  <span>Book a Call</span> <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
