"use client";

import React, { useState } from "react";
import { Calculator, Check, ArrowRight, Sparkles, Send } from "lucide-react";

export function EstimateCalculator() {
  const [selectedServices, setSelectedServices] = useState<string[]>(["web"]);
  const [timeline, setTimeline] = useState<string>("standard");

  const serviceOptions = [
    { id: "web", label: "Custom Website Design", price: 25000, desc: "Next.js + Tailwind CSS + SEO" },
    { id: "ai", label: "AI Agent & Chatbot", price: 35000, desc: "Custom LLM & 24/7 Support Bot" },
    { id: "app", label: "Mobile App (iOS/Android)", price: 55000, desc: "Cross-Platform App + Backend" },
    { id: "seo", label: "SEO & Growth Package", price: 15000, desc: "Keyword Rank & Google Business" },
    { id: "portal", label: "Enterprise Admin Portal", price: 45000, desc: "Custom Dashboard & DB" }
  ];

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const basePrice = selectedServices.reduce((acc, id) => {
    const s = serviceOptions.find((opt) => opt.id === id);
    return acc + (s ? s.price : 0);
  }, 0);

  const multiplier = timeline === "express" ? 1.25 : 1.0;
  const totalPrice = Math.round(basePrice * multiplier);

  return (
    <section id="calculator" className="relative z-10 bg-black/95 py-24 px-6 md:px-8 border-t border-white/10">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-rose-400 ring-1 ring-white/10 backdrop-blur-md">
            <Calculator className="h-3.5 w-3.5" /> Instant Estimate Tool
          </span>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl text-white">
            Estimate Your Project Cost in Seconds
          </h2>
          <p className="mt-4 text-base text-white/70">
            Select your desired features and timeline to get an instant estimated quote from WebbHeads.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Options Selection */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">1. Select Services Required</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {serviceOptions.map((opt) => {
                const isSelected = selectedServices.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => toggleService(opt.id)}
                    className={`flex flex-col justify-between p-5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? "bg-gradient-to-br from-cyan-500/20 to-purple-500/10 border-cyan-500/60 text-white shadow-lg shadow-cyan-500/10"
                        : "bg-white/5 border-white/10 text-white/70 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="font-semibold text-sm text-white">{opt.label}</span>
                      <div className={`h-5 w-5 rounded-full flex items-center justify-center border ${isSelected ? "bg-cyan-500 border-cyan-400 text-white" : "border-white/20"}`}>
                        {isSelected && <Check className="h-3 w-3" />}
                      </div>
                    </div>
                    <p className="text-xs text-white/50 mb-3">{opt.desc}</p>
                    <span className="text-xs font-mono font-bold text-cyan-400">Starts at ₹{opt.price.toLocaleString()}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-6">
              <h3 className="text-lg font-bold text-white mb-4">2. Select Project Speed</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setTimeline("standard")}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    timeline === "standard"
                      ? "bg-cyan-500/20 border-cyan-500 text-white font-semibold"
                      : "bg-white/5 border-white/10 text-white/60"
                  }`}
                >
                  <div className="text-sm">Standard (2 - 4 Weeks)</div>
                  <div className="text-[10px] text-white/50">Regular Pace</div>
                </button>
                <button
                  onClick={() => setTimeline("express")}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    timeline === "express"
                      ? "bg-cyan-500/20 border-cyan-500 text-white font-semibold"
                      : "bg-white/5 border-white/10 text-white/60"
                  }`}
                >
                  <div className="text-sm">Express Rush (10 Days)</div>
                  <div className="text-[10px] text-cyan-400">Priority Sprint (+25%)</div>
                </button>
              </div>
            </div>
          </div>

          {/* Result Card & Form */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl p-8 synapse-glass space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-white/50 font-mono">Estimated Investment</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white">₹{totalPrice.toLocaleString()}</span>
                  <span className="text-xs text-white/60">approx. (~${Math.round(totalPrice / 85)} USD)</span>
                </div>
                <p className="mt-2 text-xs text-white/60">Includes full source code, deployment, and 30 days of complimentary support.</p>
              </div>

              <div className="border-t border-white/10 pt-6 space-y-4">
                <h4 className="text-sm font-semibold text-white">Lock In Your Quote &amp; Consult Our Lead Engineers</h4>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Thank you! Your quote request has been sent to WebbHeads team. We will call you back within 2 hours.");
                  }} 
                  className="space-y-3"
                >
                  <input
                    type="text"
                    required
                    placeholder="Your Name / Business Name"
                    className="w-full rounded-xl bg-black/60 border border-white/15 px-4 py-3 text-xs text-white placeholder-white/40 focus:border-rose-400 focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Work Email Address"
                    className="w-full rounded-xl bg-black/60 border border-white/15 px-4 py-3 text-xs text-white placeholder-white/40 focus:border-rose-400 focus:outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp Number (+91...)"
                    className="w-full rounded-xl bg-black/60 border border-white/15 px-4 py-3 text-xs text-white placeholder-white/40 focus:border-rose-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 py-3.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 hover:scale-[1.02] transition-all"
                  >
                    <span>Request Callback &amp; Detailed Proposal</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
