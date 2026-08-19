"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { MediaPlaceholder } from "./MediaPlaceholder";

type CinematicChapterProps = {
  number: string;
  discipline: string;
  headline: [string, string];
  mediaLabel: string;
  media?: ReactNode;
  onProgressChange?: (progress: number) => void;
};

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/**
 * Znovupoužiteľná sticky scéna. Budúci image-sequence alebo video sa vkladá
 * cez `media` a môže použiť tú istú hodnotu progressu v callbacku.
 */
export function CinematicChapter({
  number,
  discipline,
  headline,
  media,
  mediaLabel,
  onProgressChange,
}: CinematicChapterProps) {
  const chapterRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chapter = chapterRef.current;
    const scene = sceneRef.current;

    if (!chapter || !scene) return;

    let animationFrame = 0;

    const updateProgress = () => {
      const isMobile = window.matchMedia("(max-width: 720px)").matches;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const rect = chapter.getBoundingClientRect();
      const scrollDistance = Math.max(chapter.offsetHeight - window.innerHeight, 1);
      const progress = isMobile || reduceMotion ? 0 : clamp(-rect.top / scrollDistance);

      scene.style.setProperty("--chapter-progress", progress.toFixed(4));
      scene.style.setProperty("--chapter-copy-y", `${(progress * -1.4).toFixed(3)}rem`);
      scene.style.setProperty("--chapter-media-x", `${(progress * -1.5).toFixed(3)}%`);
      scene.style.setProperty("--chapter-media-y", `${(progress * -2.5).toFixed(3)}%`);
      scene.style.setProperty("--chapter-media-scale", (1 + progress * 0.055).toFixed(4));
      scene.style.setProperty("--chapter-headline-opacity", (1 - progress * 0.14).toFixed(4));
      scene.style.setProperty("--chapter-progress-width", `${(progress * 100).toFixed(2)}%`);
      scene.dataset.progress = progress.toFixed(3);
      onProgressChange?.(progress);
      animationFrame = 0;
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateProgress);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [onProgressChange]);

  return (
    <section className="cinematic-chapter" ref={chapterRef} aria-label={`${discipline} — kapitola ${number}`}>
      <div
        className="cinematic-chapter__sticky"
        ref={sceneRef}
        style={{
          "--chapter-progress": 0,
          "--chapter-copy-y": "0rem",
          "--chapter-media-x": "0%",
          "--chapter-media-y": "0%",
          "--chapter-media-scale": 1,
          "--chapter-headline-opacity": 1,
          "--chapter-progress-width": "0%",
        } as CSSProperties}
      >
        <div className="cinematic-chapter__copy">
          <div className="cinematic-chapter__meta">
            <span>{number} / {discipline}</span>
            <span>Posouvej pro průběh</span>
          </div>

          <div className="cinematic-chapter__headline-wrap">
            <h1 className="cinematic-chapter__headline">
              <span>{headline[0]}</span>
              <span>{headline[1]}</span>
            </h1>
            <a className="chapter-link" href="#coaching">
              Prozkoumat sílu <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="cinematic-chapter__progress" aria-hidden="true">
            <span>01</span>
            <div><i /></div>
            <span>03</span>
          </div>
        </div>

        <div className="cinematic-chapter__media">
          <div className="cinematic-chapter__media-motion">
            {media ?? <MediaPlaceholder label={mediaLabel} ratio="portrait" index={number} theme="strength" />}
          </div>
          <span className="cinematic-chapter__media-caption">Budoucí sekvence mrtvého tahu / video</span>
        </div>
      </div>
    </section>
  );
}
