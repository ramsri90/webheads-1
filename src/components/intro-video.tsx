"use client";

import { useState, useEffect, useRef } from "react";

export function IntroVideo() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Determine the video source based on screen width
    if (window.innerWidth < 768) {
      setVideoSrc("/video/reel ratio.mp4");
    } else {
      setVideoSrc("/video/landscape.mp4");
    }
  }, []);

  useEffect(() => {
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

  // Manually trigger play when the source is set
  useEffect(() => {
    if (videoSrc && videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If autoplay is blocked, skip the intro entirely
          setIsPlaying(false);
        });
      }
    }
  }, [videoSrc]);

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  if (!isPlaying || !videoSrc) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      style={{ opacity: isPlaying ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay={true}
        muted={true}
        playsInline={true}
        preload="auto"
        onEnded={handleVideoEnd}
        className="w-full h-full object-cover"
        style={{ WebkitTransform: "translateZ(0)" }}
      />
      <button
        onClick={handleVideoEnd}
        className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-[101] px-5 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full text-xs sm:text-sm font-medium transition-all active:scale-95"
      >
        Skip Intro
      </button>
    </div>
  );
}
