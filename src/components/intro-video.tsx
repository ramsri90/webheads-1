"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

export function IntroVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Automatically skip intro on mobile / touch devices for maximum speed
    const isMobileDevice = window.innerWidth < 768 || ("ontouchstart" in window) || (navigator.maxTouchPoints > 0);
    const hasSeen = sessionStorage.getItem("webbheads_intro_seen");

    if (hasSeen === "true" || isMobileDevice) {
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    setVideoSrc("/video/landscape.mp4");
  }, []);

  useEffect(() => {
    if (isPlaying) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("intro-active");
    } else {
      document.body.style.overflow = "unset";
      document.body.classList.remove("intro-active");
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.classList.remove("intro-active");
    };
  }, [isPlaying]);

  useEffect(() => {
    if (videoSrc && videoRef.current && isPlaying) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsBlocked(false);
          })
          .catch(() => {
            setIsBlocked(true);
          });
      }
    }
  }, [videoSrc, isPlaying]);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleVideoEnd = () => {
    sessionStorage.setItem("webbheads_intro_seen", "true");
    setIsPlaying(false);
  };

  const handleManualPlay = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => setIsBlocked(false));
    }
  };

  if (!isPlaying || !videoSrc) return null;

  const strokeDashoffset = 100 - progress;

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay={true}
            muted={true}
            playsInline={true}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnd}
            className="w-full h-full object-cover"
          />

          {/* Autoplay Fallback Overlay */}
          {isBlocked && (
            <div className="absolute inset-0 z-[10001] flex flex-col items-center justify-center bg-black/70 backdrop-blur-md">
              <button
                onClick={handleManualPlay}
                className="flex items-center gap-3 px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-full text-base font-bold shadow-lg shadow-teal-500/30 transition-all hover:scale-105"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Play Intro</span>
              </button>
            </div>
          )}

          {/* Skip Intro Button */}
          <div className="absolute bottom-8 right-8 z-[10000] flex items-center gap-3">
            <button
              onClick={handleVideoEnd}
              className="relative group flex items-center gap-3 px-5 py-2.5 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 hover:border-teal-400/50 text-white rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-lg"
            >
              <span>Skip Intro</span>
              <svg className="w-5 h-5 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/20"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-teal-400 transition-all duration-150"
                  strokeDasharray="100, 100"
                  strokeDashoffset={strokeDashoffset}
                  strokeWidth="3"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
