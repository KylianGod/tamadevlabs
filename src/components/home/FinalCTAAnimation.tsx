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
        className="final-cta-animation animate-pulse bg-[var(--cream)]/10"
        aria-hidden="true"
      />
    );
  }

  return (
    <div className="final-cta-animation" aria-hidden="true">
      <Lottie
        animationData={animationData}
        loop
        className="final-cta-animation__lottie"
      />
    </div>
  );
}
