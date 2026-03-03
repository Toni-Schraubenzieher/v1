"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useVelocity,
  useTransform,
} from "motion/react";

function MovingRow({
  text,
  direction,
  color,
}: {
  text: string;
  direction: 1 | -1;
  color: string;
}) {
  const x = useMotionValue(direction === 1 ? -50 : 0);
  const directionTarget = useMotionValue<number>(1);
  const smoothDirection = useSpring(directionTarget, { stiffness: 90, damping: 28, mass: 0.7 });
  const xPercent = useTransform(x, (value) => `${value}%`);
  const { scrollY } = useScroll();
  const rawVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(rawVelocity, { stiffness: 140, damping: 30 });
  const velocityFactor = useTransform(smoothVelocity, [-2200, 0, 2200], [0.72, 0, 0.72]);

  useAnimationFrame((_, delta) => {
    const velocityNow = rawVelocity.get();
    if (velocityNow > 22) directionTarget.set(1);
    if (velocityNow < -22) directionTarget.set(-1);

    const baseSpeed = 0.9;
    const speedBoost = velocityFactor.get();
    const signedDirection = direction * smoothDirection.get();
    const moveBy = signedDirection * baseSpeed * (delta / 1000) * (1 + speedBoost);
    const next = x.get() + moveBy;

    if (moveBy < 0) {
      x.set(next <= -50 ? 0 : next);
      return;
    }

    x.set(next >= 0 ? -50 : next);
  });

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex w-max whitespace-nowrap"
        style={{ x: xPercent }}
      >
        {[0, 1].map((group) => (
          <div key={group} className="mr-24 flex shrink-0 items-center gap-20">
            {[0, 1, 2].map((part) => (
              <span
                key={part}
                className="font-heading text-[clamp(3.15rem,9.6vw,8.8rem)] font-bold uppercase leading-[0.88] tracking-tight"
                style={{ color }}
              >
                {text}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Statement() {
  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <div className="w-full space-y-3 sm:space-y-4">
        <MovingRow text="FOUNDERS FIRST." direction={-1} color="#FEB180" />
        <MovingRow text="LONG-TERM PARTNERS." direction={1} color="#D4FFEF" />
      </div>
    </section>
  );
}
