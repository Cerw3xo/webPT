"use client";

import { useEffect, useState } from "react";
import styles from "./intake.module.css";

export function IntakeScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
        const nextProgress = scrollableDistance > 0 ? window.scrollY / scrollableDistance : 1;
        setProgress(Math.min(1, Math.max(0, nextProgress)));
      });
    };

    const resizeObserver = new ResizeObserver(updateProgress);
    resizeObserver.observe(document.documentElement);
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      className={styles.scrollProgress}
      role="progressbar"
      aria-label="Průběh vyplňování dotazníku"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <span style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
