"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function Hero3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobileWidth = window.innerWidth < 768;
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsMobile(mobileWidth && isTouch);
    };

    checkMobile();
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    container.appendChild(renderer.domElement);

    const torusGeometry = new THREE.TorusKnotGeometry(1.6, 0.45, 64, 16);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      wireframe: true,
      emissive: 0x9f1239,
      roughness: 0.2,
      metalness: 0.8,
    });
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torusMesh);

    const coreGeometry = new THREE.IcosahedronGeometry(0.9, 1);
    const coreMaterial = new THREE.MeshPhongMaterial({
      color: 0xfca69a,
      emissive: 0xe11d48,
      shininess: 80,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);

    const particleCount = 80;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0xf43f5e);
    const color2 = new THREE.Color(0x6366f1);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.8 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      positions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      positions[i * 3 + 1] = radius * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

      const mixedColor = i % 2 === 0 ? color1 : color2;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });
    const particlePoints = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particlePoints);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xf43f5e, 2, 20);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    let isVisible = true;
    let animationFrameId: number | null = null;

    const animate = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      torusMesh.rotation.x += 0.006;
      torusMesh.rotation.y += 0.008;

      coreMesh.rotation.x -= 0.004;
      coreMesh.rotation.y -= 0.006;

      particlePoints.rotation.y += 0.002;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasVisible = isVisible;
          isVisible = entry.isIntersecting;
          if (isVisible && !wasVisible && animationFrameId === null) {
            animate();
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }

      torusGeometry.dispose();
      torusMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <div className="relative w-full h-[280px] flex items-center justify-center pointer-events-none" aria-hidden="true" />
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320px] sm:h-[420px] lg:h-[480px] pointer-events-none flex items-center justify-center"
      aria-hidden="true"
    />
  );
}
