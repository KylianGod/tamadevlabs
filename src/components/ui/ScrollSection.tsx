"use client";

import { type ReactNode, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

type ScrollSectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  dark?: boolean;
};

export function ScrollSection({
  id,
  children,
  className = "",
  containerClassName = "",
  dark = false,
}: ScrollSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [24, 0],
  );
  const contentOpacity = useTransform(scrollYProgress, [0, 0.12, 1], [0.25, 1, 1]);
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const orbLeftX = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-72, 28],
  );
  const orbRightX = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [56, -32],
  );
  const orbLift = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [20, -12],
  );

  return (
    <section
      ref={ref}
      id={id}
      className={`relative overflow-hidden py-20 md:py-28 ${dark ? "section-dark" : ""} ${className}`}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-current/30 to-transparent"
        style={{ scaleX: progress, transformOrigin: "left" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full blur-3xl"
        style={{
          x: orbLeftX,
          y: orbLift,
          background: dark
            ? "radial-gradient(circle, rgba(244, 243, 238, 0.16), rgba(244, 243, 238, 0))"
            : "radial-gradient(circle, rgba(10, 10, 10, 0.08), rgba(10, 10, 10, 0))",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-[-6rem] h-80 w-80 rounded-full blur-3xl"
        style={{
          x: orbRightX,
          y: orbLift,
          background: dark
            ? "radial-gradient(circle, rgba(217, 164, 65, 0.16), rgba(217, 164, 65, 0))"
            : "radial-gradient(circle, rgba(217, 164, 65, 0.14), rgba(217, 164, 65, 0))",
        }}
      />

      <motion.div
        className={`mx-auto max-w-7xl px-6 md:px-10 ${containerClassName}`}
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {children}
      </motion.div>
    </section>
  );
}