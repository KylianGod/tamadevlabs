"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

export function FinalCTAAnimation() {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/final-cta-animation.json")
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
        className="mx-auto h-28 w-28 animate-pulse rounded-full bg-[var(--cream)]/10 md:h-36 md:w-36"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className="pointer-events-none mx-auto w-full max-w-[14rem] md:max-w-[18rem]"
      aria-hidden="true"
    >
      <Lottie animationData={animationData} loop className="h-auto w-full" />
    </div>
  );
}
