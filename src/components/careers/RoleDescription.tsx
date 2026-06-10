import { CareersEmojiIcon } from "@/components/careers/CareersEmojiIcon";
import {
  parseRoleDescription,
  RESPONSIBILITY_ICON_PATHS,
} from "@/lib/roles/parse-description";

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
              const icon =
                RESPONSIBILITY_ICON_PATHS[
                  listIconIndex % RESPONSIBILITY_ICON_PATHS.length
                ];
              listIconIndex += 1;

              return (
                <li
                  key={`${blockIndex}-${itemIndex}`}
                  className="grid grid-cols-[1.625rem_1fr] items-start gap-3 text-[var(--ink)]"
                >
                  <CareersEmojiIcon
                    src={icon}
                    alt=""
                    size={26}
                    className="mt-0.5 justify-self-center"
                  />
                  <span className="text-sm leading-relaxed text-body">{item}</span>
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
}
