export type DescriptionBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

const EMOJI_REGEX = /\p{Extended_Pictographic}/gu;
const EMOJI_PREFIX_REGEX = /^[\s\p{Extended_Pictographic}\uFE0F\u200D]+/u;
const BULLET_LINE_REGEX = /^[\s✅✓☑✔•\-*️]+/u;
const ROCKET_EMOJI_REGEX = /(?:\u{1F680}|\u{1F6F8}|\uD83D\uDE80|\uD83D\uDEF8)/gu;
const EMBEDDED_MEDIA_REGEX =
  /<\s*(?:img|svg)\b[^>]*\/?>|<\/\s*svg\s*>|!\[[^\]]*\]\([^)]*\)|https?:\/\/[^\s)*"]*(?:rocket|fluent-emoji)[^\s)*"]*|\/careers\/icons\/[^\s)"']+/gi;

export function stripEmbeddedMedia(text: string): string {
  return text.replace(EMBEDDED_MEDIA_REGEX, " ");
}

export function stripEmojis(text: string): string {
  return stripEmbeddedMedia(text)
    .replace(ROCKET_EMOJI_REGEX, "")
    .replace(EMOJI_REGEX, "")
    .replace(/\uFE0F/g, "")
    .replace(/\u200D/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function cleanRolePlainText(line: string): string {
  return stripEmojis(
    line.replace(BULLET_LINE_REGEX, "").replace(EMOJI_PREFIX_REGEX, "").trim(),
  );
}

/** Sanitize a full role description while preserving paragraph breaks. */
export function sanitizeRoleDescription(text: string): string {
  return text
    .split("\n")
    .map((line) => cleanRolePlainText(line))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function sanitizeRoleField(text: string): string {
  return cleanRolePlainText(text);
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
