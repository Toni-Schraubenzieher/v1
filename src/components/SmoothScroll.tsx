"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.5,
    });
    const handleLockScroll = () => {
      lenis.stop();
    };
    const handleUnlockScroll = () => {
      lenis.start();
    };

    let rafId = 0;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let isIdle = false;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    const startRaf = () => {
      if (isIdle) {
        isIdle = false;
        rafId = window.requestAnimationFrame(raf);
      }
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isIdle = true;
        window.cancelAnimationFrame(rafId);
      }, 150);
    };

    rafId = window.requestAnimationFrame(raf);

    window.addEventListener("scroll", startRaf, { passive: true });
    window.addEventListener("wheel", startRaf, { passive: true });
    window.addEventListener("touchmove", startRaf, { passive: true });
    window.addEventListener("kensho:lock-scroll", handleLockScroll);
    window.addEventListener("kensho:unlock-scroll", handleUnlockScroll);

    return () => {
      window.cancelAnimationFrame(rafId);
      if (idleTimer) clearTimeout(idleTimer);
      window.removeEventListener("scroll", startRaf);
      window.removeEventListener("wheel", startRaf);
      window.removeEventListener("touchmove", startRaf);
      window.removeEventListener("kensho:lock-scroll", handleLockScroll);
      window.removeEventListener("kensho:unlock-scroll", handleUnlockScroll);
      lenis.destroy();
    };
  }, []);

  return null;
}
