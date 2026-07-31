"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroVideo() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Determine the video source based on screen width
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVideoSrc("/video/reel ratio.mp4");
      } else {
        setVideoSrc("/video/landscape.mp4");
      }
    };

    // Initial check
    handleResize();

    // Prevent scrolling while video is playing
    if (isPlaying) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isPlaying]);

  // Attempt to manually trigger play when the source changes,
  // which helps bypass some mobile browser autoplay restrictions
  useEffect(() => {
    if (videoSrc && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(error => {
        console.warn("Autoplay blocked by browser:", error);
      });
    }
  }, [videoSrc]);

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  if (!isPlaying || !videoSrc) return null;

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay={true}
            muted={true}
            playsInline={true}
            onEnded={handleVideoEnd}
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleVideoEnd}
            className="absolute bottom-8 right-8 z-[101] px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full text-sm font-medium transition-all"
          >
            Skip Intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
