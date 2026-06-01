"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CASE_STUDIES } from "@/lib/data/case-studies";

export function Hero() {
  const featured = CASE_STUDIES[0];
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const cardY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 44],
  );
  const cardRotate = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [1.5, -3.5],
  );
  const haloX = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 96],
  );
  const haloY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 72],
  );

  return (
    <motion.section
      ref={ref}
      className="relative overflow-hidden border-b border-white/10 bg-[#070a0f] text-white"
      style={{
        background:
          "radial-gradient(circle at 18% 22%, rgba(255, 102, 77, 0.22), transparent 22%), radial-gradient(circle at 72% 18%, rgba(72, 168, 255, 0.18), transparent 20%), radial-gradient(circle at 78% 76%, rgba(255, 102, 77, 0.24), transparent 18%), linear-gradient(180deg, #071018 0%, #090d14 55%, #0d1118 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "linear-gradient(90deg, rgba(255, 102, 77, 0.15) 0%, rgba(255, 102, 77, 0.02) 18%, transparent 38%, transparent 64%, rgba(72, 168, 255, 0.08) 100%)",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-8 h-[30rem] w-[30rem] rounded-full blur-3xl"
        style={{
          x: haloX,
          y: haloY,
          background:
            "radial-gradient(circle, rgba(255, 102, 77, 0.2), rgba(255, 102, 77, 0))",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-4rem] top-20 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{
          x: haloX,
          y: haloY,
          background:
            "radial-gradient(circle, rgba(72, 168, 255, 0.18), rgba(72, 168, 255, 0))",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_58%)] opacity-80"
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-10 md:px-10 md:pb-16 md:pt-14 lg:min-h-[calc(100vh-5rem)]">
        <div className="grid gap-12 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-12 lg:items-center">
          <div className="relative z-10 lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow mb-5 text-white/70"
            >
              AI & Full-Stack Engineering
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="heading-xl max-w-4xl text-white"
            >
              We build AI products
              <br />
              for founders who move fast.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-white/72"
            >
              We design and ship AI systems, SaaS platforms, and full-stack
              products that feel premium, move quickly, and convert.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button href="/contact" size="lg" variant="dark">
                Get started
              </Button>
              <Link
                href="/case-studies"
                className="link-underline text-white"
              >
                Explore our work
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          <div className="relative z-10 lg:col-span-5">
            <motion.div
              style={{ y: cardY, rotate: cardRotate }}
              className="relative mx-auto max-w-[30rem]"
            >
              <div className="absolute -inset-6 rounded-[2.25rem] bg-[radial-gradient(circle_at_top,rgba(255,102,77,0.28),transparent_48%),radial-gradient(circle_at_bottom_right,rgba(72,168,255,0.22),transparent_38%)] blur-2xl" />
              <Link
                href={`/case-studies/${featured.slug}`}
                className="group relative block overflow-hidden rounded-[2rem] border border-white/12 bg-white/8 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-md"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#0e1218]">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,102,77,0.2),transparent_24%),radial-gradient(circle_at_72%_70%,rgba(72,168,255,0.18),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.18))]"
                  />
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover opacity-60 mix-blend-screen transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 400px"
                    priority
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,6,10,0.05)_0%,rgba(3,6,10,0.4)_60%,rgba(3,6,10,0.82)_100%)]" />

                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/14 bg-black/20 px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-white/72 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff664d]" />
                    Featured project
                  </div>

                  <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/12 bg-black/28 p-4 backdrop-blur-xl">
                    <p className="text-sm uppercase tracking-[0.24em] text-white/52">
                      {featured.category}
                    </p>
                    <p className="mt-2 font-serif text-2xl leading-tight text-white">
                      {featured.title}
                    </p>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/72">
                      {featured.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-3 text-sm text-white/80">
                      <span>View case study</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-white/10 pt-8 text-sm text-white/70 md:mt-16">
          <Link
            href="/about"
            className="link-underline text-white"
          >
            Learn more about our story
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
