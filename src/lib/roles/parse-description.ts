export type DescriptionBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

const EMOJI_REGEX = /\p{Extended_Pictographic}/gu;
const EMOJI_PREFIX_REGEX = /^[\s\p{Extended_Pictographic}\uFE0F\u200D]+/u;
const BULLET_LINE_REGEX = /^[\s✅✓☑✔•\-*️]+/u;

/** Icons cycled for responsibility-style bullet lists. */
export const RESPONSIBILITY_ICON_PATHS = [
  "/careers/icons/gear.svg",
  "/careers/icons/laptop.svg",
  "/careers/icons/chart.svg",
  "/careers/icons/tools.svg",
  "/careers/icons/memo.svg",
  "/careers/icons/bulb.svg",
  "/careers/icons/package.svg",
] as const;

export function stripEmojis(text: string): string {
  return text
    .replace(EMOJI_REGEX, "")
    .replace(/\uFE0F/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function cleanRolePlainText(line: string): string {
  return stripEmojis(
    line.replace(BULLET_LINE_REGEX, "").replace(EMOJI_PREFIX_REGEX, "").trim(),
  );
}

function isBulletLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (BULLET_LINE_REGEX.test(trimmed)) return true;
  return EMOJI_PREFIX_REGEX.test(trimmed);
}

function stripBulletLine(line: string): string {
  return cleanRolePlainText(line);
}

export function parseRoleDescription(text: string): DescriptionBlock[] {
  const normalized = text.trim();
  if (!normalized) return [];

  const blocks: DescriptionBlock[] = [];
  const sections = normalized.split(/\n\s*\n/);

  for (const section of sections) {
    const lines = section
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (!lines.length) continue;

    const bulletLines = lines.filter(isBulletLine);
    const allBullets = bulletLines.length === lines.length && lines.length > 0;

    if (allBullets) {
      blocks.push({
        type: "list",
        items: lines.map(stripBulletLine).filter(Boolean),
      });
      continue;
    }

    if (bulletLines.length > 0) {
      const proseLines = lines.filter((line) => !isBulletLine(line));
      if (proseLines.length) {
        blocks.push({
          type: "paragraph",
          text: stripEmojis(proseLines.join(" ")),
        });
      }
      blocks.push({
        type: "list",
        items: bulletLines.map(stripBulletLine).filter(Boolean),
      });
      continue;
    }

    blocks.push({
      type: "paragraph",
      text: stripEmojis(lines.join(" ")),
    });
  }

  return blocks;
}
