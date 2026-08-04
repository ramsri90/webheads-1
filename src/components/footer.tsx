"use client";

import React from "react";
import { Phone, ArrowUp, ArrowRight } from "lucide-react";
import { useMultiScrollReveal } from "@/hooks/use-scroll-reveal";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const WhatsAppLogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export function Footer() {
  const sectionRef = useMultiScrollReveal();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative z-10 bg-teal-500/5 backdrop-blur-lg text-teal-950 border-t border-teal-500/15">
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919494259453?text=Hi%20WebbHeads%2C%20I%20need%20an%20enquiry.%20I%20need%20your%20help"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-white/85 hover:bg-teal-500/10 text-teal-950 border border-teal-500/25 backdrop-blur-md px-4 py-3 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group font-medium text-xs"
      >
        <WhatsAppLogoIcon className="h-5 w-5 fill-teal-600 group-hover:rotate-12 transition-transform duration-300" />
        <span className="hidden sm:inline font-semibold">Chat on WhatsApp</span>
      </a>

      {/* Ready CTA Banner */}
      <div ref={sectionRef} className="mx-auto max-w-6xl px-6 md:px-8 pt-20">
        <div className="scroll-reveal p-8 md:p-12 text-center">
          <h3 className="text-2xl sm:text-4xl font-bold text-teal-950">
            Ready to scale your business?
          </h3>
          <p className="mt-3 text-sm sm:text-base text-teal-950/60 max-w-lg mx-auto">
            Let us handle the technical build and digital marketing while you focus on growth.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://cal.com/webb-heads"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-3 text-xs font-semibold text-white hover:bg-teal-500 transition-colors"
            >
              <span>Book a Call</span>
              <ArrowRight className="h-4 w-4 text-white" />
            </a>
            <a
              href="https://wa.me/919494259453?text=Hi%20WebbHeads%2C%20I%20need%20an%20enquiry.%20I%20need%20your%20help"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-teal-500/25 bg-teal-500/5 px-6 py-3 text-xs font-medium text-teal-950 hover:bg-teal-500/10 transition-colors font-mono"
            >
              <WhatsAppLogoIcon className="h-4 w-4 fill-teal-600" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-6xl px-6 md:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-teal-500/15">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/images/webbheads-logo-black.png" 
                alt="WebbHeads Logo" 
                className="h-9 w-auto object-contain"
              />
              <span className="text-2xl font-bold tracking-tight text-teal-950">
                WebbHeads
              </span>
            </div>
            <p className="text-sm text-teal-950/60 leading-relaxed max-w-sm">
              Building modern, high-performance digital experiences that help businesses grow faster and smarter.
            </p>

            {/* Social Icons Bar */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/919494259453?text=Hi%20WebbHeads%2C%20I%20need%20an%20enquiry.%20I%20need%20your%20help"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/5 border border-teal-500/20 text-teal-950/70 hover:text-teal-600 hover:bg-teal-500/10 hover:border-teal-500/30 transition-all"
              >
                <WhatsAppLogoIcon className="h-5 w-5 fill-current" />
              </a>
              <a
                href="https://www.linkedin.com/company/webb-heads/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/5 border border-teal-500/20 text-teal-950/70 hover:text-sky-500 hover:bg-sky-500/10 hover:border-sky-500/30 transition-all"
              >
                <LinkedInIcon className="h-5 w-5 fill-current" />
              </a>
              <a
                href="https://www.instagram.com/webbheads.studio?igsh=MWh4eWxuZWpleDk1Zw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/5 border border-teal-500/20 text-teal-950/70 hover:text-pink-500 hover:bg-pink-500/10 hover:border-pink-500/30 transition-all"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/DKushalx1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/5 border border-teal-500/20 text-teal-950/70 hover:text-teal-950 hover:bg-teal-500/10 hover:border-teal-500/30 transition-all"
              >
                <XIcon className="h-4.5 w-4.5 fill-current" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-teal-600 mb-4 font-mono">Services</h4>
            <ul className="space-y-3 text-sm text-teal-950/70">
              <li><a href="#services" className="hover:text-teal-600 transition-colors">Web Development</a></li>
              <li><a href="#services" className="hover:text-teal-600 transition-colors">App Development</a></li>
              <li><a href="#services" className="hover:text-teal-600 transition-colors">AI & Automation</a></li>
              <li><a href="#services" className="hover:text-teal-600 transition-colors">Digital Marketing</a></li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-teal-600 mb-4 font-mono">Navigation</h4>
            <ul className="space-y-3 text-sm text-teal-950/70">
              <li><a href="#benefits" className="hover:text-teal-600 transition-colors">Benefits</a></li>
              <li><a href="#process" className="hover:text-teal-600 transition-colors">Process</a></li>
              <li><a href="#cases" className="hover:text-teal-600 transition-colors">Case Studies</a></li>
              <li><a href="#pricing" className="hover:text-teal-600 transition-colors">Pricing</a></li>
              <li><a href="#faq" className="hover:text-teal-600 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Connect / Socials */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-teal-600 mb-4 font-mono">Connect</h4>
            <ul className="space-y-3 text-sm text-teal-950/70">
              <li>
                <a 
                  href="https://wa.me/919494259453?text=Hi%20WebbHeads%2C%20I%20need%20an%20enquiry.%20I%20need%20your%20help" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-600 transition-colors flex items-center gap-2"
                >
                  <WhatsAppLogoIcon className="h-4 w-4 fill-current" />
                  <span>WhatsApp Chat</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/company/webb-heads/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-600 transition-colors flex items-center gap-2"
                >
                  <LinkedInIcon className="h-4 w-4 fill-current" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.instagram.com/webbheads.studio?igsh=MWh4eWxuZWpleDk1Zw==" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-600 transition-colors flex items-center gap-2"
                >
                  <InstagramIcon className="h-4 w-4" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://x.com/DKushalx1" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-600 transition-colors flex items-center gap-2"
                >
                  <XIcon className="h-4 w-4 fill-current" />
                  <span>X (Twitter)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-teal-950/50">
          <div>
            &copy; 2026 Webb Heads. All rights reserved.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 rounded-lg bg-teal-500/5 px-3.5 py-1.5 text-xs text-teal-950/70 hover:bg-teal-500/10 hover:text-teal-950 transition-all"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
