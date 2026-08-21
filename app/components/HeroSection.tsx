"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type ChapterMedia =
  | { kind: "image"; src: string; alt: string; width: number; height: number }
  | { kind: "placeholder"; label: string };

type ImageMotion = {
  from: { x: number; y: number; scale: number };
  to: { x: number; y: number; scale: number };
};

type ChapterData = {
  number: string;
  discipline: string;
  headline: [string, string];
  cta: string;
  media: ChapterMedia;
  imageMotion: ImageMotion;
};

const chapters: ChapterData[] = [
  {
    number: "01",
    discipline: "Síla",
    headline: ["Buduj", "sílu."],
    cta: "Prozkoumat sílu",
    media: {
      kind: "image",
      src: "/Obrázok Codex 21. 8. 2026, 13_36_56.png",
      alt: "Atlet při přípravě na mrtvý tah",
      width: 1672,
      height: 941,
    },
    imageMotion: {
      from: { x: 0, y: 0, scale: 1 },
      to: { x: 0, y: -2.5, scale: 1.05 },
    },
  },
  {
    number: "02",
    discipline: "Vytrvalost",
    headline: ["Buduj", "vytrvalost."],
    cta: "Prozkoumat metodu",
    media: {
      kind: "image",
      src: "/d17ad864-170e-41af-8d2c-92c60938a18f.jpeg",
      alt: "Běžec při nočním tréninku",
      width: 1600,
      height: 1200,
    },
    imageMotion: {
      from: { x: 3.5, y: 0.8, scale: 0.99 },
      to: { x: -1.5, y: -1, scale: 1.04 },
    },
  },
  {
    number: "03",
    discipline: "Výkon",
    headline: ["Buduj", "výkon."],
    cta: "Prozkoumat metodu",
    media: {
      kind: "image",
      src: "/chapter-strength.jpg",
      alt: "Detail úchopu činky při silovém tréninku",
      width: 1600,
      height: 1200,
    },
    imageMotion: {
      from: { x: -2, y: 1, scale: 0.99 },
      to: { x: 2.5, y: -1, scale: 1.045 },
    },
  },
];

const clamp = (value: number) => Math.min(1, Math.max(0, value));

function chapterVisibility(progress: number, index: number) {
  const phase = progress * (chapters.length - 1);
  return clamp(1 - Math.abs(phase - index));
}

const interpolate = (from: number, to: number, progress: number) => from + (to - from) * progress;

function chapterMotionProgress(progress: number, index: number) {
  const phase = progress * (chapters.length - 1);
  return clamp(phase - Math.max(0, index - 1));
}

function HeroMedia({ chapter, index, visibility, progress }: { chapter: ChapterData; index: number; visibility: number; progress: number }) {
  const motionProgress = chapterMotionProgress(progress, index);
  const motion = chapter.imageMotion;
  const style = {
    opacity: visibility,
    transform: `translate3d(${interpolate(motion.from.x, motion.to.x, motionProgress).toFixed(2)}%, ${interpolate(motion.from.y, motion.to.y, motionProgress).toFixed(2)}%, 0) scale(${interpolate(motion.from.scale, motion.to.scale, motionProgress).toFixed(3)})`,
  } satisfies CSSProperties;

  return (
    <div className="hero-scene__media-item" style={style} aria-hidden={visibility < 0.05}>
      {chapter.media.kind === "image" ? (
        <Image
          className="hero-scene__image"
          src={chapter.media.src}
          alt={chapter.media.alt}
          width={chapter.media.width}
          height={chapter.media.height}
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

function HeroChapter({ chapter, index, visibility, progress }: { chapter: ChapterData; index: number; visibility: number; progress: number }) {
  const phase = progress * (chapters.length - 1);
  const translateY = phase < index
    ? (index - phase) * 2.5
    : -(phase - index) * 2.5;
  const style = {
    opacity: visibility,
    transform: `translate3d(0, ${translateY.toFixed(2)}rem, 0)`,
  } satisfies CSSProperties;

  return (
    <article className="hero-scene__chapter" style={style} aria-hidden={visibility < 0.05}>
      <div className="hero-scene__chapter-main">
        <div className="hero-scene__chapter-meta">
          <span>{chapter.number} / {chapter.discipline}</span>
        </div>
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

function HeroContent({ progress }: { progress: number }) {
  return (
    <div className="hero-scene__content-layer">
      {chapters.map((chapter, index) => (
        <HeroChapter chapter={chapter} index={index} visibility={chapterVisibility(progress, index)} progress={progress} key={chapter.number} />
      ))}
    </div>
  );
}

function HeroProgressIndicator({ progress }: { progress: number }) {
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
            <HeroMedia chapter={chapter} index={index} visibility={chapterVisibility(progress, index)} progress={progress} key={chapter.number} />
          ))}
        </div>

        <HeroContent progress={progress} />
        <HeroProgressIndicator progress={progress} />
      </div>
    </section>
  );
}
