import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "dark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-[#0a0a0a] text-[#f4f3ee] hover:bg-[#1a1a1a] border border-transparent",
  secondary:
    "bg-transparent text-[#0a0a0a] border border-[#0a0a0a]/20 hover:border-[#0a0a0a]/40 hover:bg-[#0a0a0a]/5",
  ghost: "text-[#0a0a0a] hover:bg-[#0a0a0a]/5",
  outline:
    "border border-[#0a0a0a]/20 text-[#0a0a0a] hover:bg-[#0a0a0a]/5 hover:border-[#0a0a0a]/40",
  dark:
    "bg-[#f4f3ee] text-[#0a0a0a] border border-[#f4f3ee]/20 hover:bg-white",
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
