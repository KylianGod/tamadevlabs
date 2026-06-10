import {
  cleanRolePlainText,
  parseRoleDescription,
} from "@/lib/roles/parse-description";

const DEFAULT_EXCERPT_LENGTH = 180;

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  const cut =
    lastSpace > maxLength * 0.6 ? truncated.slice(0, lastSpace) : truncated;

  return `${cut}…`;
}

/** First prose paragraph for list cards — no bullets or embedded icons. */
export function getRoleExcerpt(
  description: string,
  maxLength = DEFAULT_EXCERPT_LENGTH,
): string {
  const normalized = description.trim();
  if (!normalized) return "";

  const blocks = parseRoleDescription(normalized);
  const paragraph = blocks.find((block) => block.type === "paragraph");

  if (paragraph?.type === "paragraph" && paragraph.text) {
    return truncateText(paragraph.text, maxLength);
  }

  const firstList = blocks.find((block) => block.type === "list");
  if (firstList?.type === "list" && firstList.items.length) {
    return truncateText(firstList.items.join(" "), maxLength);
  }

  return "";
}

export function hasMoreDescription(
  description: string,
  maxLength = DEFAULT_EXCERPT_LENGTH,
): boolean {
  const normalized = description.trim();
  if (!normalized) return false;

  const blocks = parseRoleDescription(normalized);
  if (blocks.length > 1) return true;

  const paragraph = blocks.find((block) => block.type === "paragraph");
  if (paragraph?.type === "paragraph" && paragraph.text.length > maxLength) {
    return true;
  }

  const firstList = blocks.find((block) => block.type === "list");
  if (firstList?.type === "list") {
    const joined = firstList.items.join(" ");
    return joined.length > maxLength || blocks.length > 1;
  }

  return false;
}

