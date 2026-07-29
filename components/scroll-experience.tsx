"use client";

import { useEffect, useState } from "react";
import {
  inView,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { CarFront } from "lucide-react";

export function ScrollExperience() {
  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 115,
    damping: 26,
    mass: 0.35,
  });
  const carPosition = useTransform(smoothProgress, [0, 1], [3, 97]);
  const carLeft = useTransform(carPosition, (value) => `${value}%`);
  const [direction, setDirection] = useState<"down" | "up">("down");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? latest;
    if (Math.abs(latest - previous) > 2) {
      setDirection(latest > previous ? "down" : "up");
    }
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("motion-ready");

    const stopSections = inView(
      ".scroll-stage .section .shell",
      (section) => {
        const items = Array.from(section.children) as HTMLElement[];
        items.forEach((item, index) =>
          item.animate(
            [
              { opacity: 0, transform: "translateY(34px)" },
              { opacity: 1, transform: "translateY(0px)" },
            ],
            {
              duration: 850,
              delay: index * 90,
              easing: "cubic-bezier(0.16, 1, 0.3, 1)",
              fill: "both",
            },
          ),
        );
      },
      { margin: "0px 0px -12% 0px", amount: 0.15 },
    );

    const stopImages = inView(
      ".scroll-stage .section img:not([aria-hidden='true'])",
      (image) => {
        (image as HTMLElement).animate(
          [
            { scale: 1.055, opacity: 0.72 },
            { scale: 1, opacity: 1 },
          ],
          {
            duration: 1100,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            fill: "both",
          },
        );
      },
      { margin: "0px 0px -8% 0px", amount: 0.2 },
    );

    return () => {
      stopSections();
      stopImages();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  return (
    <div className="scroll-road" aria-hidden="true">
      <motion.div className="scroll-road-fill" style={{ scaleX: smoothProgress }} />
      <motion.div
        className="scroll-car"
        style={{ left: carLeft }}
        animate={{ rotateY: direction === "down" ? 0 : 180 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
      >
        <CarFront className="h-4 w-4" strokeWidth={1.8} />
      </motion.div>
    </div>
  );
}
