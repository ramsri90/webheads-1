"use client";

import React, { useMemo, useEffect, useState } from "react";

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

interface TwinklingStarsProps {
  count?: number; // Default 35
  className?: string;
}

export function TwinklingStars({ count = 35, className = "" }: TwinklingStarsProps) {
  const [mounted, setMounted] = useState(false);
  const [starCount, setStarCount] = useState(count);

  useEffect(() => {
    setMounted(true);
    if (window.innerWidth < 768) {
      setStarCount(15);
    }
  }, [count]);

  const stars: Star[] = useMemo(() => {
    return Array.from({ length: starCount }, (_, i) => {
      const size = Math.floor(Math.random() * 2) + 1.2;
      const duration = (2 + Math.random() * 3).toFixed(2);
      const delay = (Math.random() * 4).toFixed(2);
      const top = (Math.random() * 100).toFixed(2);
      const left = (Math.random() * 100).toFixed(2);

      return {
        id: i,
        top: parseFloat(top),
        left: parseFloat(left),
        size,
        duration: parseFloat(duration),
        delay: parseFloat(delay),
      };
    });
  }, [starCount]);

  if (!mounted) return null;

  return (
    <div
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-teal-500/80"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `twinkle ${star.duration}s ease-in-out infinite ${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
