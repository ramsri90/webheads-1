"use client";

import React, { useState } from "react";
import { Bot, MessageSquare, Zap, Mic, BarChart3, CheckCircle2, Sparkles, ArrowUpRight } from "lucide-react";

const aiCapabilities = [
  {
    id: "chatbots",
    icon: MessageSquare,
    title: "24/7 AI Customer Support Chatbot",
    badge: "Instant Support",
    headline: "Automate Customer Service & Lead Capture",
    description: "Deploy intelligent custom-trained AI chatbots that talk to your customers, capture qualified leads, schedule appointments, and answer questions 24/7.",
    stats: ["95% Instant Resolution", "< 1s Response Time", "Multi-Language Support"],
    examplePrompt: "Customer: 'Hi! Can you give me a price quote for a React website and setup an appointment?'",
    exampleResponse: "AI Agent: 'Hello! I can help you with that right now. Based on your project scope, our package starts at ₹25,000 ($350). Would tomorrow at 3 PM work for a quick strategy call?'"
  },
  {
    id: "workflows",
    icon: Zap,
    title: "Autonomous AI Workflows",
    badge: "Process Automation",
    headline: "Eliminate Manual Repetitive Tasks",
    description: "Connect your web app, CRM, email marketing, and databases with automated AI decision engines that extract data, parse documents, and trigger actions automatically.",
    stats: ["10x Operational Speed", "0% Human Data Error", "Seamless API Connectors"],
    examplePrompt: "Workflow Trigger: 'New customer inquiry received via contact form'",
    exampleResponse: "AI Pipeline: 'Analyzed inquiry topic → Enriched company data → Created lead in CRM → Generated custom quote PDF → Emailed client within 5 seconds.'"
  },
  {
    id: "voice",
    icon: Mic,
    title: "AI Voice Telephony Agents",
    badge: "Voice Intelligence",
    headline: "Human-Like Voice Call Automation",
    description: "Handle incoming phone calls, perform customer survey calls, and automate appointment confirmations with ultra-realistic AI voice callers.",
    stats: ["Natural Voice Nuance", "Real-Time Telephony API", "Call Recording & Summary"],
    examplePrompt: "System Call: 'Calling client for tomorrow's project kickoff confirmation'",
    exampleResponse: "Voice AI: 'Hi Rahul! This is Maya from WebbHeads following up on tomorrow's kickoff call at 10 AM. Will you be joining via Google Meet?'"
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Predictive Business Analytics",
    badge: "Data Insights",
    headline: "Turn Raw Data into Actionable Growth Strategy",
    description: "Harness AI data models to forecast customer demand, analyze user website behavior, and optimize marketing spend for maximum ROI.",
    stats: ["Predictive Sales Insights", "Automated Weekly Reports", "Real-Time Dashboards"],
    examplePrompt: "Analytics Query: 'Show me top conversion bottlenecks on our website'",
    exampleResponse: "AI Analyst: 'Mobile checkout drop-off rate is 14% higher on step 2 due to form friction. Recommended fix: Enable 1-click Google Pay.'"
  }
];

export function AISolutionsSection() {
  const [activeTab, setActiveTab] = useState(aiCapabilities[0].id);

  const selected = aiCapabilities.find((c) => c.id === activeTab) || aiCapabilities[0];

  return (
    <section id="ai-solutions" className="relative z-10 bg-black/90 py-24 px-6 md:px-8 border-t border-white/10">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-rose-400 ring-1 ring-rose-500/30">
              <Bot className="h-4 w-4" /> Next-Gen AI Capabilities
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl text-white max-w-2xl">
              Supercharge Your Operations With WebbHeads AI Solutions
            </h2>
          </div>
          <p className="text-sm text-white/70 max-w-md">
            We build custom AI agents tailored directly to your business workflows, reducing support costs by up to 70%.
          </p>
        </div>

        {/* Tab Selection Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {aiCapabilities.map((cap) => {
            const Icon = cap.icon;
            const isActive = cap.id === activeTab;
            return (
              <button
                key={cap.id}
                onClick={() => setActiveTab(cap.id)}
                className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-rose-500/20 to-indigo-500/20 border-rose-500/50 shadow-lg shadow-rose-500/10 text-white"
                    : "bg-white/5 border-white/10 text-white/60 hover:border-white/20 hover:text-white"
                }`}
              >
                <div className={`p-2.5 rounded-xl ${isActive ? "bg-rose-500 text-white" : "bg-white/10 text-white/70"}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">{cap.badge}</div>
                  <div className="text-[11px] text-white/60 hidden sm:block">{cap.title.split(" ")[0]}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Showcase Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-black p-8 md:p-12 backdrop-blur-2xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/20 px-3.5 py-1 text-xs font-semibold text-rose-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{selected.badge}</span>
              </div>

              <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                {selected.headline}
              </h3>

              <p className="text-sm md:text-base text-white/80 leading-relaxed">
                {selected.description}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                {selected.stats.map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-2 rounded-xl bg-white/5 px-3.5 py-2 border border-white/10 text-xs font-semibold text-rose-300">
                    <CheckCircle2 className="h-4 w-4 text-[#99F54E]" />
                    <span>{stat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400 hover:text-rose-300"
                >
                  <span>Build Custom AI Solution</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right Terminal / Simulated Interface */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/15 bg-black/80 p-5 shadow-2xl space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                    <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                    <div className="h-3 w-3 rounded-full bg-[#99F54E]/80" />
                  </div>
                  <span className="text-[10px] text-white/40">webbheads-ai-agent.v2</span>
                </div>

                <div className="space-y-3">
                  <div className="rounded-xl bg-white/5 p-3.5 border border-white/5 text-white/80">
                    <div className="text-[10px] text-rose-400 mb-1">INPUT EVENT</div>
                    <div>{selected.examplePrompt}</div>
                  </div>

                  <div className="rounded-xl bg-gradient-to-r from-rose-500/10 to-indigo-500/10 p-3.5 border border-rose-500/20 text-white">
                    <div className="text-[10px] text-indigo-400 mb-1 flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-rose-400" /> AI AGENT OUTPUT
                    </div>
                    <div>{selected.exampleResponse}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
