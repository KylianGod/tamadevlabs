import Image from "next/image";
import { Plus } from "lucide-react";
import { isIllustration } from "@/lib/is-illustration";

type CaseStudyVisualProps = {
  src: string;
  alt: string;
  featured?: boolean;
  variant?: "card" | "hero" | "showcase" | "hero-showcase";
  showcaseTint?: boolean;
  priority?: boolean;
  sizes?: string;
};

export function CaseStudyVisual({
  src,
  alt,
  featured = false,
  variant = "card",
  showcaseTint = true,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: CaseStudyVisualProps) {
  if (variant === "showcase" || variant === "hero-showcase") {
    const tinted = showcaseTint !== false;

    return (
      <div
        className={`case-study-showcase ${variant === "hero-showcase" ? "case-study-showcase--hero" : ""} ${tinted ? "" : "case-study-showcase--no-tint"}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={`case-study-showcase__image ${tinted ? "" : "case-study-showcase__image--natural"}`}
          sizes={sizes}
          priority={priority}
        />
        {tinted && <div className="case-study-showcase__tint" aria-hidden="true" />}
        {tinted && (
          <div className="case-study-showcase__glass" aria-hidden="true">
            <span className="case-study-showcase__glass-btn">
              <Plus className="case-study-showcase__plus" strokeWidth={1.75} aria-hidden="true" />
            </span>
          </div>
        )}
      </div>
    );
  }

  const aspectClass =
    variant === "hero"
      ? "aspect-[16/10]"
      : featured
        ? "aspect-[16/9]"
        : "aspect-[4/3]";

  if (isIllustration(src)) {
    return (
      <div
        className={`case-study-visual relative overflow-hidden ${aspectClass}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="case-study-illustration"
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${aspectClass}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
