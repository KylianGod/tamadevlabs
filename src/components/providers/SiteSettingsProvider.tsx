"use client";

import { createContext, useContext, type ReactNode } from "react";
import { SITE } from "@/lib/constants";
import type { SiteContact } from "@/lib/data/contact";

const SiteSettingsContext = createContext<SiteContact>({
  email: SITE.email,
  bookingUrl: SITE.bookingUrl,
});

export function SiteSettingsProvider({
  contact,
  children,
}: {
  contact: SiteContact;
  children: ReactNode;
}) {
  return (
    <SiteSettingsContext.Provider value={contact}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
