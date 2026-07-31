"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, X, Calendar, ArrowRight } from "lucide-react";

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show widget after 4 seconds
    const timer = setTimeout(() => setIsVisible(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-[calc(100%-3rem)] animate-fadeInUp">
      <div className="relative rounded-2xl synapse-glass p-5 border border-white/15 shadow-2xl">
        {/* Dismiss Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors"
          aria-label="Close widget"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex gap-3 items-start">
          {/* Avatar / Icon Container */}
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500/20 border border-purple-500/30">
            <MessageSquare className="h-5 w-5 text-purple-400" />
            {/* Live pulsing online dot */}
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          {/* Text details */}
          <div className="space-y-1 pr-4">
            <div className="text-xs font-bold font-mono text-purple-400 uppercase tracking-wider">
              DJ Kushal is online
            </div>
            <p className="text-xs text-white/95 font-medium leading-relaxed">
              Hey! Let's discuss your custom web or AI automation project in Vizag.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-end">
          <a
            href="https://cal.com/webb-heads"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[11px] font-bold text-black shadow-md hover:bg-neutral-100 transition-all hover:scale-[1.02]"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Book Strategy Call</span>
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
