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
    const handleScroll = () => {
      if (window.scrollY < 250) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (window.scrollY < 250) {
        setActiveSection("");
        return;
      }
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
      window.removeEventListener("scroll", handleScroll);
      navLinks.forEach((link) => {
        const el = document.querySelector(link.href);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl">
      {/* Glass Navbar Container */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 rounded-2xl synapse-glass shadow-lg border border-teal-500/20">
        {/* Transparent Logo Icon Shape + Company Name */}
        <a href="#" className="flex items-center gap-3 group" aria-label="WebbHeads Home">
          <img 
            src="/images/webbheads-logo-black.png" 
            alt="WebbHeads Logo" 
            className="h-9.5 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <span className="text-xl font-bold tracking-tight text-teal-950 group-hover:text-teal-600 transition-colors">
            WebbHeads
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-9 text-base font-medium text-teal-950 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a 
                key={link.name} 
                href={link.href} 
                className={`transition-all duration-300 relative ${
                  isActive ? "text-teal-600 font-semibold" : "text-teal-950/70 hover:text-teal-600"
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-teal-600 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          <a 
            href="tel:+919494259453" 
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-teal-950/70 hover:text-teal-600 transition-colors py-2 px-3.5 rounded-full hover:bg-teal-500/10 font-mono"
          >
            <PhoneCall className="h-4 w-4 text-teal-600" />
            <span>+91 9494259453</span>
          </a>
          <a 
            href="https://cal.com/webb-heads"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-teal-600/25 transition-all hover:bg-teal-500 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Contact Us</span>
            <ArrowRight className="h-4 w-4 text-white" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-teal-500/10 text-teal-950 hover:bg-teal-500/20 transition-colors"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="mt-2 md:hidden rounded-3xl border border-teal-500/20 bg-white/95 px-6 py-6 backdrop-blur-xl shadow-2xl animate-fadeInUp">
          <nav className="flex flex-col gap-4 text-base font-medium text-teal-950">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                onClick={() => setIsOpen(false)} 
                className="py-2 border-b border-teal-500/10 text-teal-950 hover:text-teal-600"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://cal.com/webb-heads" 
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-teal-600 py-3 text-sm font-bold text-white shadow-lg"
            >
              Book a Call (+91 9494259453)
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
