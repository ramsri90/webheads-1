"use client";

import React, { useMemo, useEffect, useState } from "react";

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  boxShadow: string;
}

interface TwinklingStarsProps {
  count?: number; // Default 80
  className?: string;
}

export function TwinklingStars({ count = 80, className = "" }: TwinklingStarsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate star positions ONCE using useMemo for high performance
  const stars: Star[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const size = Math.floor(Math.random() * 2.5) + 1.2; // 1.2px - 3.5px
      const duration = (2 + Math.random() * 3).toFixed(2); // 2s - 5s
      const delay = (Math.random() * 5).toFixed(2); // 0s - 5s
      const top = (Math.random() * 100).toFixed(2);
      const left = (Math.random() * 100).toFixed(2);

      // Vary glow strength based on size
      const glowSpread = (size * 1.5).toFixed(1);
      const glowColor = i % 2 === 0 ? "rgba(13, 148, 136, 0.8)" : "rgba(34, 211, 238, 0.8)";
      const boxShadow = `0 0 ${glowSpread}px ${Math.max(0.5, size * 0.4).toFixed(1)}px ${glowColor}`;

      return {
        id: i,
        top: parseFloat(top),
        left: parseFloat(left),
        size,
        duration: parseFloat(duration),
        delay: parseFloat(delay),
        boxShadow,
      };
    });
  }, [count]);

  if (!mounted) return null;

  return (
    <div
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-teal-500 transform-gpu"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: star.boxShadow,
            animation: `twinkle ${star.duration}s ease-in-out infinite ${star.delay}s`,
            willChange: "opacity, transform",
          }}
        />
      ))}
    </div>
  );
}
