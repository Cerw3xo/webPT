"use client";

import { createContext, useContext } from "react";
import { siteContent, type ContactGoal, type Locale } from "../content";

export type SiteContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  content: (typeof siteContent)[Locale];
  contactGoal: ContactGoal;
  setContactGoal: (goal: ContactGoal) => void;
};

export const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite() {
  const context = useContext(SiteContext);

  if (!context) {
    throw new Error("useSite must be used within SiteProvider");
  }

  return context;
}
