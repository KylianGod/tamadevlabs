"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

export function HeroAnimation() {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/hero-animation.json")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setAnimationData(data);
      })
      .catch(() => {
        if (!cancelled) setAnimationData(null);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!animationData) {
    return (
      <div
        className="mx-auto aspect-square w-full max-w-[22rem] animate-pulse rounded-full bg-[#061425]/25 sm:max-w-[26rem] lg:max-w-[28rem]"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className="pointer-events-none mx-auto w-full max-w-[22rem] brightness-0 opacity-85 drop-shadow-[0_8px_32px_rgba(6,20,37,0.35)] sm:max-w-[26rem] lg:max-w-[28rem]"
      aria-hidden="true"
    >
      <Lottie animationData={animationData} loop className="h-auto w-full" />
    </div>
  );
}
