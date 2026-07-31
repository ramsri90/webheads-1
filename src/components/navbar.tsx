"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, PhoneCall } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Benefits", href: "#benefits" },
    { name: "Process", href: "#process" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" }
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => {
      navLinks.forEach((link) => {
        const el = document.querySelector(link.href);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl">
      {/* Glass Navbar Container */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 rounded-full synapse-glass">
        {/* Transparent Logo Icon Shape + Company Name */}
        <a href="#" className="flex items-center gap-3 group" aria-label="WebbHeads Home">
          <img 
            src="/images/webbheads-logo.png" 
            alt="WebbHeads Logo" 
            className="h-9.5 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
            WebbHeads
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-9 text-base font-medium text-white md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a 
                key={link.name} 
                href={link.href} 
                className={`transition-all duration-300 relative ${
                  isActive ? "text-cyan-400 font-semibold" : "text-white/80 hover:text-cyan-400"
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          <a 
            href="tel:+919494259453" 
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/80 hover:text-white transition-colors py-2 px-3.5 rounded-full hover:bg-white/5 font-mono"
          >
            <PhoneCall className="h-4 w-4 text-cyan-400" />
            <span>+91 9494259453</span>
          </a>
          <a 
            href="https://cal.com/webb-heads"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs sm:text-sm font-bold text-black shadow-lg transition-all hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Contact Us</span>
            <ArrowRight className="h-4 w-4 text-black" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="mt-2 md:hidden rounded-3xl border border-white/20 bg-black/85 px-6 py-6 backdrop-blur-xl shadow-2xl animate-fadeInUp">
          <nav className="flex flex-col gap-4 text-base font-medium text-white">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                onClick={() => setIsOpen(false)} 
                className="py-2 border-b border-white/10 text-white hover:text-white/80"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://cal.com/webb-heads" 
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-bold text-black shadow-lg"
            >
              Book a Call (+91 9494259453)
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
