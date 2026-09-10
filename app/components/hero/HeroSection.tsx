"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useSite } from "../SiteContext";
import { ChapterContent } from "./ChapterContent";
import { FinalStatement } from "./FinalStatement";
import { HeroBackground } from "./HeroBackground";
import { ScrollProgressIndicator } from "./ScrollProgressIndicator";
import { chapters, HERO_TIMING } from "./chapters";
import s from "./HeroSection.module.css";

export function HeroSection() {
  const { content } = useSite();
  const containerRef = useRef<HTMLElement>(null);
  const [isCompact, setIsCompact] = useState(false);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, HERO_TIMING.spring);
  const chapterProgress = useTransform(smooth, [0, HERO_TIMING.chapterCutoff], [0, 1]);
  const finalProgress = useTransform(smooth, [HERO_TIMING.chapterCutoff, 1], [0, 1]);
  const chaptersOpacity = useTransform(smooth, HERO_TIMING.chapterGroupFade.input, HERO_TIMING.chapterGroupFade.output);
  const motionIntensity = isCompact ? 0.55 : 1;
  const totalHeight = `${chapters.length * HERO_TIMING.chapterHeight * 100 + 90}vh`;
  const localizedChapters = chapters.map((chapter, index) => ({
    ...chapter,
    label: content.hero.chapters[index].discipline,
    lineOne: content.hero.chapters[index].headline[0],
    lineTwo: content.hero.chapters[index].headline[1],
  }));

  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px), (max-height: 600px) and (max-width: 960px)");
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
    window.requestAnimationFrame(() => { root.style.scrollBehavior = previousScrollBehavior; });
  };

  return (
    <section ref={containerRef} className={s.section} style={{ height: totalHeight }} aria-label={content.hero.ariaLabel}>
      <div className={s.sticky}>
        <motion.div className={s.chapters} style={{ opacity: chaptersOpacity }}>
          {localizedChapters.map((chapter, index) => (
            <HeroBackground key={chapter.id} chapter={chapter} index={index} total={localizedChapters.length} progress={chapterProgress} intensity={motionIntensity} eager={index === 0} />
          ))}
          {localizedChapters.map((chapter, index) => (
            <ChapterContent key={chapter.id} chapter={chapter} index={index} total={localizedChapters.length} progress={chapterProgress} intensity={motionIntensity} />
          ))}
          <ScrollProgressIndicator chapters={localizedChapters} progress={chapterProgress} label={content.hero.progressLabel} />
          <a className={s.skip} href="#coaching" onClick={skipHero}>
            <span>{content.hero.skipCta}</span>
            <span className={s.skipArrow} aria-hidden="true">↓</span>
          </a>
        </motion.div>
        <FinalStatement progress={finalProgress} />
      </div>
    </section>
  );
}
