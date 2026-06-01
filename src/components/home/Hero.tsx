"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroNav } from "@/components/home/HeroNav";
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
        className="absolute inset-0 bg-black/50 backdrop-blur-[3px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(255,85,51,0.12),transparent_55%)]"
      />

      <HeroNav />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 pb-10 pt-28 md:px-10 md:pb-14 md:pt-32">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <motion.div {...motionProps(0.05)} className="lg:col-span-7">
            <h1 className="max-w-5xl text-[clamp(2.75rem,7vw,5.75rem)] font-semibold leading-[1.02] tracking-tight text-white">
              We build products
              <br />
              for the bold.
            </h1>

            <div className="mt-6 max-w-md md:mt-8">
              <p className="text-base leading-relaxed text-white/90 md:text-lg">
                An engineering studio turning ambition into software. We help
                startups ship AI products, SaaS platforms, and full-stack apps
                that perform.
              </p>
              <Link
                href="/case-studies"
                className="link-underline mt-4 inline-flex text-white md:mt-5"
              >
                Explore our work
                <ArrowUpRight className="h-4 w-4" />
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
