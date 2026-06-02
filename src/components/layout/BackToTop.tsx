"use client";

import { useEffect, useState } from "react";

/** Pixels from the document bottom treated as "at the bottom". */
const BOTTOM_THRESHOLD_PX = 160;

function isNearPageBottom(): boolean {
  const scrollHeight = document.documentElement.scrollHeight;
  const viewportHeight = window.innerHeight;
  const maxScroll = scrollHeight - viewportHeight;

  if (maxScroll <= 0) return false;

  return window.scrollY >= maxScroll - BOTTOM_THRESHOLD_PX;
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      setVisible(isNearPageBottom());
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`back-to-top${visible ? " back-to-top--visible" : ""}`}
    >
      <svg
        className="back-to-top__icon"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M12 19V5M12 5L6 11M12 5l6 6"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="back-to-top__label">Top</span>
    </button>
  );
}
