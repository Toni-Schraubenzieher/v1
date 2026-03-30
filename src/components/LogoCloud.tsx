"use client";

import { BlurredInfiniteSlider } from "@/components/ui/infinite-slider";
import Image from "next/image";

const LOGOS = [
  { src: "/Logo_Loop/Quality_Match.svg", alt: "Quality Match", height: 22 },
  { src: "/Logo_Loop/CryptoNext.svg", alt: "CryptoNext", height: 22 },
  { src: "/Logo_Loop/Energy_Robotics.svg", alt: "Energy Robotics", height: 22 },
  { src: "/Logo_Loop/Hefring.svg", alt: "Hefring", height: 22 },
  { src: "/Logo_Loop/Pixel_Photonics.svg", alt: "Pixel Photonics", height: 22 },
];

export default function LogoCloud() {
  return (
    <section className="overflow-hidden py-10 px-4">
      <div className="mx-auto max-w-[82.5rem]">
        <div className="flex flex-col items-center md:flex-row">
          <div className="flex-shrink-0 text-center md:text-right md:max-w-44 md:border-r md:border-foreground/15 md:pr-6">
            <p className="text-sm text-black/50">
              Powering the next generation
            </p>
          </div>

          <div className="w-full py-6 md:w-auto md:flex-1">
            <BlurredInfiniteSlider
              speedOnHover={20}
              speed={40}
              gap={112}
              fadeWidth={80}
            >
              {LOGOS.map((logo) => (
                <div key={logo.src} className="flex items-center">
                  <Image
                    className="mx-auto w-fit opacity-50 hover:opacity-80 transition-opacity"
                    src={logo.src}
                    alt={logo.alt}
                    width={120}
                    height={logo.height}
                    style={{ height: `${logo.height / 16}rem`, width: "auto" }}
                  />
                </div>
              ))}
            </BlurredInfiniteSlider>
          </div>
        </div>
      </div>
    </section>
  );
}
