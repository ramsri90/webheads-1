"use client";

import React, { useEffect, useRef, useState } from "react";

export function Hero3DLogoScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile / low-end device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
  }, []);

  useEffect(() => {
    // Skip Three.js entirely on mobile for performance
    if (isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    // Dynamically import Three.js only on desktop
    let cleanup: (() => void) | undefined;

    import("three").then((THREE) => {
      if (!container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 7;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);

      // Logo texture
      const textureLoader = new THREE.TextureLoader();
      const logoTexture = textureLoader.load("/images/webbheads-logo-transparent.png");

      const logoGeometry = new THREE.PlaneGeometry(3.4, 3.4);
      const logoMaterial = new THREE.MeshStandardMaterial({
        map: logoTexture,
        transparent: true,
        alphaTest: 0.05,
        side: THREE.DoubleSide,
        emissive: 0xffffff,
        emissiveIntensity: 0.25,
        roughness: 0.1,
        metalness: 0.1,
      });
      const logoMesh = new THREE.Mesh(logoGeometry, logoMaterial);
      scene.add(logoMesh);

      // Reduced particle count for performance
      const particleCount = 100;
      const particleGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const c1 = new THREE.Color(0xffffff);
      const c2 = new THREE.Color(0xfca69a);
      const c3 = new THREE.Color(0xf43f5e);

      for (let i = 0; i < particleCount; i++) {
        const radius = 2.4 + Math.random() * 2.2;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI;

        positions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
        positions[i * 3 + 1] = radius * Math.sin(phi);
        positions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

        const col = i % 3 === 0 ? c1 : i % 3 === 1 ? c2 : c3;
        colors[i * 3] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;
      }

      particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
      });
      const particlePoints = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particlePoints);

      // Lighting
      const light1 = new THREE.PointLight(0xffffff, 4, 20);
      light1.position.set(4, 4, 5);
      scene.add(light1);

      const light2 = new THREE.PointLight(0xfca69a, 2, 20);
      light2.position.set(-4, -4, 5);
      scene.add(light2);

      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      scene.add(ambientLight);

      // Animation Loop
      let animationFrameId: number;
      const clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        logoMesh.position.y = Math.sin(elapsedTime * 2.2) * 0.28;
        logoMesh.rotation.y = 0;
        logoMesh.rotation.x = 0;

        particlePoints.rotation.y += 0.0015;

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener("resize", handleResize);

      cleanup = () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationFrameId);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    });

    return () => {
      cleanup?.();
    };
  }, [isMobile]);

  // Mobile: simple CSS animated logo fallback
  if (isMobile) {
    return (
      <div
        className="relative w-full h-[280px] flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <img
          src="/images/webbheads-logo-transparent.png"
          alt=""
          className="w-32 h-32 object-contain opacity-70"
          style={{
            animation: "logoFloat3D 6s ease-in-out infinite",
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[460px] lg:h-[520px] pointer-events-none flex items-center justify-center"
      aria-hidden="true"
    />
  );
}
