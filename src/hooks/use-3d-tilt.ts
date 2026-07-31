"use client";

import { useState, useCallback } from "react";

interface TiltState {
  rotateX: number;
  rotateY: number;
  scale: number;
}

export function use3DTilt(intensity = 12) {
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0, scale: 1 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      setTilt({
        rotateX: (y / (rect.height / 2)) * -intensity,
        rotateY: (x / (rect.width / 2)) * intensity,
        scale: 1.03,
      });
    },
    [intensity]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  }, []);

  const tiltStyle: React.CSSProperties = {
    transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
    transition: "transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)",
  };

  return { tiltStyle, handleMouseMove, handleMouseLeave, tilt };
}
