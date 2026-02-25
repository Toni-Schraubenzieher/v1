"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./modal-cards.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  accent: string;
}

const team: TeamMember[] = [
  {
    id: "wolfgang",
    name: "Wolfgang",
    role: "Managing Partner",
    image: "/Team/Wolfgang.png",
    accent: "#FEB180",
  },
  {
    id: "anton",
    name: "Anton",
    role: "Partner",
    image: "/Team/Anton.png",
    accent: "#D4FFEF",
  },
  {
    id: "maya",
    name: "Maya",
    role: "Investment Principal",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=900&h=1300&fit=crop",
    accent: "#FEB180",
  },
  {
    id: "luca",
    name: "Luca",
    role: "Platform Lead",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&h=1300&fit=crop",
    accent: "#D4FFEF",
  },
  {
    id: "sofia",
    name: "Sofia",
    role: "Portfolio Operations",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&h=1300&fit=crop",
    accent: "#FEB180",
  },
];

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [oneSetWidth, setOneSetWidth] = useState(0);
  const baseVelocity = -18;
  const baseX = useMotionValue(0);
  const scrollVelocity = useRef(baseVelocity);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const carouselItems = [...team, ...team, ...team, ...team];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
              end: "top 55%",
              scrub: 1,
            },
          }
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              end: "top 55%",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 640;
      const itemWidth = isMobile ? 250 : 300;
      const gap = 20;
      const width = (itemWidth + gap) * team.length;
      setOneSetWidth(width);
      baseX.set(0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [baseX]);

  useAnimationFrame((_, delta) => {
    if (!oneSetWidth || isDragging) return;

    scrollVelocity.current = scrollVelocity.current * 0.9 + baseVelocity * 0.1;
    const moveBy = scrollVelocity.current * (delta / 1000);
    baseX.set(baseX.get() + moveBy);

    const x = baseX.get();
    if (x <= -oneSetWidth * 2) {
      baseX.set(x + oneSetWidth);
    } else if (x > 0) {
      baseX.set(x - oneSetWidth);
    }
  });

  return (
    <section
      ref={sectionRef}
      id="team"
      className="about-us py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        {/* Label */}
        <div className="mb-12 flex items-center gap-3 lg:mb-16">
          <span className="h-2.5 w-2.5 rounded-full bg-accent-mint animate-pulse" />
          <span className="text-sm font-medium uppercase tracking-[0.16em] text-white/50">
            Team
          </span>
        </div>

        {/* Big statement */}
        <h2
          ref={headingRef}
          className="mb-16 max-w-[900px] font-heading text-[clamp(2rem,5.5vw,5.5rem)] font-bold uppercase leading-[1.05] tracking-tight text-white lg:mb-20"
        >
          We back founders
          who build what
          the world needs
          next.
        </h2>

        {/* Infinite team carousel */}
        <div
          ref={cardsRef}
          className="relative left-1/2 w-screen -translate-x-1/2 overflow-x-hidden overflow-y-visible py-6"
        >
          <motion.div
            ref={scrollerRef}
            className="flex cursor-grab items-end gap-5 px-6 active:cursor-grabbing sm:px-8"
            style={{ x: baseX }}
            drag="x"
            dragElastic={0.04}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(_, info) => {
              setIsDragging(false);
              scrollVelocity.current = info.velocity.x;
            }}
          >
            {carouselItems.map((member, index) => (
              <motion.div
                key={`${member.id}-${index}`}
                className="modal-card team-scroll-card w-[250px] shrink-0 sm:w-[280px] lg:w-[300px]"
                animate={
                  hoveredId === `${member.id}-${index}`
                    ? { scale: 1.03, y: -8 }
                    : { scale: 1, y: 0 }
                }
                transition={{ duration: 0.25, ease: "easeOut" }}
                onMouseEnter={() => setHoveredId(`${member.id}-${index}`)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="modal-card-image"
                  draggable="false"
                />
                <div className="modal-card-overlay">
                  <div className="modal-card-content">
                    <div>
                      <h3 className="modal-card-title">{member.name}</h3>
                      <p className="modal-card-subtitle">{member.role}</p>
                    </div>
                    <div
                      className="modal-card-icon"
                      style={{ color: member.accent }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M8 3V13M3 8H13"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
