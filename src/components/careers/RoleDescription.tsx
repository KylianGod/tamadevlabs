import { RESPONSIBILITY_ICONS } from "@/lib/careers/icons";
import { parseRoleDescription } from "@/lib/roles/parse-description";

type RoleDescriptionProps = {
  text: string;
  className?: string;
};

export function RoleDescription({ text, className = "" }: RoleDescriptionProps) {
  const blocks = parseRoleDescription(text);

  if (!blocks.length) {
    return null;
  }

  let listIconIndex = 0;

  return (
    <div className={`space-y-4 text-body leading-relaxed ${className}`}>
      {blocks.map((block, blockIndex) => {
        if (block.type === "paragraph") {
          return (
            <p key={`p-${blockIndex}`} className="text-body">
              {block.text}
            </p>
          );
        }

        return (
          <ul key={`list-${blockIndex}`} className="space-y-3">
            {block.items.map((item, itemIndex) => {
              const Icon =
                RESPONSIBILITY_ICONS[
                  listIconIndex % RESPONSIBILITY_ICONS.length
                ];
              listIconIndex += 1;

              return (
                <li
                  key={`${blockIndex}-${itemIndex}`}
                  className="flex items-start gap-3 text-[var(--ink)]"
                >
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--ink)]" />
                  <span className="min-w-0 flex-1 text-sm leading-relaxed text-body">
                    {item}
                  </span>
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
}
