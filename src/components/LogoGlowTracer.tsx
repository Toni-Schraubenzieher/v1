"use client";

import { useEffect, useRef, useState } from "react";

export interface LogoGlowTracerProps {
  width?: number;
  height?: number;
  speed?: number;
  glowSize?: number;
  trailLength?: number;
  className?: string;
}

export default function LogoGlowTracer({
  width = 600,
  height = 600,
  speed = 1,
  glowSize = 20,
  trailLength = 30,
  className = "",
}: LogoGlowTracerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [pathPoints, setPathPoints] = useState<{ x: number; y: number }[]>([]);

  // Extract path points from SVG
  useEffect(() => {
    if (!svgRef.current) return;

    const paths = svgRef.current.querySelectorAll("path");
    const allPoints: { x: number; y: number }[] = [];

    paths.forEach((path) => {
      const length = path.getTotalLength();
      const segments = Math.ceil(length / 2); // Point every 2px

      for (let i = 0; i <= segments; i++) {
        const point = path.getPointAtLength((i / segments) * length);
        allPoints.push({ x: point.x, y: point.y });
      }
    });

    setPathPoints(allPoints);
  }, []);

  // Animate particle
  useEffect(() => {
    if (!canvasRef.current || pathPoints.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    let currentIndex = 0;
    let animationFrame: number;

    const animate = () => {
      // Clear with fade effect
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, width, height);

      // Switch to additive blending for glow
      ctx.globalCompositeOperation = "lighter";

      // Scale factor to fit SVG viewBox (332x336) to canvas
      const scaleX = width / 332;
      const scaleY = height / 336;

      // Current particle position
      const currentPoint = pathPoints[currentIndex];
      const x = currentPoint.x * scaleX;
      const y = currentPoint.y * scaleY;

      // Draw trail (comet tail effect)
      for (let i = 0; i < trailLength; i++) {
        const trailIndex = (currentIndex - i + pathPoints.length) % pathPoints.length;
        const trailPoint = pathPoints[trailIndex];
        const tx = trailPoint.x * scaleX;
        const ty = trailPoint.y * scaleY;

        const alpha = 1 - i / trailLength;
        const size = glowSize * alpha;

        // Blue tail
        const gradient = ctx.createRadialGradient(tx, ty, 0, tx, ty, size);
        gradient.addColorStop(0, `rgba(100, 200, 255, ${alpha * 0.8})`);
        gradient.addColorStop(0.5, `rgba(100, 200, 255, ${alpha * 0.3})`);
        gradient.addColorStop(1, "rgba(100, 200, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(tx, ty, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw main particle (warm white/orange core)
      const coreGradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
      coreGradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      coreGradient.addColorStop(0.3, "rgba(255, 180, 128, 0.9)");
      coreGradient.addColorStop(0.6, "rgba(254, 177, 128, 0.5)");
      coreGradient.addColorStop(1, "rgba(254, 177, 128, 0)");

      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(x, y, glowSize, 0, Math.PI * 2);
      ctx.fill();

      // Move to next point
      currentIndex = (currentIndex + Math.ceil(speed)) % pathPoints.length;

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [pathPoints, width, height, speed, glowSize, trailLength]);

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* Hidden SVG for path extraction */}
      <svg
        ref={svgRef}
        width="332"
        height="336"
        viewBox="0 0 332 336"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute opacity-0 pointer-events-none"
      >
        <path d="M156.97 157.303C155.235 157.77 153.384 157.27 152.119 155.994L124.974 128.596C123.748 127.359 123.254 125.573 123.671 123.881L153.227 3.86212C153.777 1.62797 155.781 0.0577393 158.082 0.0577393H326C328.761 0.0577393 331 2.29632 331 5.05774V106.678C331 108.939 329.482 110.919 327.298 111.506L156.97 157.303Z" />
        <path d="M157.576 179.745C155.803 179.286 153.92 179.833 152.669 181.172L123.899 211.958C122.718 213.222 122.274 215.006 122.726 216.676L153.7 331.304C154.289 333.485 156.268 335 158.527 335H327C329.761 335 332 332.761 332 330V228.795C332 226.517 330.459 224.527 328.254 223.955L157.576 179.745Z" />
        <path d="M3.74524 194.825C1.53998 195.397 0 197.387 0 199.665V331C0 333.761 2.23858 336 5 336H66.6299C68.9595 336 70.9804 334.391 71.5027 332.121L98.3725 215.319C98.7624 213.624 98.2436 211.848 97.0027 210.63L66.8056 180.982C65.553 179.752 63.7472 179.269 62.0479 179.71L3.74524 194.825Z" />
        <path d="M99.3148 122.618C99.7395 124.332 99.2287 126.143 97.9709 127.383L71.0138 153.944C69.725 155.214 67.8507 155.688 66.1129 155.185L4.60845 137.363C2.47089 136.744 1 134.786 1 132.561V5C1 2.23858 3.23858 0 6 0H65.0148C67.3129 0 69.3151 1.56658 69.868 3.79726L99.3148 122.618Z" />
      </svg>

      {/* Canvas for particle animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
