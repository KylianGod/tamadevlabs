import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "dark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-[#ff5533] text-white hover:bg-[#ff6652] border border-transparent",
  secondary:
    "bg-transparent text-[#f5f5f5] border border-[#f5f5f5]/20 hover:border-[#f5f5f5]/40 hover:bg-[#ffffff]/5",
  ghost: "text-[#f5f5f5] hover:bg-[#ffffff]/5",
  outline:
    "border border-[#f5f5f5]/20 text-[#f5f5f5] hover:bg-[#ffffff]/5 hover:border-[#f5f5f5]/40",
  dark:
    "bg-[#ff5533] text-white border border-[#ff5533]/20 hover:bg-[#ff6652]",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-base",
};

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  href?: string;
  external?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  external,
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className} ${disabled ? "pointer-events-none opacity-50" : ""}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
