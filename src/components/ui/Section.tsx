import { type ReactNode } from "react";
import { ScrollSection } from "@/components/ui/ScrollSection";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  dark?: boolean;
};

export function Section({
  id,
  children,
  className = "",
  containerClassName = "",
  dark = false,
}: SectionProps) {
  return (
    <ScrollSection
      id={id}
      className={className}
      containerClassName={containerClassName}
      dark={dark}
    >
      <div className="relative">
        {children}
      </div>
    </ScrollSection>
  );
}
