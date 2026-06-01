import Image from "next/image";
import { isIllustration } from "@/lib/is-illustration";

type CaseStudyVisualProps = {
  src: string;
  alt: string;
  featured?: boolean;
  variant?: "card" | "hero";
  priority?: boolean;
  sizes?: string;
};

export function CaseStudyVisual({
  src,
  alt,
  featured = false,
  variant = "card",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: CaseStudyVisualProps) {
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
