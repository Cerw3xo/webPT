"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { siteContent, type ContactGoal, type Locale } from "../content";

type SiteContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  content: (typeof siteContent)[Locale];
  contactGoal: ContactGoal;
  setContactGoal: (goal: ContactGoal) => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("cs");
  const [contactGoal, setContactGoal] = useState<ContactGoal>("");

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("mt-locale");
    if (savedLocale === "cs" || savedLocale === "sk") {
      document.documentElement.lang = savedLocale;
      const frame = window.requestAnimationFrame(() => setLocaleState(savedLocale));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem("mt-locale", nextLocale);
    document.documentElement.lang = nextLocale;
  };

  const value = useMemo(
    () => ({ locale, setLocale, content: siteContent[locale], contactGoal, setContactGoal }),
    [contactGoal, locale],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useSite must be used within SiteProvider");
  }
  return context;
}
