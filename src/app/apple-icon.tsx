import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
      <rect width="180" height="180" rx="40" fill="url(#bg)" />
      <defs>
        <linearGradient id="bg" x1="28" y1="18" x2="152" y2="162" gradientUnits="userSpaceOnUse">
          <stop stopColor="#111111" />
          <stop offset="0.52" stopColor="#0a0a0a" />
          <stop offset="1" stopColor="#181818" />
        </linearGradient>
      </defs>
      <rect x="35" y="35" width="110" height="110" rx="36" stroke="rgba(244, 243, 238, 0.14)" />
      <path d="M58 118L122 54" stroke="#f4f3ee" strokeWidth="14" strokeLinecap="round" />
      <path d="M58 64H97C110.807 64 122 75.1929 122 89V118" stroke="#f4f3ee" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="122" cy="118" r="10" fill="#d9a441" />
    </svg>,
    {
      ...size,
    },
  );
}