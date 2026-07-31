"use client";

import React, { useState } from "react";
import { ExternalLink, X, ArrowUpRight, Info, CheckSquare, Monitor, TrendingUp } from "lucide-react";
import { useMultiScrollReveal } from "@/hooks/use-scroll-reveal";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  fullOverview: string;
  image: string;
  demoUrl?: string;
  keyFeatures: string[];
  techStack: string[];
  results: string[];
  impact: string;
}

const caseStudies: Project[] = [
  {
    id: "tripspark",
    title: "TripSpark",
    subtitle: "Travel Marketplace Platform",
    category: "Travel",
    description: "Modern Airbnb-style travel discovery platform built for seamless short-stay exploration and intelligent property discovery.",
    fullOverview: "TripSpark is a full-stack travel and short-stay marketplace platform inspired by Airbnb, tailored for the Indian market. It modernizes how travellers discover properties through category-driven browsing, intelligent filtering, transparent pricing, and seamless authentication flows. Built with Next.js 14.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
    demoUrl: "https://tripspark.onrender.com/listings",
    keyFeatures: [
      "11-category travel discovery system",
      "Advanced property search with filters",
      "Real-time GST tax toggle",
      "4-column responsive listing layout"
    ],
    techStack: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Node.js"],
    results: [
      "Modern marketplace experience",
      "Real-time GST calculations",
      "Seamless guest onboarding",
      "Scalable host architecture"
    ],
    impact: "+200% Conversion"
  },
  {
    id: "appointment-automation",
    title: "Appointment Automation Platform",
    subtitle: "Real Estate Appointment Orchestration",
    category: "Real Estate",
    description: "Premium Real Estate Appointment Orchestration Platform Designed To Streamline Consultation Scheduling, Automate Customer Engagement Workflows, And Improve Lead Conversion Efficiency.",
    fullOverview: "A Premium Real Estate Consultation And Appointment Orchestration Platform Built To Simplify Customer Engagement Workflows Across Site Visits, Virtual Tours, Consultation Calls, And Investment Discussions. The Platform Centralizes Scheduling, Improves Lead Qualification, And Creates A Streamlined Customer Experience Through Guided Appointment Workflows And Automated Confirmation Systems.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    demoUrl: "https://appointment-system-five-teal.vercel.app/",
    keyFeatures: [
      "Guided Consultation Workflows Replacing Traditional Static Inquiry Forms",
      "Multi-Service Appointment Scheduling For Site Visits, Virtual Tours, And Consultation Calls",
      "Smart Lead Information Capture With Contextual Consultation Requirements",
      "Automated Scheduling Validation And Appointment Confirmation Workflows"
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Responsive UI Architecture", "Workflow Management System"],
    results: [
      "Improved coordination efficiency across channels",
      "Reduced manual scheduling overhead",
      "Enhanced lead quality with context-rich capture",
      "Improved engagement continuity"
    ],
    impact: "24/7 Leads"
  },
  {
    id: "ai-assistant",
    title: "AI Property Assistant",
    subtitle: "AI Real Estate Automation Platform",
    category: "AI Automation",
    description: "Conversational AI-powered real estate assistant designed to simplify property discovery, automate lead qualification, and improve customer engagement through guided interactions.",
    fullOverview: "The AI-Powered Real Estate Assistant is a conversational property discovery platform built to modernize how users search, explore, and engage with real estate listings. Instead of relying on traditional search-heavy workflows, the platform guides users through an intelligent step-by-step experience that simplifies decision-making, improves lead quality, and enables faster agent follow-ups.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    keyFeatures: [
      "Guided conversational property discovery flow",
      "AI recommendation engine",
      "Dynamic quick-select interactions",
      "Instant property matching based on user preferences"
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "AI Recommendation Logic", "Real-Time Workflows"],
    results: [
      "Improved customer engagement through guided experiences",
      "Reduced property discovery friction",
      "Enhanced lead quality using structured preferences",
      "Accelerated agent response times"
    ],
    impact: "0s Lead Delay"
  },
  {
    id: "analytics-dashboard",
    title: "Business Analytics Dashboard",
    subtitle: "Business Intelligence Platform",
    category: "Analytics",
    description: "Modern analytics dashboard designed to help businesses monitor KPIs, visualize operational performance, and make faster data-driven decisions through real-time insights.",
    fullOverview: "The Business Analytics Dashboard is a modern business intelligence platform built to centralize operational insights, KPI monitoring, and performance tracking within a single interactive interface. Designed with a strong focus on clarity, usability, and real-time visualization, the dashboard enables organizations to simplify reporting workflows and accelerate decision-making.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    demoUrl: "https://basic-analytics-report.vercel.app/",
    keyFeatures: [
      "Interactive KPI dashboards with real-time performance visualization",
      "Custom analytics views for executives and operations teams",
      "Advanced reporting interface with export-ready snapshots",
      "Trend monitoring system enabling faster operational analysis"
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Chart Visualization Libraries", "Business Intelligence Workflows"],
    results: [
      "Improved operational visibility through centralized reporting",
      "Accelerated decision-making with real-time KPI monitoring",
      "Simplified executive reporting through interactive dashboards",
      "Reduced manual reporting effort across departments"
    ],
    impact: "10x Speed"
  },
  {
    id: "property-listing",
    title: "Advanced Property Listing Platform",
    subtitle: "Property Listing Experience",
    category: "Real Estate Portal",
    description: "High-performance real estate listing platform designed to simplify property discovery through advanced filtering, premium property presentation, and conversion-focused browsing experiences.",
    fullOverview: "The Advanced Property Listing Platform is a modern real estate discovery experience built to improve how users explore, compare, and engage with property listings online. Designed with a strong focus on performance, usability, and visual clarity, the platform combines intelligent filtering systems, premium property presentation, and responsive browsing workflows to create a seamless and conversion-focused property search experience.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    demoUrl: "https://adv-property-listing.vercel.app/",
    keyFeatures: [
      "Advanced property filtering system with location, budget, and property type search",
      "Premium media-first property cards optimized for engagement and visibility",
      "High-conversion listing detail pages with structured property information",
      "Responsive browsing experience optimized for desktop, tablet, and mobile users"
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Responsive UI Architecture", "Property Search & Filtering System", "Modern Real Estate UX Design", "Performance Optimization Workflows", "Conversion-Focused Interface Design"],
    results: [
      "Improved property discovery experience through advanced filtering workflows",
      "Increased user engagement and browsing time across listing pages",
      "Enhanced inquiry generation through conversion-focused listing design",
      "Improved browsing performance with scalable search architecture property listings"
    ],
    impact: "Impact: 3x Inquiries"
  },
  {
    id: "corporate-website",
    title: "Corporate Business Website",
    subtitle: "Premium Website Development",
    category: "Corporate Digital Presence",
    description: "Modern corporate business website designed to strengthen digital presence, build customer trust, and deliver a premium brand experience through clean UI and performance-focused architecture.",
    fullOverview: "The Corporate Business Website is a premium digital presence platform built to help businesses establish credibility, improve brand positioning, and create stronger customer engagement online. Designed with modern UI principles, performance optimization, and strategic storytelling, the website combines elegant visuals, responsive architecture, and conversion-focused experiences for a professional identity.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    demoUrl: "https://loving-elements-371947.framer.app/",
    keyFeatures: [
      "Modern corporate website architecture optimized for brand positioning and trust",
      "Cinematic hero sections and visual storytelling experiences",
      "Responsive layouts designed for desktop, tablet, and mobile accessibility",
      "SEO-optimized page structure improving search visibility and discoverability"
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Responsive UI Architecture", "SEO Optimization Framework", "Corporate UX Design System"],
    results: [
      "Strengthened digital brand authority through premium website experiences",
      "Improved customer trust with modern responsive UI",
      "Enhanced user engagement through strategic storytelling",
      "Improved lead quality with conversion-focused workflows"
    ],
    impact: "Impact: #1 Local Rank"
  }
];

export function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useMultiScrollReveal();

  return (
    <section id="cases" className="relative z-10 bg-transparent py-20 md:py-28 px-4 sm:px-6 md:px-8 overflow-hidden" style={{ perspective: "1200px" }}>
      {/* 3D Floating Glow Orbs */}
      <div className="absolute top-1/3 left-[8%] -z-10 h-72 w-72 rounded-full bg-rose-500/10 blur-[120px] pointer-events-none animate-orbFloat" />
      <div className="absolute bottom-1/4 right-[8%] -z-10 h-80 w-80 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none animate-orbFloat" style={{ animationDelay: "6s" }} />

      <div ref={sectionRef} className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20 scroll-reveal">
          <p className="text-[#99F54E] text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">Our Work</p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-animated-white-neongreen leading-tight">
            Real businesses. Real results.
          </h2>
          <p className="mt-4 text-white/60 text-sm sm:text-base">
            Click any project to see the full case study.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {caseStudies.map((proj, idx) => (
            <div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className="scroll-reveal-scale card-3d group cursor-pointer rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.06] to-white/[0.02] overflow-hidden backdrop-blur-xl hover:border-rose-500/40"
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <span className="absolute top-3 left-3 text-[11px] font-mono text-white/80 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  {proj.category}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-rose-300 transition-colors">{proj.title}</h3>
                  <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-rose-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 mt-0.5" />
                </div>
                <p className="text-xs text-white/40 mb-2 font-mono">{proj.subtitle}</p>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed line-clamp-2">{proj.description}</p>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-rose-400 font-mono">{proj.impact}</span>
                  <span className="text-xs text-white/60 group-hover:text-white transition-colors">View details →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Case Study Modal Matching User Screenshot */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-3xl border border-white/20 bg-neutral-950 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-fadeInUp"
          >
            {/* Floating Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/30 transition-colors shadow-lg"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Body Container */}
            <div className="overflow-y-auto flex-1">
              {/* Split Top Hero Banner */}
              <div className="grid grid-cols-1 md:grid-cols-12 bg-neutral-900/60 border-b border-white/10 relative">
                {/* Left Content Column */}
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    {/* Green Outline Pill Tag */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#99F54E]/40 bg-[#99F54E]/10 px-3.5 py-1 text-xs font-semibold text-[#99F54E] font-mono">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#99F54E] animate-pulse" />
                      <span>{selectedProject.subtitle}</span>
                    </div>

                    {/* Headline Title */}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                      {selectedProject.title}
                    </h2>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Primary CTA Button */}
                  {selectedProject.demoUrl && (
                    <div className="pt-2">
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-bold text-black shadow-xl hover:bg-white/90 hover:scale-105 transition-all"
                      >
                        <span>View Live Demo</span>
                        <ExternalLink className="h-3.5 w-3.5 text-black" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Right Image Screenshot Column */}
                <div className="md:col-span-5 relative overflow-hidden min-h-[220px] md:min-h-[300px]">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-transparent to-transparent hidden md:block" />
                </div>
              </div>

              {/* Bottom Details Section */}
              <div className="p-6 sm:p-8 space-y-8 bg-neutral-950">
                {/* Overview */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#99F54E] flex items-center gap-2 font-mono">
                    <Info className="h-4 w-4 text-[#99F54E]" />
                    <span>Overview</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-light">
                    {selectedProject.fullOverview}
                  </p>
                </div>

                {/* Key Features */}
                {selectedProject.keyFeatures.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#99F54E] flex items-center gap-2 font-mono">
                      <CheckSquare className="h-4 w-4 text-[#99F54E]" />
                      <span>Key Features</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {selectedProject.keyFeatures.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80">
                          <span className="h-2 w-2 rounded-full bg-[#99F54E] mt-1.5 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack */}
                {selectedProject.techStack.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#99F54E] flex items-center gap-2 font-mono">
                      <Monitor className="h-4 w-4 text-[#99F54E]" />
                      <span>Tech Stack</span>
                    </h3>
                    <div className="text-xs sm:text-sm text-white/75 font-mono leading-relaxed">
                      {selectedProject.techStack.join(" • ")}
                    </div>
                  </div>
                )}

                {/* Results */}
                {selectedProject.results.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#99F54E] flex items-center gap-2 font-mono">
                      <TrendingUp className="h-4 w-4 text-[#99F54E]" />
                      <span>Results</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {selectedProject.results.map((res, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#99F54E]/90 font-medium">
                          <span className="h-2 w-2 rounded-full bg-[#99F54E] mt-1.5 shrink-0" />
                          <span>{res}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal Footer CTA */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <a
                    href="https://cal.com/webb-heads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
                  >
                    Want a similar solution for your business? Book a call &rarr;
                  </a>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="rounded-full bg-white/10 px-5 py-2 text-xs font-medium text-white hover:bg-white/20 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
