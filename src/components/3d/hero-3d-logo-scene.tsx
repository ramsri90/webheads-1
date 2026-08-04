"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function Hero3DLogoScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Texture Loader for WebbHeads Pure White Logo
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load("/images/webbheads-logo-black.png");

    // 2. 3D Logo Emblem (Teal Emissive Material)
    const logoGeometry = new THREE.PlaneGeometry(3.4, 3.4);
    const logoMaterial = new THREE.MeshStandardMaterial({
      map: logoTexture,
      transparent: true,
      alphaTest: 0.05,
      side: THREE.DoubleSide,
      emissive: 0x0d9488,
      emissiveIntensity: 0.35,
      roughness: 0.1,
      metalness: 0.1,
    });
    const logoMesh = new THREE.Mesh(logoGeometry, logoMaterial);
    scene.add(logoMesh);

    // 3. Orbiting 3D Particle Starfield
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x0d9488); // teal
    const c2 = new THREE.Color(0x2dd4bf); // light teal
    const c3 = new THREE.Color(0x0891b2); // cyan

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

    // 4. Pure Bright Lighting
    const light1 = new THREE.PointLight(0xffffff, 4, 20);
    light1.position.set(4, 4, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x2dd4bf, 2, 20);
    light2.position.set(-4, -4, 5);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Mouse Pointer Tilt Physics
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.0008;
      mouseY = (e.clientY - windowHalfY) * 0.0008;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Gentle Bouncing Animation (Only Y-axis hover, no rotation)
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

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[460px] lg:h-[520px] pointer-events-none flex items-center justify-center"
      aria-hidden="true"
    />
  );
}
