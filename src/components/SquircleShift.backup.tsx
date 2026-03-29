"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import "./squircle-shift.css";

export interface SquircleShiftProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  speed?: number;
  colorLayers?: number;
  gridFrequency?: number;
  gridIntensity?: number;
  waveSpeed?: number;
  waveIntensity?: number;
  spiralIntensity?: number;
  lineThickness?: number;
  falloff?: number;
  centerX?: number;
  centerY?: number;
  colorTint?: string;
  colorTintSecondary?: string;
  brightness?: number;
  phaseOffset?: number;
  logoMask?: string;
}

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_speed;
uniform int u_colorLayers;
uniform float u_gridFrequency;
uniform float u_gridIntensity;
uniform float u_waveSpeed;
uniform float u_waveIntensity;
uniform float u_spiralIntensity;
uniform float u_lineThickness;
uniform float u_falloff;
uniform float u_centerX;
uniform float u_centerY;
uniform vec3 u_colorTint;
uniform vec3 u_colorTintSecondary;
uniform float u_brightness;
uniform float u_phaseOffset;
uniform sampler2D u_logoMask;
uniform bool u_useLogoMask;

varying vec2 vUv;

// Hash function for pseudo-random selection
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

// Smooth minimum function for blending
float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

// Simplified Kensho elements using box with rounded corners
float sdBox(vec2 p, vec2 b, float r) {
  vec2 d = abs(p) - b + r;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - r;
}

// Kensho Element 1: Vertical with angled top-right corner
float kenshoElement1(vec2 p) {
  vec2 size = vec2(0.04, 0.07);
  float r = 0.012;
  float base = sdBox(p, size, r);

  // Simple cut for top-right corner
  float cut = -dot(p - vec2(size.x * 0.6, size.y * 0.6), normalize(vec2(1.0, 1.0))) - 0.02;
  return max(base, cut);
}

// Kensho Element 2: Horizontal with angled bottom-left corner
float kenshoElement2(vec2 p) {
  vec2 size = vec2(0.08, 0.05);
  float r = 0.012;
  float base = sdBox(p, size, r);

  // Simple cut for bottom-left corner
  float cut = -dot(p - vec2(-size.x * 0.6, -size.y * 0.6), normalize(vec2(-1.0, -1.0))) - 0.02;
  return max(base, cut);
}

// Kensho Element 3: Vertical with angled top-left corner
float kenshoElement3(vec2 p) {
  vec2 size = vec2(0.04, 0.07);
  float r = 0.012;
  float base = sdBox(p, size, r);

  // Simple cut for top-left corner
  float cut = -dot(p - vec2(-size.x * 0.6, size.y * 0.6), normalize(vec2(-1.0, 1.0))) - 0.02;
  return max(base, cut);
}

// Kensho Element 4: Horizontal with angled bottom-right corner
float kenshoElement4(vec2 p) {
  vec2 size = vec2(0.08, 0.05);
  float r = 0.012;
  float base = sdBox(p, size, r);

  // Simple cut for bottom-right corner
  float cut = -dot(p - vec2(size.x * 0.6, -size.y * 0.6), normalize(vec2(1.0, -1.0))) - 0.02;
  return max(base, cut);
}

// Select one of the 4 Kensho elements based on grid position
float kenshoDistance(vec2 gridPos, vec2 cellPos) {
  float h = hash(floor(gridPos));

  if (h < 0.25) return kenshoElement1(cellPos);
  else if (h < 0.5) return kenshoElement2(cellPos);
  else if (h < 0.75) return kenshoElement3(cellPos);
  else return kenshoElement4(cellPos);
}

void main() {
  float animTime = u_time * u_speed;
  vec2 resolution = u_resolution;

  vec3 colorAccum = vec3(0.0);
  float dist = 0.0;
  float depth = animTime;

  for (int layer = 0; layer < 3; layer++) {
    if (layer >= u_colorLayers) break;

    vec2 normalizedPos = vUv;
    vec2 centeredPos = vUv;
    centeredPos.x *= resolution.x / resolution.y;
    centeredPos -= vec2(u_centerX, u_centerY);

    depth += 0.05;

    // Always use radial distance from center for wave effects
    dist = length(centeredPos);

    float horizontalWave = sin(centeredPos.x * u_gridFrequency + depth);
    float verticalWave = cos(centeredPos.y * u_gridFrequency + depth + u_phaseOffset);
    float gridPattern = u_gridIntensity * horizontalWave * verticalWave;

    float oscillation = sin(depth) + 1.0;
    float radialPulse = abs(sin(dist * 7.0 - depth * u_waveSpeed));
    float waveDisplacement = oscillation * radialPulse * u_waveIntensity;

    normalizedPos += (centeredPos / max(dist, 0.001)) * waveDisplacement * gridPattern;
    normalizedPos = fract(normalizedPos);

    float polarAngle = atan(centeredPos.y, centeredPos.x);
    float polarRadius = dist * 2.0;
    vec2 spiralOffset = vec2(
      cos(polarAngle * polarRadius - depth),
      sin(polarAngle * polarRadius - depth)
    ) * gridPattern * u_spiralIntensity;
    normalizedPos += spiralOffset;

    vec2 gridCell = fract(normalizedPos) - 0.5;

    // Original React Bits Pro logic
    float intensity = u_lineThickness / length(gridCell);

    if (layer == 0) colorAccum.r = intensity;
    else if (layer == 1) colorAccum.g = intensity;
    else colorAccum.b = intensity;
  }

  colorAccum = colorAccum / (dist + u_falloff);

  colorAccum *= u_brightness;
  float gradMix = smoothstep(0.2, 0.88, vUv.x);
  vec3 gradientTint = mix(u_colorTint, u_colorTintSecondary, gradMix);
  vec3 tintedColor = colorAccum * gradientTint;
  float alpha = clamp(length(colorAccum) * 0.42, 0.0, 1.0);

  gl_FragColor = vec4(tintedColor, alpha);
}
`;

interface ShaderPlaneProps {
  speed: number;
  colorLayers: number;
  gridFrequency: number;
  gridIntensity: number;
  waveSpeed: number;
  waveIntensity: number;
  spiralIntensity: number;
  lineThickness: number;
  falloff: number;
  centerX: number;
  centerY: number;
  colorTint: string;
  colorTintSecondary: string;
  brightness: number;
  phaseOffset: number;
  isVisible: boolean;
  logoMask?: string;
}

function ShaderPlane({
  speed,
  colorLayers,
  gridFrequency,
  gridIntensity,
  waveSpeed,
  waveIntensity,
  spiralIntensity,
  lineThickness,
  falloff,
  centerX,
  centerY,
  colorTint,
  colorTintSecondary,
  brightness,
  phaseOffset,
  isVisible,
  logoMask,
}: ShaderPlaneProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(viewport.width * 50, viewport.height * 50) },
      u_speed: { value: speed },
      u_colorLayers: { value: colorLayers },
      u_gridFrequency: { value: gridFrequency },
      u_gridIntensity: { value: gridIntensity },
      u_waveSpeed: { value: waveSpeed },
      u_waveIntensity: { value: waveIntensity },
      u_spiralIntensity: { value: spiralIntensity },
      u_lineThickness: { value: lineThickness },
      u_falloff: { value: falloff },
      u_centerX: { value: centerX },
      u_centerY: { value: centerY },
      u_colorTint: { value: new THREE.Color(colorTint) },
      u_colorTintSecondary: { value: new THREE.Color(colorTintSecondary) },
      u_brightness: { value: brightness },
      u_phaseOffset: { value: phaseOffset },
      u_logoMask: { value: null },
      u_useLogoMask: { value: !!logoMask },
    }),
    [logoMask]
  );

  useFrame((state) => {
    if (!materialRef.current || !isVisible) return;
    const u = materialRef.current.uniforms;
    u.u_time.value = state.clock.elapsedTime;
    u.u_resolution.value.set(viewport.width * 50, viewport.height * 50);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function SquircleShift({
  width = "100%",
  height = "100%",
  className,
  speed = 0.3,
  colorLayers = 3,
  gridFrequency = 25,
  gridIntensity = 1,
  waveSpeed = 0.2,
  waveIntensity = 0.1,
  spiralIntensity = 1,
  lineThickness = 0.06,
  falloff = 1,
  centerX = 1,
  centerY = 1,
  colorTint = "#FEB180",
  colorTintSecondary = "#D4FFEF",
  brightness = 1.4,
  phaseOffset = 10,
  logoMask,
}: SquircleShiftProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const widthStyle = typeof width === "number" ? `${width}px` : width;
  const heightStyle = typeof height === "number" ? `${height}px` : height;
  const containerClassName = className ? `squircle-shift-container ${className}` : "squircle-shift-container";

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dpr = useMemo(() => {
    if (typeof window === "undefined") return 1;
    return Math.min(window.devicePixelRatio, 1.5);
  }, []);

  return (
    <div ref={containerRef} className={containerClassName} style={{ width: widthStyle, height: heightStyle }}>
      {isVisible && (
        <Canvas
          className="squircle-shift-canvas"
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 1], fov: 75 }}
          dpr={dpr}
          frameloop="always"
        >
          <ShaderPlane
            speed={speed}
            colorLayers={colorLayers}
            gridFrequency={gridFrequency}
            gridIntensity={gridIntensity}
            waveSpeed={waveSpeed}
            waveIntensity={waveIntensity}
            spiralIntensity={spiralIntensity}
            lineThickness={lineThickness}
            falloff={falloff}
            centerX={centerX}
            centerY={centerY}
            colorTint={colorTint}
            colorTintSecondary={colorTintSecondary}
            brightness={brightness}
            phaseOffset={phaseOffset}
            isVisible={isVisible}
            logoMask={logoMask}
          />
        </Canvas>
      )}
    </div>
  );
}
