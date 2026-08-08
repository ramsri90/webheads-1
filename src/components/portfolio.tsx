"use client";

import React, { useState } from "react";
import { ExternalLink, X, ArrowUpRight, Info, CheckSquare, Monitor, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
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
    impact: "3x Inquiries"
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
    impact: "#1 Local Rank"
  }
];

export function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useMultiScrollReveal();

  const categories = ["All", "Travel", "Real Estate", "AI Automation", "Analytics"];

  const filteredCaseStudies = activeCategory === "All"
    ? caseStudies
    : caseStudies.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()) || p.title.toLowerCase().includes(activeCategory.toLowerCase()));

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredCaseStudies.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === filteredCaseStudies.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="cases" className="relative z-10 bg-transparent py-20 md:py-28 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Soft Ambient Glow */}
      <div className="absolute top-1/3 left-[8%] -z-10 h-64 w-64 rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-[8%] -z-10 h-72 w-72 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div ref={sectionRef} className="mx-auto max-w-7xl">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 scroll-reveal gap-6">
          <div className="max-w-2xl">
            <p className="text-teal-600 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 font-mono">Our Work</p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-teal-950 leading-tight">
              Real businesses. Real results.
            </h2>
            <p className="mt-4 text-teal-950/70 text-xs sm:text-sm">
              Explore some of our recent custom platform builds. Swipe or click navigation buttons to browse Case studies.
            </p>
          </div>

          {/* Controls */}
          <div className="flex gap-3 shrink-0">
            <button
              onClick={handlePrev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-teal-500/20 bg-teal-500/5 text-teal-950 hover:border-teal-500/50 hover:bg-teal-500/10 transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-teal-500/20 bg-teal-500/5 text-teal-950 hover:border-teal-500/50 hover:bg-teal-500/10 transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold font-mono transition-all border ${
                  isActive
                    ? "bg-teal-600 text-white border-teal-400 shadow-lg shadow-teal-500/25"
                    : "bg-teal-500/5 text-teal-950/70 border-teal-500/20 hover:border-teal-500/40 hover:text-teal-950"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Sliding Viewport Container */}
        <div className="relative overflow-hidden w-full max-w-5xl mx-auto py-2">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${Math.min(currentIndex, Math.max(0, filteredCaseStudies.length - 1)) * 100}%)` }}
          >
            {filteredCaseStudies.map((proj) => (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="w-full shrink-0 px-2 sm:px-4 cursor-pointer"
              >
                <div className="synapse-glass rounded-2xl overflow-hidden group border border-teal-500/15 hover:border-teal-500/40 transition-all shadow-xl hover:shadow-teal-500/10">
                  <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
                    {/* Image visual */}
                    <div className="md:col-span-6 relative min-h-[240px] overflow-hidden">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-teal-950/80 via-teal-950/40 to-transparent" />
                      <span className="absolute top-4 left-4 text-[12px] font-mono text-white bg-teal-950/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                        {proj.category}
                      </span>
                    </div>

                    {/* Metadata details */}
                    <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                      <div>
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="text-xl sm:text-2xl font-bold text-teal-950 group-hover:text-teal-600 transition-colors">
                            {proj.title}
                          </h3>
                          <ArrowUpRight className="h-5 w-5 text-teal-500/50 group-hover:text-teal-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 mt-1 shrink-0" />
                        </div>
                        <p className="text-xs text-teal-950/40 mb-3 font-mono">{proj.subtitle}</p>
                        <p className="text-xs sm:text-sm text-teal-950/70 leading-relaxed line-clamp-3">
                          {proj.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-teal-500/15 flex items-center justify-between">
                        <span className="text-xs font-semibold text-teal-600 font-mono">{proj.impact}</span>
                        <span className="text-xs text-teal-950/60 group-hover:text-teal-600 transition-colors">View details →</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Pagination */}
        <div className="flex justify-center gap-2 mt-8">
          {filteredCaseStudies.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? "w-6 bg-teal-500" : "w-2 bg-teal-500/20 hover:bg-teal-500/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Premium Case Study Modal */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-6 pt-24 pb-12 bg-teal-950/30 backdrop-blur-sm overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-3xl border border-teal-500/20 bg-white shadow-2xl overflow-hidden max-h-[82vh] flex flex-col animate-fadeInUp my-auto"
          >
            {/* Floating Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-teal-500/10 text-teal-950 backdrop-blur-md hover:bg-teal-500/20 transition-colors shadow-lg"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Body Container */}
            <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-6 bg-white">
              {/* Header Title & Tag */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-teal-500/15 pb-5">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/40 bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-600 font-mono mb-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
                    <span>{selectedProject.subtitle}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-950">
                    {selectedProject.title}
                  </h2>
                  <p className="text-xs text-teal-950/40 font-mono mt-1">{selectedProject.description}</p>
                </div>
                
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-5 py-2.5 text-xs font-bold text-white shadow-xl shadow-teal-600/20 hover:bg-teal-500 transition-all shrink-0 self-start sm:self-center"
                  >
                    <span>View Live Demo</span>
                    <ExternalLink className="h-3.5 w-3.5 text-white" />
                  </a>
                )}
              </div>

              {/* Main Image Banner */}
              <div className="relative rounded-2xl overflow-hidden max-h-[320px] h-60 w-full border border-teal-500/15">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom Details Section */}
              <div className="space-y-6">
                {/* Overview */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-teal-600 flex items-center gap-2 font-mono">
                    <Info className="h-4 w-4 text-teal-600" />
                    <span>Overview</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-teal-950/75 leading-relaxed font-light">
                    {selectedProject.fullOverview}
                  </p>
                </div>

                {/* Key Features */}
                {selectedProject.keyFeatures.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-teal-600 flex items-center gap-2 font-mono">
                      <CheckSquare className="h-4 w-4 text-teal-600" />
                      <span>Key Features</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {selectedProject.keyFeatures.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-teal-950/80">
                          <span className="h-2 w-2 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack */}
                {selectedProject.techStack.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-teal-600 flex items-center gap-2 font-mono">
                      <Monitor className="h-4 w-4 text-teal-600" />
                      <span>Tech Stack</span>
                    </h3>
                    <div className="text-xs sm:text-sm text-teal-950/75 font-mono leading-relaxed">
                      {selectedProject.techStack.join(" • ")}
                    </div>
                  </div>
                )}

                {/* Results */}
                {selectedProject.results.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-teal-600 flex items-center gap-2 font-mono">
                      <TrendingUp className="h-4 w-4 text-teal-600" />
                      <span>Results</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {selectedProject.results.map((res, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-teal-600 font-medium">
                          <span className="h-2 w-2 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                          <span>{res}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal Footer CTA */}
                <div className="pt-6 border-t border-teal-500/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <a
                    href="https://cal.com/webb-heads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-teal-600 hover:text-teal-500 transition-colors"
                  >
                    Want a similar solution for your business? Book a call &rarr;
                  </a>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="rounded-full bg-teal-500/10 px-5 py-2 text-xs font-medium text-teal-950 hover:bg-teal-500/20 transition-all"
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
