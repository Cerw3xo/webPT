"use client";

import Image from "next/image";
import { useSite } from "../SiteContext";
import { FinalStatement } from "./FinalStatement";
import s from "./HeroSection.module.css";

const temporaryHeroMedia = {
  src: "/hero-matej.png",
  width: 1672,
  height: 940,
};

export function HeroSection() {
  const { content } = useSite();

  return (
    <section className={s.section} aria-label={content.hero.ariaLabel}>
      <div className={s.media} aria-hidden="true">
        <div className={`${s.mediaLayer} ${s.singleMediaLayer}`}>
          <Image
            className={s.mediaImage}
            src={temporaryHeroMedia.src}
            alt=""
            width={temporaryHeroMedia.width}
            height={temporaryHeroMedia.height}
            priority
            unoptimized
          />
        </div>
        <div className={`${s.overlay} ${s.keylight}`} />
        <div className={`${s.overlay} ${s.shadowTint}`} />
        <div className={`${s.overlay} ${s.vignette}`} />
        <div className={`${s.overlay} ${s.scrim}`} />
      </div>

      <FinalStatement />
    </section>
  );
}
