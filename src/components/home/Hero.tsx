"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroNav } from "@/components/home/HeroNav";
import { CASE_STUDIES } from "@/lib/data/case-studies";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const featured = CASE_STUDIES[0];
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
        className="object-cover object-center scale-105"
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

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col px-6 pb-10 pt-28 md:px-10 md:pb-14 md:pt-32">
        <motion.div {...motionProps(0.05)} className="flex flex-1 items-center">
          <h1 className="max-w-5xl text-[clamp(2.75rem,7vw,5.75rem)] font-semibold leading-[1.02] tracking-tight text-white">
            We build products
            <br />
            for the bold.
          </h1>
        </motion.div>

        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
          <motion.div {...motionProps(0.14)} className="lg:col-span-7">
            <p className="max-w-md text-base leading-relaxed text-white/78 md:text-lg">
              An engineering studio turning ambition into software. We help
              startups ship AI products, SaaS platforms, and full-stack apps that
              perform.
            </p>
            <Link
              href="/case-studies"
              className="link-underline mt-6 inline-flex text-white"
            >
              Explore our work
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            {...motionProps(0.22)}
            className="flex justify-start lg:col-span-5 lg:justify-end"
          >
            <Link
              href={`/case-studies/${featured.slug}`}
              className="group relative block w-full max-w-[17rem] overflow-hidden rounded-2xl border border-white/20 shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:max-w-[19rem]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="304px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                    Featured project
                  </p>
                  <p className="mt-1 font-medium leading-snug text-white">
                    {featured.title}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
