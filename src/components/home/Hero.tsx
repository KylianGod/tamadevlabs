"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { HeroAnimation } from "@/components/home/HeroAnimation";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const motionProps = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease },
        };

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <Image
        src="/hero-bg.png"
        alt=""
        fill
        priority
        className="scale-105 object-cover object-center"
        sizes="100vw"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#061425]/88 via-[#061425]/45 to-[#061425]/10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#7eb8d4]/35 via-transparent to-[#061425]/75"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,rgba(255,140,0,0.18),transparent_50%)]"
      />

      <Header variant="hero" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 pb-10 pt-28 md:px-10 md:pb-14 md:pt-32">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <motion.div
            {...motionProps(0.05)}
            className="flex w-full flex-col items-start text-left lg:col-span-7"
          >
            <div className="flex w-full max-w-xl flex-col items-start gap-6 md:gap-8">
              <h1 className="w-full text-[clamp(2.75rem,7vw,5.75rem)] font-semibold leading-[1.05] tracking-tight text-[var(--cream)] drop-shadow-[0_2px_24px_rgba(6,20,37,0.55)]">
                <span className="block">We build products</span>
                <span className="block">for the bold.</span>
              </h1>

              <p className="w-full max-w-md text-base leading-relaxed text-[var(--cream)]/90 md:text-lg">
                An engineering studio turning ambition into software. We help
                startups ship AI products, SaaS platforms, and full stack apps
                that perform.
              </p>

              <Link
                href="/case-studies"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--cream)] transition-opacity hover:opacity-80 md:text-base"
              >
                Explore our work
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
            </div>
          </motion.div>

          <motion.div
            {...motionProps(0.18)}
            className="flex justify-center lg:col-span-5 lg:justify-end"
          >
            <HeroAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
