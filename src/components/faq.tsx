"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useMultiScrollReveal } from "@/hooks/use-scroll-reveal";

const exactFaqs = [
  {
    q: "How long does it take to complete a request?",
    a: "Turnaround time depends on the complexity of the request. Standard designs take 2–3 days, while more detailed projects may require additional time depending on the scope of the project."
  },
  {
    q: "What if I need more revisions?",
    a: "We're here to make sure you love the final result. Depending on your plan, we offer a set number of revisions — but if you need more, we can always add extra rounds at a minimal cost."
  },
  {
    q: "How do we communicate throughout the project?",
    a: "We use your preferred communication channel — email, Slack, Notion, or video calls and Google Meets — to keep everything transparent. You'll also get regular progress updates so there are no surprises."
  },
  {
    q: "Do you offer end-to-end product development?",
    a: "Absolutely. From idea validation and UI/UX design to frontend/backend development and launch, we handle full product builds — whether it's a web platform or mobile app."
  },
  {
    q: "How can you assure a proper workflow?",
    a: "By keeping it clear, organized, and transparent. We set timelines, share updates, and review every stage to ensure everything runs smoothly and meets your expectations."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useMultiScrollReveal();

  return (
    <section id="faq" className="relative z-10 bg-transparent py-20 md:py-28 px-4 sm:px-6 md:px-8 border-t border-teal-500/15 overflow-hidden" style={{ perspective: "1200px" }}>
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
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors hover:bg-teal-500/5 group"
                >
                  <span className="text-sm sm:text-base font-bold text-teal-950 pr-4 group-hover:text-teal-600 transition-colors">{faq.q}</span>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${isOpen ? "bg-teal-500/20" : "bg-teal-500/10"} transition-colors shrink-0`}>
                    <ChevronDown className={`h-4 w-4 text-teal-600 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-teal-950/80 leading-relaxed border-t border-teal-500/15 pt-4 font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
