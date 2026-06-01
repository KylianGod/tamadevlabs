import { type ReactNode } from "react";
import {
  ScrollSection,
  type SectionTone,
} from "@/components/ui/ScrollSection";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  tone?: SectionTone;
  dark?: boolean;
};

export function Section({
  id,
  children,
  className = "",
  containerClassName = "",
  tone = "cream",
  dark = false,
}: SectionProps) {
  return (
    <ScrollSection
      id={id}
      className={className}
      containerClassName={containerClassName}
      tone={tone}
      dark={dark}
    >
      {children}
    </ScrollSection>
  );
}
