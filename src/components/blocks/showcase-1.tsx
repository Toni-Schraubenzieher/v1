"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ShowcaseItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

export function Showcase1() {
  const [activeId, setActiveId] = useState(1);

  const items: ShowcaseItem[] = [
    {
      id: 1,
      title: "Robotics",
      subtitle: "We source exceptional founders through our global network.",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=800&fit=crop",
    },
    {
      id: 2,
      title: "Enabling Technologies",
      subtitle: "Deep diligence on team, product, market, and conviction fit.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=800&fit=crop",
    },
    {
      id: 3,
      title: "Cybersecurity / Dual use",
      subtitle: "Meaningful capital, clear terms, and a founder-first partnership.",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=800&fit=crop",
    },
    {
      id: 4,
      title: "Computation",
      subtitle: "We help scale teams, hiring, and strategic expansion over time.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=800&fit=crop",
    },
  ];

  const activeItem = items.find((item) => item.id === activeId);

  return (
    <section className="w-full bg-transparent px-0 py-0">
      <div className="mx-auto w-full">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1fr_560px] lg:gap-14">
          {/* Left Column - Items List */}
          <div className="flex flex-col relative">
            {items.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative w-full text-left py-6 sm:py-8"
              >
                {activeId === item.id && (
                  <motion.div
                    layoutId="active-background"
                    className="absolute inset-0 rounded-lg bg-[#D4FFEF]"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
                <div
                  className={`relative px-4 sm:px-6 flex items-center justify-between gap-4 ${
                    activeId === item.id
                      ? ""
                      : "transition-opacity duration-300 hover:opacity-70"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <h2
                      className={`mb-2 truncate font-heading text-xl font-medium tracking-tight sm:text-2xl md:text-3xl lg:text-4xl ${
                        activeId === item.id
                          ? "text-[#101010]"
                          : "text-white"
                      }`}
                    >
                      {item.title}
                    </h2>
                    <p
                      className={`text-sm sm:text-base ${
                        activeId === item.id ? "text-[#101010]/75" : "text-white/60"
                      }`}
                    >
                      {item.subtitle}
                    </p>
                  </div>
                  {activeId === item.id && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#101010] sm:right-6"
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                      }}
                    />
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right Column - Image */}
          <div className="relative order-first h-[300px] w-full overflow-hidden rounded-2xl sm:h-[400px] lg:order-0 lg:h-full">
            <AnimatePresence initial={false}>
              {activeItem && (
                <motion.img
                  key={activeItem.id}
                  src={activeItem.image}
                  alt={activeItem.title}
                  initial={{ y: "60%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
