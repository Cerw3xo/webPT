"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { EditorialCta } from "./EditorialCta";
import { useSite } from "./SiteContext";

type ChapterMedia =
  | { kind: "image"; src: string; alt: string; width: number; height: number }
  | { kind: "video"; src: string; poster?: string; alt: string }
  | { kind: "placeholder"; label: string };

type ImageMotion = {
  scale: [number, number];
  x: [number, number];
  y: [number, number];
};

type ChapterData = {
  id: "strength" | "endurance" | "performance";
  number: string;
  discipline: string;
  headline: [string, string];
  media: ChapterMedia;
  imageMotion: ImageMotion;
};

type HeroTiming = {
  chapterHeight: number;
  chapterCutoff: number;
  fadeRatio: number;
  textFadeRatio: number;
  spring: { stiffness: number; damping: number; mass: number };
  chapterGroupFade: { input: number[]; output: number[] };
  mediaBlur: { input: number[]; output: number[] };
  textY: { from: number; to: number };
  final: {
    opacityInput: number[];
    opacityOutput: number[];
    y: number[];
    blurInput: number[];
    blurOutput: number[];
  };
  chapters: Record<ChapterData["id"], ImageMotion>;
};

/** Centralized values extracted from the Lovable reference motion system. */
const HERO_TIMING: HeroTiming = {
  chapterHeight: 2.0,
  chapterCutoff: 0.74,
  fadeRatio: 0.32,
  textFadeRatio: 0.18,
  spring: { stiffness: 90, damping: 26, mass: 0.4 },
  chapterGroupFade: { input: [0.68, 0.78], output: [1, 0] },
  mediaBlur: { input: [0, 0.15, 0.85, 1], output: [10, 0, 0, 10] },
  textY: { from: 32, to: -32 },
  final: {
    opacityInput: [0, 0.35, 1],
    opacityOutput: [0, 1, 1],
    y: [40, 0],
    blurInput: [0, 0.5],
    blurOutput: [14, 0],
  },
  chapters: {
    strength: { scale: [1.05, 1.18], x: [0, -1.5], y: [1.5, -1.5] },
    endurance: { scale: [1.14, 1.06], x: [4, -4], y: [0, 0] },
    performance: { scale: [1.22, 1.06], x: [-3, 3], y: [-2, 2] },
  },
};

const chapters: ChapterData[] = [
  {
    id: "strength",
    number: "01",
    discipline: "Síla",
    headline: ["Buduj", "sílu."],
    media: { kind: "image", src: "/3.jpg", alt: "Atlet při přípravě na mrtvý tah", width: 1376, height: 768 },
    imageMotion: HERO_TIMING.chapters.strength,
  },
  {
    id: "endurance",
    number: "02",
    discipline: "Vytrvalost",
    headline: ["Buduj", "vytrvalost."],
    media: { kind: "image", src: "/1.jpg", alt: "Atlet při tréninku na air bike", width: 1376, height: 768 },
    imageMotion: HERO_TIMING.chapters.endurance,
  },
  {
    id: "performance",
    number: "03",
    discipline: "Výkon",
    headline: ["Buduj", "výkon."],
    media: { kind: "image", src: "/2.jpg", alt: "Atlet při boxerském tréninku", width: 1376, height: 768 },
    imageMotion: HERO_TIMING.chapters.performance,
  },
];

type ChapterTiming = {
  opacityInput: [number, number, number, number];
  opacityOutput: [number, number, number, number];
  localInput: [number, number];
};

function getChapterTiming(index: number, total: number, fadeRatio = HERO_TIMING.fadeRatio): ChapterTiming {
  const span = 1 / total;
  const fade = span * fadeRatio;
  const start = index * span;
  const end = (index + 1) * span;

  return {
    opacityInput: [start - fade, start + fade * 0.35, end - fade * 0.35, end + fade],
    opacityOutput: index === 0 ? [1, 1, 1, 0] : [0, 1, 1, 0],
    localInput: [start - fade, end + fade],
  };
}

function percent(value: number) {
  return `${value}%`;
}

function useChapterMotion(progress: MotionValue<number>, index: number, total: number, fadeRatio = HERO_TIMING.fadeRatio) {
  const timing = getChapterTiming(index, total, fadeRatio);
  const opacity = useTransform(progress, timing.opacityInput, timing.opacityOutput);
  const local = useTransform(progress, timing.localInput, [0, 1]);
  return { opacity, local };
}

function HeroBackground({
  chapter,
  index,
  progress,
  intensity,
}: {
  chapter: ChapterData;
  index: number;
  progress: MotionValue<number>;
  intensity: number;
}) {
  const { opacity, local } = useChapterMotion(progress, index, chapters.length);
  const blur = useTransform(local, HERO_TIMING.mediaBlur.input, HERO_TIMING.mediaBlur.output, { clamp: false });
  const scale = useTransform(local, [0, 1], chapter.imageMotion.scale);
  const x = useTransform(local, [0, 1], chapter.imageMotion.x.map((value) => percent(value * intensity)));
  const y = useTransform(local, [0, 1], chapter.imageMotion.y.map((value) => percent(value * intensity)));
  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  return (
    <motion.div className="hero-scene__media-item" style={{ opacity, scale, x, y, filter }} aria-hidden="true">
      {chapter.media.kind === "image" ? (
        <Image className="hero-scene__image" src={chapter.media.src} alt={chapter.media.alt} width={chapter.media.width} height={chapter.media.height} unoptimized />
      ) : chapter.media.kind === "video" ? (
        <video className="hero-scene__image" autoPlay loop muted playsInline poster={chapter.media.poster} aria-label={chapter.media.alt}>
          <source src={chapter.media.src} />
        </video>
      ) : (
        <div className={`hero-scene__placeholder hero-scene__placeholder--${chapter.number}`}>
          <span>{chapter.media.label}</span>
          <span>{chapter.number}</span>
        </div>
      )}
    </motion.div>
  );
}

function HeroChapter({
  chapter,
  index,
  progress,
  intensity,
}: {
  chapter: ChapterData;
  index: number;
  progress: MotionValue<number>;
  intensity: number;
}) {
  const { opacity, local } = useChapterMotion(progress, index, chapters.length, HERO_TIMING.textFadeRatio);
  const y = useTransform(local, [0, 1], [HERO_TIMING.textY.from * intensity, HERO_TIMING.textY.to * intensity]);

  return (
    <motion.article className="hero-scene__chapter" style={{ opacity, y }}>
      <div className="hero-scene__chapter-main">
        <div className="hero-scene__chapter-meta">
          <span className="hero-scene__chapter-number">{chapter.number}</span>
          <span className="hero-scene__chapter-separator" aria-hidden="true" />
          <span className="hero-scene__chapter-discipline">{chapter.discipline}</span>
        </div>
        <h1 className="hero-scene__headline">
          <span>{chapter.headline[0]}</span>
          <span>{chapter.headline[1]}</span>
        </h1>
      </div>
    </motion.article>
  );
}

function ProgressTick({
  chapter,
  index,
  progress,
}: {
  chapter: ChapterData;
  index: number;
  progress: MotionValue<number>;
}) {
  const span = 1 / chapters.length;
  const opacity = useTransform(
    progress,
    [span * (index - 0.4), span * (index + 0.2), span * (index + 0.9), span * (index + 1.4)],
    [0.28, 1, 1, 0.28],
  );

  return (
    <motion.li style={{ opacity }}>
      <span>{chapter.number}</span>
    </motion.li>
  );
}

function HeroProgressIndicator({ progress, label }: { progress: MotionValue<number>; label: string }) {
  const fill = useTransform(progress, [0, 1], [0, 1]);

  return (
    <aside className="hero-scene__progress" aria-label={label}>
      <div className="hero-scene__progress-line" aria-hidden="true">
        <motion.i style={{ scaleY: fill }} />
      </div>
      <ol>
        {chapters.map((chapter, index) => (
          <ProgressTick chapter={chapter} index={index} progress={progress} key={chapter.number} />
        ))}
      </ol>
    </aside>
  );
}

function FinalStatement({ progress }: { progress: MotionValue<number> }) {
  const { content } = useSite();
  const opacity = useTransform(progress, HERO_TIMING.final.opacityInput, HERO_TIMING.final.opacityOutput);
  const y = useTransform(progress, [0, 1], HERO_TIMING.final.y);
  const blur = useTransform(progress, HERO_TIMING.final.blurInput, HERO_TIMING.final.blurOutput);
  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  return (
    <article className="hero-scene__final">
      <motion.div className="hero-scene__final-motion" style={{ opacity, y, filter }}>
        <div className="hero-scene__final-composition">
          <div className="shell intro-final__inner">
            <p className="eyebrow">{content.hero.finalLabel}</p>
            <h2 className="display-type">
              {content.hero.finalLineOne}
              <br />
              <span className="hero-scene__final-muted">{content.hero.finalLineTwo}</span> {content.hero.finalLineThree}
            </h2>
            <EditorialCta className="text-link" href="#coaching" label={content.hero.finalCta} />
          </div>
        </div>
      </motion.div>
    </article>
  );
}

export function HeroSection() {
  const { content } = useSite();
  const containerRef = useRef<HTMLElement>(null);
  const [isCompact, setIsCompact] = useState(false);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, HERO_TIMING.spring);
  const chapterProgress = useTransform(smooth, [0, HERO_TIMING.chapterCutoff], [0, 1]);
  const finalProgress = useTransform(smooth, [HERO_TIMING.chapterCutoff, 1], [0, 1]);
  const chapterGroupOpacity = useTransform(smooth, HERO_TIMING.chapterGroupFade.input, HERO_TIMING.chapterGroupFade.output);
  const motionIntensity = isCompact ? 0.55 : 1;
  const scrollHeight = `${chapters.length * HERO_TIMING.chapterHeight * 100 + 90}vh`;
  const localizedChapters = chapters.map((chapter, index) => ({
    ...chapter,
    discipline: content.hero.chapters[index].discipline,
    headline: [...content.hero.chapters[index].headline] as [string, string],
  }));

  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px)");
    const update = () => setIsCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const skipHero = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const target = document.querySelector<HTMLElement>("#coaching");
    if (!target) return;

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    target.scrollIntoView();
    window.history.replaceState(null, "", "#coaching");

    window.requestAnimationFrame(() => {
      root.style.scrollBehavior = previousScrollBehavior;
    });
  };

  return (
    <section className="hero-scene" ref={containerRef} style={{ "--hero-scroll-height": scrollHeight } as React.CSSProperties} aria-label={content.hero.ariaLabel}>
      <div className="hero-scene__sticky">
        <motion.div className="hero-scene__chapter-group" style={{ opacity: chapterGroupOpacity }}>
          <div className="hero-scene__media" aria-hidden="true">
            {localizedChapters.map((chapter, index) => (
              <HeroBackground chapter={chapter} index={index} progress={chapterProgress} intensity={motionIntensity} key={chapter.id} />
            ))}
          </div>
          <div className="hero-scene__content-layer">
            {localizedChapters.map((chapter, index) => (
              <HeroChapter chapter={chapter} index={index} progress={chapterProgress} intensity={motionIntensity} key={chapter.id} />
            ))}
          </div>
          <HeroProgressIndicator progress={chapterProgress} label={content.hero.progressLabel} />
          <a className="hero-scene__skip" href="#coaching" onClick={skipHero}>
            <span>{content.hero.skipCta}</span>
            <span className="hero-scene__skip-arrow" aria-hidden="true">↓</span>
          </a>
        </motion.div>
        <FinalStatement progress={finalProgress} />
      </div>
    </section>
  );
}
