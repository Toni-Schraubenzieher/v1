"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function SplitText({ children }: { children: string }) {
  return (
    <>
      {children.split(" ").map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => (
            <span key={ci} className="char inline-block">
              {char}
            </span>
          ))}
          {wi < children.split(" ").length - 1 && (
            <span className="char inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </>
  );
}

export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current || !sectionRef.current || !contentRef.current) return;

    const chars = titleRef.current.querySelectorAll(".char");

    gsap.fromTo(
      chars,
      {
        willChange: "transform",
        transformOrigin: "50% 100%",
        scaleY: 0,
      },
      {
        ease: "power3.in",
        opacity: 1,
        scaleY: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          scrub: true,
          pin: contentRef.current,
          anticipatePin: 1,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      <div
        ref={contentRef}
        className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-6 sm:px-12 lg:px-24"
      >
        <h2
          ref={titleRef}
          className="text-center font-heading text-[clamp(2.5rem,7vw,7rem)] font-bold leading-[1.1] tracking-tight text-white max-w-[1200px]"
        >
          <span className="block"><SplitText>Conviction first.</SplitText></span>
          <span className="block"><SplitText>Capital second.</SplitText></span>
        </h2>
      </div>
    </section>
  );
}
