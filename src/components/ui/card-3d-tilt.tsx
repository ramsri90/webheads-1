"use client";

import React, { useRef, useState, useEffect } from "react";

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxTilt?: number;
  glareOpacity?: number;
}

export function Card3DTilt({
  children,
  className = "",
  style = {},
  maxTilt = 10,
  glareOpacity = 0.12,
}: Card3DTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHoverable, setIsHoverable] = useState(true);

  useEffect(() => {
    // Only enable tilt calculation on devices with fine pointer (mouse) capability
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsHoverable(media.matches);

    const handler = (e: MediaQueryListEvent) => setIsHoverable(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHoverable || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width - 0.5) * 2;
    const yPct = (mouseY / height - 0.5) * 2;

    setTilt({ x: -yPct * maxTilt, y: xPct * maxTilt });
    setGlare({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
      opacity: glareOpacity,
    });
  };

  const handleMouseLeave = () => {
    if (!isHoverable) return;
    setTilt({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  if (!isHoverable) {
    return <div className={className} style={style}>{children}</div>;
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transform-gpu transition-transform duration-200 ease-out ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(8px)`,
        ...style,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-30"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, ${glare.opacity}) 0%, transparent 60%)`,
          mixBlendMode: "overlay",
        }}
      />
      {children}
    </div>
  );
}
