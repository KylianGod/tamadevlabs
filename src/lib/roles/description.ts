import { stripEmojis } from "@/lib/roles/parse-description";

const DEFAULT_EXCERPT_LENGTH = 180;

/** First paragraph or truncated preview for list cards. */
export function getRoleExcerpt(
  description: string,
  maxLength = DEFAULT_EXCERPT_LENGTH,
): string {
  const normalized = description.trim();
  if (!normalized) return "";

  const firstParagraph = stripEmojis(
    normalized.split(/\n\s*\n/)[0]?.replace(/\s+/g, " ").trim() ?? normalized,
  );

  if (firstParagraph.length <= maxLength) return firstParagraph;

  const truncated = firstParagraph.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  const cut = lastSpace > maxLength * 0.6 ? truncated.slice(0, lastSpace) : truncated;

  return `${cut}…`;
}

export function hasMoreDescription(
  description: string,
  maxLength = DEFAULT_EXCERPT_LENGTH,
): boolean {
  const normalized = description.trim();
  if (!normalized) return false;

  const paragraphs = normalized.split(/\n\s*\n/).filter(Boolean);
  if (paragraphs.length > 1) return true;

  const collapsed = paragraphs[0]?.replace(/\s+/g, " ").trim() ?? "";
  return collapsed.length > maxLength;
}
