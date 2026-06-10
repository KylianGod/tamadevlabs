import { Clock, Laptop, MapPin } from "lucide-react";

export const CAREERS_PERKS = [
  { Icon: Laptop, label: "Fully remote" },
  { Icon: Clock, label: "Flexible hours" },
  { Icon: MapPin, label: "Global team" },
] as const;

/**
 * Fluent Emoji 3D SVGs for responsibility bullets — same visual style as
 * laptop / clock / globe in public/careers/icons, with varied job-relevant icons.
 */
export const RESPONSIBILITY_ICON_PATHS = [
  "/careers/icons/gear.svg",
  "/careers/icons/laptop.svg",
  "/careers/icons/chart.svg",
  "/careers/icons/tools.svg",
  "/careers/icons/memo.svg",
  "/careers/icons/bulb.svg",
  "/careers/icons/package.svg",
  "/careers/icons/globe.svg",
  "/careers/icons/clock.svg",
] as const;
