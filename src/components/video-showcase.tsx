"use client";

import React, { useEffect, useRef, useState } from "react";
import { Film, Play } from "lucide-react";
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

// Continuous 6-item loop for seamless sliding marquee on desktop & mobile
const reels = [...videoClips, ...videoClips];

function ReelFrame({ clip, isVisible }: { clip: (typeof videoClips)[number]; isVisible: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsLoaded(true)).catch(() => {});
      }
    } else {
      video.pause();
    }
  }, [isVisible]);

  return (
    <div className="flex flex-col items-center gap-3 shrink-0">
      {/* Phone Mock Reel Frame */}
      <div className="relative w-[220px] sm:w-[260px] aspect-[9/16] rounded-[32px] sm:rounded-[36px] border-[5px] sm:border-[6px] border-neutral-800 bg-gradient-to-br from-teal-950/80 via-neutral-900 to-black shadow-2xl overflow-hidden ring-1 ring-white/15">
        {/* Speaker / Camera Pill */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-3 sm:h-3.5 rounded-full bg-neutral-900 z-30 flex items-center justify-center">
          <span className="h-1 w-1 rounded-full bg-neutral-800 mr-1.5" />
          <span className="h-0.5 w-8 sm:w-10 rounded-full bg-neutral-800" />
        </div>

        {/* Video Element — Preloads metadata so frame 1 renders instantly */}
        <video
          ref={videoRef}
          src={clip.src}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setIsLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-85'}`}
        />

        {/* Indicator overlay while buffering */}
        {!isLoaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-teal-950/40 backdrop-blur-xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-400 animate-pulse">
              <Play className="h-4 w-4 fill-current ml-0.5" />
            </div>
          </div>
        )}

        {/* Bottom Tag Overlay */}
        <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 pb-2.5 pt-8">
          <p className="text-[12px] font-mono font-semibold text-white/90 tracking-wide">{clip.tag}</p>
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
  const [isInView, setIsInView] = useState(false);

  // IntersectionObserver to control playback when visible
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.05, rootMargin: "150px" }
    );

    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="showcase" className="relative z-10 bg-transparent py-20 md:py-28 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Soft Ambient Glow */}
      <div className="absolute top-1/4 left-[8%] -z-10 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-[8%] -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

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

        {/* Sliding Reel Marquee (Identical SSR + Client DOM structure for 100% stable hydration & smooth sliding on all devices) */}
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
          <div ref={trackRef} className="reel-marquee flex w-max gap-6">
            {reels.map((clip, i) => (
              <ReelFrame key={`${clip.id}-${i}`} clip={clip} isVisible={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
