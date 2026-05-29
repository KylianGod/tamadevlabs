"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { CASE_STUDIES } from "@/lib/data/case-studies";

function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function update() {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    }
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  return <span>Local time: {time || "—:—"}</span>;
}

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
    <motion.section ref={ref} className="relative overflow-hidden border-b border-[#0a0a0a]/8">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full blur-3xl"
        style={{
          x: haloX,
          y: haloY,
          background:
            "radial-gradient(circle, rgba(217, 164, 65, 0.16), rgba(217, 164, 65, 0))",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-24 h-64 w-64 rounded-full blur-3xl"
        style={{
          x: haloX,
          y: haloY,
          background:
            "radial-gradient(circle, rgba(10, 10, 10, 0.08), rgba(10, 10, 10, 0))",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 pt-12 md:px-10 md:pt-16">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#0a0a0a]/8 pb-6 text-sm text-[#6b6b6b]">
          <LocalTime />
          <a
            href={`mailto:${SITE.email}`}
            className="transition-opacity hover:opacity-60"
          >
            {SITE.email}
          </a>
        </div>

        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:items-end lg:py-24">
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow mb-6"
            >
              {SITE.tagline}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="heading-xl text-[#0a0a0a]"
            >
              We build products for the bold.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-[#6b6b6b]"
            >
              {SITE.description} From AI agents to SaaS platforms—we help founders
              ship software that works.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button href={SITE.bookingUrl} external size="lg">
                Get started
              </Button>
              <Link
                href="/case-studies"
                className="link-underline text-[#0a0a0a]"
              >
                Explore our work
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-4">
            <motion.div style={{ y: cardY, rotate: cardRotate }}>
              <Link
                href={`/case-studies/${featured.slug}`}
                className="group block overflow-hidden rounded-2xl border border-[#0a0a0a]/8 bg-white"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 400px"
                    priority
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider text-[#9a9a9a]">
                    Featured project
                  </p>
                  <p className="mt-1 font-serif text-xl text-[#0a0a0a]">
                    {featured.title}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm text-[#6b6b6b] transition-colors group-hover:text-[#0a0a0a]">
                    View case study
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-[#0a0a0a]/8 py-8">
          <Link
            href="/about"
            className="link-underline text-[#0a0a0a]"
          >
            Learn more about our story
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
