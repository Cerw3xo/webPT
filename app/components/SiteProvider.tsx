"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { siteContent, type ContactGoal, type Locale } from "../content";
import { SiteContext } from "./SiteContext";

const localizedCopySelector = [
  "main h1",
  "main h2",
  "main h3",
  "main p",
  "main a:not(.brand-mark):not(.footer-logo-link)",
  "main input",
  "main select",
  "main textarea",
  ".hero-scene__chapter-meta",
  ".media-placeholder__label",
  ".about-stat",
  ".diagnostic-details",
  ".result-message-card__meta",
  ".message-bubble span",
  ".visual-submit",
].join(",");

function getVisibleLocalizedCopy() {
  return Array.from(document.querySelectorAll<HTMLElement>(localizedCopySelector)).filter((element) => {
    const bounds = element.getBoundingClientRect();
    return bounds.bottom >= 0 && bounds.top <= window.innerHeight;
  });
}

function waitForAnimations(animations: Animation[]) {
  return Promise.all(animations.map((animation) => animation.finished.catch(() => undefined)));
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("cs");
  const [contactGoal, setContactGoal] = useState<ContactGoal>("");
  const isChangingLocale = useRef(false);

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("mt-locale");
    if (savedLocale === "cs" || savedLocale === "sk") {
      document.documentElement.lang = savedLocale;
      const frame = window.requestAnimationFrame(() => setLocaleState(savedLocale));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  const setLocale = useCallback((nextLocale: Locale) => {
    if (nextLocale === locale || isChangingLocale.current) return;

    const root = document.documentElement;
    const updateLocale = () => {
      flushSync(() => setLocaleState(nextLocale));
      window.localStorage.setItem("mt-locale", nextLocale);
      root.lang = nextLocale;
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof Element.prototype.animate !== "function") {
      updateLocale();
      return;
    }

    isChangingLocale.current = true;
    const outgoingElements = getVisibleLocalizedCopy();
    const outgoing = outgoingElements.map((element) =>
      element.animate(
        [
          { clipPath: "inset(0)", filter: "blur(0)" },
          { clipPath: "inset(100% 0 0 0)", filter: "blur(7px)" },
        ],
        { duration: 180, easing: "cubic-bezier(0.4, 0, 1, 1)", fill: "both" },
      ),
    );

    void waitForAnimations(outgoing).then(() => {
      updateLocale();

      const incomingElements = getVisibleLocalizedCopy();
      const incoming = incomingElements.map((element) =>
        element.animate(
          [
            { clipPath: "inset(0 0 100% 0)", filter: "blur(7px)" },
            { clipPath: "inset(0)", filter: "blur(0)" },
          ],
          { duration: 320, easing: "cubic-bezier(0, 0, 0.2, 1)", fill: "both" },
        ),
      );

      outgoing.forEach((animation) => animation.cancel());
      void waitForAnimations(incoming).finally(() => {
        incoming.forEach((animation) => animation.cancel());
        isChangingLocale.current = false;
      });
    });
  }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, content: siteContent[locale], contactGoal, setContactGoal }),
    [contactGoal, locale, setLocale],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}
