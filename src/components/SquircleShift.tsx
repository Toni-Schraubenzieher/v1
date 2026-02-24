"use client";

import React, { useMemo, useRef } from "react";
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
  brightness?: number;
  phaseOffset?: number;
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
uniform float u_brightness;
uniform float u_phaseOffset;

varying vec2 vUv;

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
    float intensity = u_lineThickness / length(gridCell);

    if (layer == 0) colorAccum.r = intensity;
    else if (layer == 1) colorAccum.g = intensity;
    else colorAccum.b = intensity;
  }

  colorAccum = colorAccum / (dist + u_falloff);
  colorAccum *= u_brightness;
  vec3 tintedColor = colorAccum * u_colorTint;
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
  brightness: number;
  phaseOffset: number;
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
  brightness,
  phaseOffset,
}: ShaderPlaneProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(viewport.width * 100, viewport.height * 100) },
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
      u_brightness: { value: brightness },
      u_phaseOffset: { value: phaseOffset },
    }),
    []
  );

  useFrame((state) => {
    if (!materialRef.current) return;
    const uniformsCurrent = materialRef.current.uniforms;
    uniformsCurrent.u_time.value = state.clock.elapsedTime;
    uniformsCurrent.u_resolution.value.set(viewport.width * 100, viewport.height * 100);
    uniformsCurrent.u_speed.value = speed;
    uniformsCurrent.u_colorLayers.value = colorLayers;
    uniformsCurrent.u_gridFrequency.value = gridFrequency;
    uniformsCurrent.u_gridIntensity.value = gridIntensity;
    uniformsCurrent.u_waveSpeed.value = waveSpeed;
    uniformsCurrent.u_waveIntensity.value = waveIntensity;
    uniformsCurrent.u_spiralIntensity.value = spiralIntensity;
    uniformsCurrent.u_lineThickness.value = lineThickness;
    uniformsCurrent.u_falloff.value = falloff;
    uniformsCurrent.u_centerX.value = centerX;
    uniformsCurrent.u_centerY.value = centerY;
    uniformsCurrent.u_colorTint.value.set(colorTint);
    uniformsCurrent.u_brightness.value = brightness;
    uniformsCurrent.u_phaseOffset.value = phaseOffset;
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
  brightness = 1.4,
  phaseOffset = 10,
}: SquircleShiftProps) {
  const widthStyle = typeof width === "number" ? `${width}px` : width;
  const heightStyle = typeof height === "number" ? `${height}px` : height;
  const containerClassName = className ? `squircle-shift-container ${className}` : "squircle-shift-container";

  return (
    <div className={containerClassName} style={{ width: widthStyle, height: heightStyle }}>
      <Canvas className="squircle-shift-canvas" gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 1], fov: 75 }}>
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
          brightness={brightness}
          phaseOffset={phaseOffset}
        />
      </Canvas>
    </div>
  );
}
