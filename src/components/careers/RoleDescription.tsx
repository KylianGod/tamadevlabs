import { isRoleSubHeading } from "@/lib/roles/parse-description";

type RoleDescriptionProps = {
  text: string;
  className?: string;
};

export function RoleDescription({ text, className = "" }: RoleDescriptionProps) {
  const normalized = text.trim();
  if (!normalized) return null;

  const sections = normalized.split(/\n\s*\n/);

  return (
    <div className={`space-y-4 text-body leading-relaxed ${className}`}>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="space-y-1">
          {section.split("\n").map((line, lineIndex) => {
            const trimmed = line.trim();
            if (!trimmed) return null;

            if (isRoleSubHeading(line)) {
              return (
                <p
                  key={lineIndex}
                  className="pt-1 font-medium text-[var(--ink)] first:pt-0"
                >
                  {trimmed}
                </p>
              );
            }

            return (
              <p key={lineIndex} className="text-body">
                {line}
              </p>
            );
          })}
        </div>
      ))}
    </div>
  );
}
