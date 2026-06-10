import { Clock, Laptop, MapPin, type LucideIcon } from "lucide-react";

export const CAREERS_PERKS = [
  { Icon: Laptop, label: "Fully remote" },
  { Icon: Clock, label: "Flexible hours" },
  { Icon: MapPin, label: "Global team" },
] as const;

/** Cycled on responsibility bullets — same icons as the perks row. */
export const RESPONSIBILITY_ICONS: LucideIcon[] = [Laptop, Clock, MapPin];
