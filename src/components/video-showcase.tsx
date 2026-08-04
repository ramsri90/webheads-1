"use client";

import React, { useEffect, useRef } from "react";
import { Film } from "lucide-react";
import { useMultiScrollReveal } from "@/hooks/use-scroll-reveal";

const videoClips = [
  {
    id: "kushal-grows-reel",
    title: "Kushal Grows",
    desc: "Interactive demonstration of web interface and user workflow.",
    src: "/video/3898765097426337160.mp4",
    tag: "Kushal Grows Reel"
  },
  {
    id: "avani-organics",
    title: "Avani Organics",
    desc: "Digital presence and product catalog showcasing organic lifestyle branding.",
    src: "/video/3925178742458519743.mp4",
    tag: "Concept Film"
  },
  {
    id: "prahari-realty",
    title: "Prahari Realty",
    desc: "Immersive real estate platform and property exploration experience.",
    src: "/video/3930971935131133465.mp4",
    tag: "Prahari Realty Reel"
  }
];

const reels = [...videoClips, ...videoClips];

function ReelFrame({ clip }: { clip: (typeof videoClips)[number] }) {
  return (
    <div className="flex flex-col items-center gap-3 shrink-0">
      {/* Phone Mock Reel */}
      <div className="relative w-[230px] sm:w-[260px] aspect-[9/16] rounded-[36px] border-[6px] border-neutral-800 bg-black shadow-2xl overflow-hidden ring-1 ring-white/15">
        {/* Speaker / Camera Pill */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-3.5 rounded-full bg-neutral-900 z-30 flex items-center justify-center">
          <span className="h-1 w-1 rounded-full bg-neutral-800 mr-1.5" />
          <span className="h-0.5 w-10 rounded-full bg-neutral-800" />
        </div>

        {/* Autoplaying Reel Video */}
        <video
          src={clip.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Bottom Tag Overlay */}
        <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2.5 pt-8">
          <p className="text-[12px] font-mono font-semibold text-white/85 tracking-wide">{clip.tag}</p>
        </div>
      </div>

      {/* Caption */}
      <div className="text-center px-1 max-w-[260px]">
        <p className="font-bold text-sm sm:text-base text-teal-950">{clip.title}</p>
        <p className="text-[12px] text-teal-950/60 leading-snug mt-0.5">{clip.desc}</p>
      </div>
    </div>
  );
}

export function VideoShowcase() {
  const sectionRef = useMultiScrollReveal();
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const videos = trackRef.current?.querySelectorAll("video") ?? [];
    videos.forEach((video) => video.play().catch(() => {}));
  }, []);

  return (
    <section ref={sectionRef} id="showcase" className="relative z-10 bg-transparent py-20 md:py-28 px-4 sm:px-6 md:px-8 overflow-hidden" style={{ perspective: "1200px" }}>
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-[8%] -z-10 h-72 w-72 rounded-full bg-teal-500/10 blur-[120px] pointer-events-none animate-orbFloat" />
      <div className="absolute bottom-1/4 right-[8%] -z-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none animate-orbFloat" style={{ animationDelay: "4s" }} />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20 scroll-reveal">
          <p className="text-teal-600 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5 font-mono">
            <Film className="h-4 w-4" /> Live Demo Showcase
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-teal-950 leading-tight">
            See the content in action
          </h2>
          <p className="mt-3 text-sm text-teal-950/60">Reels auto-play and glide by — hover to pause.</p>
        </div>

        {/* Auto-sliding Reel Marquee */}
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div ref={trackRef} className="reel-marquee flex w-max gap-6">
            {reels.map((clip, i) => (
              <ReelFrame key={`${clip.id}-${i}`} clip={clip} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
