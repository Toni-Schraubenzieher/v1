"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
    </svg>
  );
}

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      const cards = gridRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="who-we-are"
      className="who-we-are py-24 lg:py-32"
    >
      <div className="max-w-[1320px] mx-auto px-6 sm:px-8">
        <div ref={headerRef} className="mb-12 lg:mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold tracking-tight text-white">
            Trusted by industry leaders
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:grid-rows-[minmax(220px,auto)_minmax(220px,auto)_minmax(180px,auto)]"
        >
          {/* Column 1: Two stacked image cards */}
          <div className="row-span-2 flex flex-col gap-4">
            <div className="relative flex-1 w-full overflow-hidden rounded-2xl bg-[#101010] flex items-center justify-center min-h-[200px]">
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-accent-warm/20 mx-auto mb-4 flex items-center justify-center">
                  <span className="font-heading text-2xl font-bold text-accent-warm">K</span>
                </div>
                <p className="text-white/50 text-sm">Founded 2022</p>
              </div>
            </div>
            <div className="relative flex-1 w-full overflow-hidden rounded-2xl bg-[#101010] flex items-center justify-center min-h-[200px]">
              <div className="text-center p-6">
                <p className="font-heading text-4xl font-bold text-white">30+</p>
                <p className="text-white/50 text-sm mt-1">Countries in our network</p>
              </div>
            </div>
          </div>

          {/* Column 2-3: Quote card */}
          <div className="lg:col-span-2 row-span-2 bg-[#101010] rounded-2xl p-8 flex flex-col">
            <div>
              <QuoteIcon className="w-10 h-10 text-white/20 mb-6" />
              <blockquote className="text-2xl lg:text-3xl font-medium leading-snug text-white">
                Kensho&apos;s conviction and speed were game-changing. They believed in us before anyone else did.
              </blockquote>
              <div className="mt-6">
                <p className="font-semibold text-white">Sarah Mitchell</p>
                <p className="text-sm text-white/50">CEO, NeuralPath</p>
              </div>
            </div>
            <div className="flex items-center mt-auto pt-8">
              <span className="text-xl font-heading font-semibold text-white">
                NeuralPath
              </span>
            </div>
          </div>

          {/* Column 4: Two stat cards */}
          <div className="bg-[#101010] rounded-2xl p-6 flex flex-col">
            <div className="flex-1">
              <p className="text-3xl font-heading font-bold text-white">
                $120M
              </p>
              <p className="text-sm text-white/50 mt-1">
                Assets Under Management
              </p>
            </div>
          </div>

          <div className="bg-[#101010] rounded-2xl p-6 flex flex-col">
            <div className="flex-1">
              <p className="text-3xl font-heading font-bold text-accent-mint">
                6x
              </p>
              <p className="text-sm text-white/50 mt-1">
                Average Portfolio Return
              </p>
            </div>
          </div>

          {/* Bottom row: stats card + mission card */}
          <div className="bg-[#101010] rounded-2xl p-8 flex flex-col">
            <div className="flex-1">
              <p className="text-3xl lg:text-4xl font-heading font-bold text-white">
                40+
              </p>
              <p className="text-white/50 mt-2">
                Portfolio Companies
                <br />
                Worldwide
              </p>
            </div>
            <div className="mt-auto pt-6">
              <p className="text-sm font-medium text-accent-warm">
                Seed & Pre-Seed Focus
              </p>
            </div>
          </div>

          <div className="lg:col-span-3 bg-[#101010] rounded-2xl p-8 flex flex-col">
            <p className="text-xl lg:text-2xl font-medium leading-relaxed text-white max-w-3xl flex-1">
              We partner with visionary founders at the earliest stages, providing capital, 
              strategic guidance, and access to our global network to build category-defining companies.
            </p>
            <div className="flex items-center mt-auto pt-6">
              <span className="text-xl font-heading font-semibold text-white">
                Our Mission
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
