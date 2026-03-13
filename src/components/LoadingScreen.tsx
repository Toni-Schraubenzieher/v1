"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Wait for loading bar to appear before starting progress
    const loadingBarDelay = 600; // Wait for loading bar fade-in animation
    let interval: NodeJS.Timeout;

    const startTimeout = setTimeout(() => {
      // Simulate loading progress with ease-out
      const duration = 2100; // 2.1 seconds
      const startTime = Date.now();

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress) * 100;

        setProgress(easedProgress);

        if (progress >= 1) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 200);
        }
      }, 16); // ~60fps
    }, loadingBarDelay);

    return () => {
      clearTimeout(startTimeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0A]"
        >
          <motion.div
            className="flex flex-col items-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
          {/* Logo Elements that fly together */}
          <div className="relative mb-16 grid grid-cols-2 gap-x-3 gap-y-3 w-[200px] -ml-8">
            {/* Top Left Element - Form 1 */}
            <motion.div
              initial={{ x: -150, y: -150, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-start justify-end"
            >
              <img
                src="/Forms/1.svg?v=2"
                alt=""
                className="h-[62px] w-auto"
                style={{ filter: "brightness(0) saturate(100%) invert(100%)" }}
              />
            </motion.div>

            {/* Top Right Element - Form 2 */}
            <motion.div
              initial={{ x: 150, y: -150, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-start justify-start"
            >
              <img
                src="/Forms/2.svg?v=2"
                alt=""
                className="h-[62px] w-auto"
                style={{ filter: "brightness(0) saturate(100%) invert(100%)" }}
              />
            </motion.div>

            {/* Bottom Left Element - Form 3 */}
            <motion.div
              initial={{ x: -150, y: 150, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-end justify-end"
            >
              <img
                src="/Forms/3.svg?v=2"
                alt=""
                className="h-[62px] w-auto"
                style={{ filter: "brightness(0) saturate(100%) invert(100%)" }}
              />
            </motion.div>

            {/* Bottom Right Element - Form 4 */}
            <motion.div
              initial={{ x: 150, y: 150, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-end justify-start"
            >
              <img
                src="/Forms/4.svg?v=2"
                alt=""
                className="h-[62px] w-auto"
                style={{ filter: "brightness(0) saturate(100%) invert(100%)" }}
              />
            </motion.div>
          </div>

          {/* Loading Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
            className="w-[200px]"
          >
            {/* Loading bar container */}
            <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/10">
              {/* Orange fill */}
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-[#FEB180]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
