export type DescriptionBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; title?: string; items: string[] };

const EMOJI_REGEX = /\p{Extended_Pictographic}/gu;
const EMOJI_PREFIX_REGEX = /^[\s\p{Extended_Pictographic}\uFE0F\u200D]+/u;
const BULLET_LINE_REGEX = /^[\s✅✓☑✔•\-*️]+/u;
const ROCKET_EMOJI_REGEX = /(?:\u{1F680}|\u{1F6F8}|\uD83D\uDE80|\uD83D\uDEF8)/gu;
const EMBEDDED_MEDIA_REGEX =
  /<\s*(?:img|svg)\b[^>]*\/?>|<\/\s*svg\s*>|!\[[^\]]*\]\([^)]*\)|https?:\/\/[^\s)*"]*(?:rocket|fluent-emoji)[^\s)*"]*|\/careers\/icons\/[^\s)"']+/gi;

const SECTION_HEADING_REGEX =
  /^(responsibilities|requirements|what you(?:'ll| will) do|key responsibilities|role overview|qualifications|nice to have|bonus points?|about (?:the role|you))[\s:]*$/i;
const ABOUT_ROLE_HEADING_REGEX = /^about\s+(?:the|this)\s+role\s*:?\s*$/i;
const ABOUT_ROLE_PREFIX_REGEX = /^about\s+(?:the|this)\s+role\s*:?\s*/i;

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

function stripAboutRoleHeading(line: string): string {
  const cleaned = cleanRolePlainText(line);
  if (!cleaned) return "";
  if (ABOUT_ROLE_HEADING_REGEX.test(cleaned)) return "";
  return cleaned.replace(ABOUT_ROLE_PREFIX_REGEX, "").trim();
}

/** Sanitize a full role description while preserving paragraph breaks. */
export function sanitizeRoleDescription(text: string): string {
  return text
    .split("\n")
    .map((line) => stripAboutRoleHeading(line))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function sanitizeRoleField(text: string): string {
  return cleanRolePlainText(text);
}

export function isRoleSubHeading(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (ABOUT_ROLE_HEADING_REGEX.test(cleanRolePlainText(trimmed))) return false;
  return isSectionHeading(trimmed);
}

function isSectionHeading(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (SECTION_HEADING_REGEX.test(trimmed)) return true;
  if (SECTION_HEADING_REGEX.test(trimmed.replace(/:\s*$/, ""))) return true;
  return /^[A-Za-z][A-Za-z\s/&'()-]{2,48}:$/.test(trimmed);
}

function normalizeHeading(line: string): string {
  return cleanRolePlainText(line.replace(/:\s*$/, ""));
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

function looksLikeListSection(lines: string[]): boolean {
  if (lines.length < 2) return false;

  const items = lines.map(stripBulletLine).filter(Boolean);
  if (items.length < 2) return false;

  return items.every((item) => item.length <= 220);
}

function pushListBlock(
  blocks: DescriptionBlock[],
  items: string[],
  title?: string,
) {
  const cleaned = items.map(stripBulletLine).filter(Boolean);
  if (!cleaned.length) return;
  blocks.push({ type: "list", title, items: cleaned });
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

    const headingIndex = lines.findIndex(isSectionHeading);

    if (headingIndex >= 0) {
      const before = lines.slice(0, headingIndex);
      const heading = normalizeHeading(lines[headingIndex]);
      const after = lines.slice(headingIndex + 1);

      if (before.length) {
        blocks.push({
          type: "paragraph",
          text: stripEmojis(before.map(stripBulletLine).join(" ")),
        });
      }

      pushListBlock(
        blocks,
        after.filter((line) => !isSectionHeading(line)),
        heading || "Responsibilities",
      );
      continue;
    }

    const bulletLines = lines.filter(isBulletLine);
    const allBullets = bulletLines.length === lines.length && lines.length > 0;

    if (allBullets) {
      pushListBlock(blocks, lines, "Responsibilities");
      continue;
    }

    if (bulletLines.length > 0) {
      const proseLines = lines.filter((line) => !isBulletLine(line));
      if (proseLines.length) {
        blocks.push({
          type: "paragraph",
          text: stripEmojis(proseLines.map(stripBulletLine).join(" ")),
        });
      }
      pushListBlock(blocks, bulletLines, "Responsibilities");
      continue;
    }

    if (looksLikeListSection(lines)) {
      pushListBlock(blocks, lines, "Responsibilities");
      continue;
    }

    blocks.push({
      type: "paragraph",
      text: stripEmojis(lines.map(stripBulletLine).join(" ")),
    });
  }

  return blocks;
}
