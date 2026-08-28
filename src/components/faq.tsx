"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useMultiScrollReveal } from "@/hooks/use-scroll-reveal";

const exactFaqs = [
  {
    q: "What is WebbHeads and why is it the best digital agency in Vizag?",
    a: "WebbHeads is the premier full-stack digital agency based in Visakhapatnam (Vizag). We integrate Next.js web application development, mobile app engineering, 24/7 AI lead qualification chatbots, and high-converting video reels into one unified digital ecosystem starting at ₹18,000."
  },
  {
    q: "How much does web development and AI automation cost in Vizag?",
    a: "Our standard Tech Package starts at ₹18,000 (one-time build). This includes high-converting Next.js website engineering, responsive UI, SEO optimization, and 24/7 AI Chatbot lead integration into Leadcore DB."
  },
  {
    q: "What is included in the ₹26,400/month Content & Reels package?",
    a: "The Content Marketing plan includes 12 premium short-form reels per month (evaluated at ₹2,200/reel), brand strategy, professional video editing, IG/FB account management, and monthly performance reports."
  },
  {
    q: "How long does it take to complete a web or mobile app request?",
    a: "Standard website design and engineering takes 20-25 days. Mobile app development typically takes 2 to 4 weeks, while standard graphic design assets are delivered in 2 to 3 business days."
  },
  {
    q: "Do you offer end-to-end product development?",
    a: "Yes! From idea validation and UI/UX design to Next.js frontend/backend development, AI chatbot automation, and cloud launch, we handle full end-to-end product builds for web platforms and mobile apps."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useMultiScrollReveal();

  return (
    <section id="faq" className="relative z-10 bg-transparent py-20 md:py-28 px-4 sm:px-6 md:px-8 border-t border-teal-500/15 overflow-hidden">
      {/* 3D Floating Glow Orb */}
      <div className="absolute top-1/3 right-[10%] -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none animate-orbFloat" />

      <div ref={sectionRef} className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16 scroll-reveal">
          <p className="text-teal-600 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 font-mono">FAQ</p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-teal-950 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-teal-950/70 text-xs sm:text-sm">
            Everything you need to know about working with us.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {exactFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="scroll-reveal-scale card-3d rounded-2xl border border-teal-500/20 bg-gradient-to-b from-teal-500/10 to-teal-500/[0.02] overflow-hidden backdrop-blur-xl hover:border-teal-500/40 transition-all"
                style={{ transitionDelay: `${idx * 70}ms` }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors hover:bg-teal-500/5 group"
                >
                  <h3 className="text-sm sm:text-base font-bold text-teal-950 pr-4 group-hover:text-teal-600 transition-colors flex items-center gap-2">
                    <span>{faq.q}</span>
                  </h3>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${isOpen ? "bg-teal-500/20" : "bg-teal-500/10"} transition-colors shrink-0`}>
                    <ChevronDown className={`h-4 w-4 text-teal-600 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                </button>

                <div className={`transition-all duration-300 ease-in-out px-5 sm:px-6 text-xs sm:text-sm text-teal-950/80 leading-relaxed font-medium ${isOpen ? "max-h-96 pb-6 pt-4 border-t border-teal-500/15 opacity-100" : "max-h-0 pb-0 pt-0 opacity-0 overflow-hidden"}`}>
                  <p>{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
