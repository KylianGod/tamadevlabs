import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
      <rect x="5" y="5" width="38" height="38" rx="14" fill="#0a0a0a" />
      <rect x="10.5" y="10.5" width="27" height="27" rx="10" stroke="rgba(244, 243, 238, 0.2)" />
      <path d="M15.5 32.5L32.5 15.5" stroke="#f4f3ee" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M15.5 18.5H26.5C29.2614 18.5 31.5 20.7386 31.5 23.5V31.5" stroke="#f4f3ee" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="31.5" cy="31.5" r="2.4" fill="#d9a441" />
    </svg>,
    {
      ...size,
    },
  );
}