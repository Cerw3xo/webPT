"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type ChapterMedia =
  | { kind: "image"; src: string; alt: string }
  | { kind: "placeholder"; label: string };

type HeroChapter = {
  number: string;
  discipline: string;
  headline: [string, string];
  cta: string;
  media: ChapterMedia;
};

const chapters: HeroChapter[] = [
  {
    number: "01",
    discipline: "Síla",
    headline: ["Buduj", "sílu."],
    cta: "Prozkoumat sílu",
    media: {
      kind: "image",
      src: "/Obrázok Codex 21. 8. 2026, 13_36_56.png",
      alt: "Atlet při přípravě na mrtvý tah",
    },
  },
  {
    number: "02",
    discipline: "Vytrvalost",
    headline: ["Buduj", "vytrvalost."],
    cta: "Prozkoumat metodu",
    media: { kind: "placeholder", label: "Běh / kondice / pohyb" },
  },
  {
    number: "03",
    discipline: "Výkon",
    headline: ["Buduj", "výkon."],
    cta: "Prozkoumat metodu",
    media: { kind: "placeholder", label: "Box / atletický pohyb" },
  },
];

const clamp = (value: number) => Math.min(1, Math.max(0, value));

function chapterVisibility(progress: number, index: number) {
  const phase = progress * (chapters.length - 1);
  return clamp(1 - Math.abs(phase - index));
}

function HeroMedia({ chapter, visibility, progress }: { chapter: HeroChapter; visibility: number; progress: number }) {
  const style = {
    opacity: visibility,
    transform: `scale(${(0.985 + progress * 0.025).toFixed(3)})`,
  } satisfies CSSProperties;

  return (
    <div className="hero-scene__media-item" style={style} aria-hidden={visibility < 0.05}>
      {chapter.media.kind === "image" ? (
        <Image
          className="hero-scene__image"
          src={chapter.media.src}
          alt={chapter.media.alt}
          width={1672}
          height={941}
          unoptimized
        />
      ) : (
        <div className={`hero-scene__placeholder hero-scene__placeholder--${chapter.number}`}>
          <span>{chapter.media.label}</span>
          <span>{chapter.number}</span>
        </div>
      )}
    </div>
  );
}

function HeroChapterContent({ chapter, visibility }: { chapter: HeroChapter; visibility: number }) {
  const style = {
    opacity: visibility,
    transform: `translate3d(0, ${(1 - visibility) * 1.25}rem, 0)`,
  } satisfies CSSProperties;

  return (
    <article className="hero-scene__chapter" style={style} aria-hidden={visibility < 0.05}>
      <div className="hero-scene__chapter-meta">
        <span>{chapter.number}</span>
        <span>{chapter.discipline}</span>
      </div>
      <div className="hero-scene__chapter-main">
        <h1 className="hero-scene__headline">
          <span>{chapter.headline[0]}</span>
          <span>{chapter.headline[1]}</span>
        </h1>
        <a className="chapter-link" href="#coaching" tabIndex={visibility < 0.05 ? -1 : undefined}>
          {chapter.cta} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

function ScrollProgress({ progress }: { progress: number }) {
  const activeIndex = Math.min(chapters.length - 1, Math.round(progress * (chapters.length - 1)));

  return (
    <aside className="hero-scene__progress" aria-label="Postup kapitol">
      <div className="hero-scene__progress-line" aria-hidden="true">
        <i style={{ height: `${progress * 100}%` }} />
      </div>
      <ol>
        {chapters.map((chapter, index) => (
          <li className={index === activeIndex ? "is-active" : ""} key={chapter.number}>
            <span>{chapter.number}</span>
            <span>{chapter.discipline}</span>
          </li>
        ))}
      </ol>
    </aside>
  );
}

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let frame = 0;

    const updateProgress = () => {
      const isMobile = window.matchMedia("(max-width: 720px)").matches;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const distance = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const nextProgress = isMobile || reduceMotion ? 0 : clamp(-hero.getBoundingClientRect().top / distance);

      setProgress(nextProgress);
      frame = 0;
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="hero-scene" ref={heroRef} aria-label="Tréninkový manifest">
      <div className="hero-scene__sticky">
        <div className="hero-scene__media" aria-hidden="true">
          {chapters.map((chapter, index) => (
            <HeroMedia chapter={chapter} visibility={chapterVisibility(progress, index)} progress={progress} key={chapter.number} />
          ))}
        </div>

        <div className="hero-scene__content-layer">
          {chapters.map((chapter, index) => (
            <HeroChapterContent chapter={chapter} visibility={chapterVisibility(progress, index)} key={chapter.number} />
          ))}
        </div>

        <ScrollProgress progress={progress} />
      </div>
    </section>
  );
}
