"use client";

import Image from "next/image";
import { useSite } from "../SiteContext";
import { FinalStatement } from "./FinalStatement";
import { chapters } from "./chapters";
import s from "./HeroSection.module.css";

export function HeroSection() {
  const { content } = useSite();

  return (
    <section className={s.section} aria-label={content.hero.ariaLabel}>
      <div className={s.media} aria-hidden="true">
        {chapters.map((chapter, index) => (
          chapter.media.kind === "image" ? (
            <div className={s.mediaLayer} key={chapter.id}>
              <Image
                className={s.mediaImage}
                src={chapter.media.src}
                alt=""
                width={chapter.media.width}
                height={chapter.media.height}
                priority={index === 0}
                unoptimized
              />
            </div>
          ) : null
        ))}
        <div className={`${s.overlay} ${s.keylight}`} />
        <div className={`${s.overlay} ${s.shadowTint}`} />
        <div className={`${s.overlay} ${s.vignette}`} />
        <div className={`${s.overlay} ${s.scrim}`} />
      </div>

      <FinalStatement />
    </section>
  );
}
