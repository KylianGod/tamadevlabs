import Image from "next/image";
import type { TrustTech } from "@/lib/constants";

type TechLogoProps = {
  tech: TrustTech;
  variant?: "on-dark" | "on-light";
  size?: "sm" | "md";
  className?: string;
};

const variantClass = {
  "on-dark": "tech-logo-on-dark",
  "on-light": "tech-logo-on-light",
} as const;

const sizeClass = {
  sm: "h-6 max-w-[6.5rem] md:h-7 md:max-w-[7.5rem]",
  md: "h-7 max-w-[7.5rem] md:h-8 md:max-w-[8.5rem]",
} as const;

export function TechLogo({
  tech,
  variant = "on-dark",
  size = "md",
  className = "",
}: TechLogoProps) {
  const wideClass =
    "wide" in tech && tech.wide
      ? size === "sm"
        ? "md:max-w-[9rem]"
        : "md:max-w-[9.5rem]"
      : "";

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
    >
      <Image
        src={tech.logo}
        alt={tech.name}
        width={tech.width}
        height={tech.height}
        className={`w-auto object-contain object-center ${sizeClass[size]} ${wideClass} ${variantClass[variant]}`}
        unoptimized
      />
    </span>
  );
}
