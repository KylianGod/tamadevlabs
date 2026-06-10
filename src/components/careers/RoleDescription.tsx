import {
  cleanRolePlainText,
  isRoleBulletLine,
  isRoleSubHeading,
} from "@/lib/roles/parse-description";

type RoleDescriptionProps = {
  text: string;
  className?: string;
};

function splitSentences(text: string): string[] {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return [];

  const parts = normalized.split(/(?<=[.!?])\s+(?=[A-Z"'(])/);
  return parts.filter(Boolean);
}

function SentenceFlow({
  text,
  leadingPipe,
}: {
  text: string;
  leadingPipe: boolean;
}) {
  const sentences = splitSentences(text);
  if (!sentences.length) return null;

  return (
    <>
      {sentences.map((sentence, index) => {
        const showPipe = leadingPipe || index > 0;

        return (
          <span key={index}>
            {showPipe ? <span className="text-body-soft"> | </span> : null}
            {sentence}
          </span>
        );
      })}
    </>
  );
}

export function RoleDescription({ text, className = "" }: RoleDescriptionProps) {
  const normalized = text.trim();
  if (!normalized) return null;

  const sections = normalized.split(/\n\s*\n/);

  return (
    <div className={`space-y-4 text-body leading-relaxed ${className}`}>
      {sections.map((section, sectionIndex) => {
        let bodyLineIndex = 0;

        return (
          <div key={sectionIndex} className="space-y-1">
            {section.split("\n").map((line, lineIndex) => {
              const trimmed = line.trim();
              if (!trimmed) return null;

              if (isRoleSubHeading(line)) {
                bodyLineIndex = 0;
                return (
                  <p
                    key={lineIndex}
                    className="pt-1 text-justify font-medium text-[var(--ink)] first:pt-0"
                  >
                    {trimmed}
                  </p>
                );
              }

              const isFirstBodyLine = bodyLineIndex === 0;
              bodyLineIndex += 1;

              const content = isRoleBulletLine(line)
                ? cleanRolePlainText(line)
                : trimmed;

              return (
                <p key={lineIndex} className="text-justify text-body">
                  <SentenceFlow
                    text={content}
                    leadingPipe={!isFirstBodyLine || isRoleBulletLine(line)}
                  />
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
