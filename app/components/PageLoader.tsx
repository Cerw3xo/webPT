"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "./PageLoader.css";

const MINIMUM_DISPLAY_TIME = 1700;
const EXIT_DURATION = 650;

export function PageLoader() {
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const startedAt = performance.now();
    const previousOverflow = document.body.style.overflow;
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    const previousScrollRestoration = window.history.scrollRestoration;
    let exitTimer: number | undefined;
    let readyTimer: number | undefined;
    let secondResetFrame: number | undefined;

    document.body.style.overflow = "hidden";
    document.documentElement.style.scrollBehavior = "auto";
    window.history.scrollRestoration = "manual";

    const resetScroll = () => {
      window.scrollTo(0, 0);
    };

    resetScroll();
    const firstResetFrame = window.requestAnimationFrame(() => {
      resetScroll();
      secondResetFrame = window.requestAnimationFrame(resetScroll);
    });

    window.addEventListener("pageshow", resetScroll);
    window.addEventListener("beforeunload", resetScroll);

    const finishLoading = () => {
      const elapsed = performance.now() - startedAt;
      const remainingTime = Math.max(0, MINIMUM_DISPLAY_TIME - elapsed);

      readyTimer = window.setTimeout(() => {
        resetScroll();
        setIsReady(true);
        setIsExiting(true);
        document.body.style.overflow = previousOverflow;
        document.documentElement.style.scrollBehavior = previousScrollBehavior;

        exitTimer = window.setTimeout(() => setIsExiting(false), EXIT_DURATION);
      }, remainingTime);
    };

    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading, { once: true });
    }

    return () => {
      window.removeEventListener("load", finishLoading);
      window.removeEventListener("pageshow", resetScroll);
      window.removeEventListener("beforeunload", resetScroll);
      window.clearTimeout(readyTimer);
      window.clearTimeout(exitTimer);
      window.cancelAnimationFrame(firstResetFrame);
      window.cancelAnimationFrame(secondResetFrame);
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  if (isReady && !isExiting) {
    return null;
  }

  return (
    <div
      className={`page-loader${isExiting ? " page-loader--exiting" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Načítání stránky"
    >
      <div className="page-loader__content">
        <div className="page-loader__logo-wrap" aria-hidden="true">
          <Image
            className="page-loader__logo"
            src="/Obrázok Codex 31. 8. 2026, 12_46_43.png"
            alt=""
            width={1672}
            height={941}
            priority
          />
        </div>

        <div className="page-loader__track" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
}
