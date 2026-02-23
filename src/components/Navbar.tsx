"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "who-we-are", label: "Who we are" },
  { id: "how-we-work", label: "How we work" },
  { id: "portfolio", label: "Portfolio" },
  { id: "about-us", label: "About Us" },
];

const menuItems = [
  { label: "Home", href: "#" },
  { label: "Who we are", href: "#who-we-are" },
  { label: "How we work", href: "#how-we-work" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About Us", href: "#about-us" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (!section) continue;
        const element =
          document.querySelector(`.${section.id}`) ||
          document.getElementById(section.id);
        if (element) {
          const { offsetTop } = element as HTMLElement;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.label);
            return;
          }
        }
      }
      if (sections[0]) {
        setActiveSection(sections[0].label);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4 sm:px-8 sm:py-6"
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-end gap-4">
        {/* Menu dropdown */}
        <div className="relative h-12 sm:h-14">
          <motion.div
            className="absolute top-0 right-0 w-48 sm:w-56 bg-[#161616]/90 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden"
            animate={{
              height: isMenuOpen ? "auto" : isMobile ? 48 : 56,
            }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-12 sm:h-14 w-full items-center justify-between gap-4 px-4 sm:px-5 text-white"
            >
              <span className="text-sm sm:text-base font-medium">
                {activeSection}
              </span>
              <motion.div
                className="relative h-5 w-5"
                animate={{ rotate: isMenuOpen ? 45 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="absolute left-1/2 top-0 h-5 w-[1.5px] -translate-x-1/2 bg-current" />
                <span className="absolute left-0 top-1/2 h-[1.5px] w-5 -translate-y-1/2 bg-current" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.nav
                  className="px-5 pb-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <ul className="flex flex-col gap-1">
                    {menuItems.map((item, index) => (
                      <motion.li
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.05 * index,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <a
                          href={item.href}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setActiveSection(item.label);
                          }}
                          className={`block py-1.5 text-base font-medium transition-colors hover:text-white ${
                            activeSection === item.label
                              ? "text-white"
                              : "text-white/60"
                          }`}
                        >
                          {item.label}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.nav>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
