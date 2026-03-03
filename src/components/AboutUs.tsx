"use client";

import { useRef, useEffect, useState } from "react";
import { animate, motion, useAnimationFrame, useMotionValue } from "motion/react";
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
type TeamCarouselItem =
  | {
      type: "label";
      id: string;
      label: string;
      color: string;
    }
  | {
      type: "member";
      member: TeamMember;
    };

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
    image: "/Team/Anton_Apricot.png",
    accent: "#FEB180",
  },
  {
    id: "maya",
    name: "Maya",
    role: "Investment Principal",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=900&h=1300&fit=crop",
    accent: "#D4FFEF",
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
    accent: "#D4FFEF",
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
  const jumpAnimationRef = useRef<ReturnType<typeof animate> | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const baseCarouselItems: TeamCarouselItem[] = [
    { type: "label", id: "core-team", label: "CORE-TEAM", color: "#FEB180" },
    { type: "member", member: team[0]! },
    { type: "member", member: team[1]! },
    { type: "label", id: "advisor", label: "ADVISORS", color: "#D4FFEF" },
    { type: "member", member: team[2]! },
    { type: "member", member: team[3]! },
    { type: "member", member: team[4]! },
  ];
  const carouselItems = [
    ...baseCarouselItems,
    ...baseCarouselItems,
    ...baseCarouselItems,
    ...baseCarouselItems,
  ];

  const getCarouselDimensions = () => {
    const isMobile = window.innerWidth < 640;
    const isDesktop = window.innerWidth >= 1024;
    return {
      memberWidth: isMobile ? 250 : isDesktop ? 300 : 280,
      labelWidth: isMobile ? 125 : isDesktop ? 150 : 140,
      gap: 20,
      horizontalPadding: isMobile ? 24 : 32,
    };
  };

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
      const { memberWidth, labelWidth, gap } = getCarouselDimensions();
      const width = (memberWidth + gap) * team.length + (labelWidth + gap) * 2;
      setOneSetWidth(width);
      baseX.set(0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [baseX]);

  const jumpCarouselForward = (label: "core-team" | "advisor", clickedIndex: number) => {
    const { memberWidth, labelWidth, gap, horizontalPadding } = getCarouselDimensions();
    const cardsInGroup = label === "advisor" ? 3 : 2;

    let offsetBeforeGroup = horizontalPadding;
    const groupStartIndex = clickedIndex + 1;
    for (let i = 0; i < groupStartIndex; i += 1) {
      const item = carouselItems[i];
      if (!item) continue;
      const width = item.type === "member" ? memberWidth : labelWidth;
      offsetBeforeGroup += width + gap;
    }

    const groupWidth = cardsInGroup * memberWidth + (cardsInGroup - 1) * gap;
    const groupCenterX = offsetBeforeGroup + groupWidth / 2;
    const viewportCenterX = window.innerWidth / 2;
    const targetX = viewportCenterX - groupCenterX;

    setIsDragging(true);
    jumpAnimationRef.current?.stop();
    jumpAnimationRef.current = animate(baseX, targetX, {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => {
        setIsDragging(false);
        scrollVelocity.current = baseVelocity;
      },
    });
  };

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
            onDragStart={() => {
              jumpAnimationRef.current?.stop();
              setIsDragging(true);
            }}
            onDragEnd={(_, info) => {
              setIsDragging(false);
              scrollVelocity.current = info.velocity.x;
            }}
          >
            {carouselItems.map((item, index) => (
              <motion.div
                key={`${item.type === "member" ? item.member.id : item.id}-${index}`}
                className={
                  item.type === "member"
                    ? "modal-card team-scroll-card w-[250px] shrink-0 sm:w-[280px] lg:w-[300px]"
                    : "team-scroll-card relative flex h-[375px] w-[125px] shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-[#101010]/0 sm:h-[420px] sm:w-[140px] lg:h-[450px] lg:w-[150px]"
                }
                animate={
                  item.type === "member" && hoveredId === `${item.member.id}-${index}`
                    ? { scale: 1.03, y: -8 }
                    : { scale: 1, y: 0 }
                }
                transition={{ duration: 0.25, ease: "easeOut" }}
                onMouseEnter={() => {
                  setHoveredId(
                    item.type === "member" ? `${item.member.id}-${index}` : `${item.id}-${index}`
                  );
                }}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => {
                  if (item.type === "label") {
                    jumpCarouselForward(item.id === "core-team" ? "core-team" : "advisor", index);
                  }
                }}
              >
                {item.type === "member" ? (
                  <>
                    <img
                      src={item.member.image}
                      alt={item.member.name}
                      className="modal-card-image"
                      draggable="false"
                    />
                    <div className="modal-card-overlay">
                      <div className="modal-card-content">
                        <div>
                          <h3 className="modal-card-title">{item.member.name}</h3>
                          <p className="modal-card-subtitle">{item.member.role}</p>
                        </div>
                        <div
                          className="modal-card-icon"
                          style={{ color: item.member.accent }}
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
                  </>
                ) : (
                  <>
                    <p
                      className="relative z-10 px-1 text-center font-heading text-[1.45rem] font-black uppercase tracking-[0.14em] [writing-mode:vertical-rl] rotate-180 sm:text-[1.65rem]"
                      style={{ color: item.color }}
                    >
                      {item.label}
                    </p>
                    <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center pb-5">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/12 backdrop-blur-md"
                        style={{
                          color:
                            hoveredId === `${item.id}-${index}` ? "#101010" : item.color,
                          backgroundColor:
                            hoveredId === `${item.id}-${index}` ? item.color : undefined,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M7 17L17 7M17 7H9M17 7V15"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
