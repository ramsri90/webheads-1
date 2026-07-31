"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Film } from "lucide-react";
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
    src: "/video/3945489529037579392.mp4",
    tag: "Concept File"
  }
];


export function VideoShowcase() {
  const [activeClip, setActiveClip] = useState(videoClips[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useMultiScrollReveal();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [activeClip]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section ref={sectionRef} id="showcase" className="relative z-10 bg-transparent py-16 md:py-28 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Glow Orbs - hidden on mobile for perf */}
      <div className="hidden md:block absolute top-1/4 left-[8%] -z-10 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px] pointer-events-none animate-orbFloat" />
      <div className="hidden md:block absolute bottom-1/4 right-[8%] -z-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none animate-orbFloat" style={{ animationDelay: "4s" }} />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-20 scroll-reveal">
          <p className="text-purple-400 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5 font-mono">
            <Film className="h-4 w-4" /> Live Demo Showcase
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
            See the content in action
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center max-w-5xl mx-auto">
          {/* Left: Interactive Selector List */}
          <div className="lg:col-span-6 space-y-3 md:space-y-4 order-2 lg:order-1">
            {videoClips.map((clip) => {
              const isActive = clip.id === activeClip.id;
              return (
                <button
                  key={clip.id}
                  onClick={() => {
                    setActiveClip(clip);
                    setIsPlaying(true);
                  }}
                  className={`w-full flex flex-col justify-between p-4 md:p-5 rounded-2xl border text-left transition-all ${
                    isActive
                      ? "bg-gradient-to-br from-purple-500/15 to-transparent border-purple-500/50 shadow-lg"
                      : "synapse-glass hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-bold text-sm sm:text-base text-white">{clip.title}</span>
                    <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${isActive ? "border-purple-400/40 bg-purple-500/10 text-purple-400" : "border-white/10 text-white/50"}`}>
                      {clip.tag}
                    </span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">{clip.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Right: Phone Mock Player */}
          <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
            <div className="relative mx-auto max-w-[260px] sm:max-w-[280px] w-full aspect-[9/16] rounded-[36px] border-[5px] md:border-[6px] border-neutral-800 bg-black shadow-2xl overflow-hidden ring-1 ring-white/15">
              {/* Speaker / Camera Pill */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-4 rounded-full bg-neutral-900 z-30 flex items-center justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-800 mr-2" />
                <span className="h-1 w-10 sm:w-12 rounded-full bg-neutral-800" />
              </div>

              {/* Video Element - preload none for performance */}
              <video
                ref={videoRef}
                src={activeClip.src}
                loop
                muted={isMuted}
                playsInline={true}
                preload="none"
                className="absolute inset-0 h-full w-full object-cover"
                onClick={togglePlay}
              />

              {/* Play Overlay Button */}
              {!isPlaying && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 cursor-pointer transition-colors"
                >
                  <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 scale-100 hover:scale-105 transition-all">
                    <Play className="h-5 w-5 md:h-6 md:w-6 text-white fill-white ml-0.5" />
                  </div>
                </div>
              )}

              {/* Quick UI Controls */}
              <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4 z-20 flex justify-between items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-black/60 text-white border border-white/10 backdrop-blur-md hover:bg-black/80 transition-all"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? <Pause className="h-3.5 w-3.5 md:h-4 md:w-4" /> : <Play className="h-3.5 w-3.5 md:h-4 md:w-4 ml-0.5" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-black/60 text-white border border-white/10 backdrop-blur-md hover:bg-black/80 transition-all"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <VolumeX className="h-3.5 w-3.5 md:h-4 md:w-4" /> : <Volume2 className="h-3.5 w-3.5 md:h-4 md:w-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
