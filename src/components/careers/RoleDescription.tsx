import { CareersEmojiIcon } from "@/components/careers/CareersEmojiIcon";
import { RESPONSIBILITY_ICON_PATHS } from "@/lib/careers/icons";
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
    <div className={`space-y-6 text-body leading-relaxed ${className}`}>
      {blocks.map((block, blockIndex) => {
        if (block.type === "paragraph") {
          return (
            <p key={`p-${blockIndex}`} className="text-sm text-body">
              {block.text}
            </p>
          );
        }

        if (block.type === "heading") {
          return (
            <h3
              key={`h-${blockIndex}`}
              className="pt-2 font-serif text-base text-[var(--ink)]"
            >
              {block.text}
            </h3>
          );
        }

        const listTitle = block.title ?? "Responsibilities";

        return (
          <div key={`list-${blockIndex}`} className="role-responsibilities">
            <p className="text-xs font-medium uppercase tracking-wider text-body-soft">
              {listTitle}
            </p>
            <ol className="mt-4 divide-y divide-[var(--border-ink)] border-y border-[var(--border-ink)]">
              {block.items.map((item, itemIndex) => {
                const icon =
                  RESPONSIBILITY_ICON_PATHS[
                    listIconIndex % RESPONSIBILITY_ICON_PATHS.length
                  ];
                listIconIndex += 1;

                return (
                  <li
                    key={`${blockIndex}-${itemIndex}`}
                    className="grid grid-cols-[2rem_1.625rem_1fr] items-start gap-3 py-4 text-[var(--ink)]"
                  >
                    <span className="pt-0.5 font-serif text-sm tabular-nums text-body-soft">
                      {String(itemIndex + 1).padStart(2, "0")}
                    </span>
                    <CareersEmojiIcon
                      src={icon}
                      alt=""
                      size={24}
                      className="mt-0.5 justify-self-center"
                    />
                    <span className="text-sm leading-relaxed text-body">
                      {item}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        );
      })}
    </div>
  );
}
