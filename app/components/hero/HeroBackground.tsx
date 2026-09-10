import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import type { Chapter } from "./chapters";
import { HERO_TIMING } from "./chapters";
import { useChapterMotion } from "./useChapterMotion";
import s from "./HeroBackground.module.css";

type Props = {
  chapter: Chapter;
  index: number;
  total: number;
  progress: MotionValue<number>;
  intensity: number;
  eager?: boolean;
};

export function HeroBackground({ chapter, index, total, progress, intensity, eager }: Props) {
  const mediaClassName = [
    s.media,
    chapter.id === "strength" && s.strengthMedia,
    chapter.id === "endurance" && s.enduranceMedia,
  ].filter(Boolean).join(" ");
  const { opacity, local } = useChapterMotion(progress, index, total);
  const scaleRange = intensity < 1
    ? chapter.motion.scale.map((value) => 1 + (value - 1) * 0.45) as [number, number]
    : chapter.motion.scale;
  const scale = useTransform(local, [0, 1], scaleRange);
  const x = useTransform(local, [0, 1], chapter.motion.x.map((value) => `${value * intensity}%`));
  const y = useTransform(local, [0, 1], chapter.motion.y.map((value) => `${value * intensity}%`));
  const blur = useTransform(local, HERO_TIMING.mediaBlur.input, HERO_TIMING.mediaBlur.output, { clamp: false });
  const filter = useTransform(blur, (value) => `blur(${value.toFixed(2)}px)`);

  return (
    <motion.div className={s.layer} style={{ opacity }} aria-hidden="true">
      <motion.div className={s.parallax} style={{ scale, x, y, filter }}>
        {chapter.media.kind === "image" ? (
          <Image
            className={mediaClassName}
            src={chapter.media.src}
            alt=""
            width={chapter.media.width}
            height={chapter.media.height}
            priority={eager}
            unoptimized
          />
        ) : chapter.media.kind === "video" ? (
          <video className={s.media} src={chapter.media.src} poster={chapter.media.poster} autoPlay muted loop playsInline />
        ) : (
          <div className={s.placeholder}>
            <span>{chapter.media.label}</span>
            <span>{chapter.index}</span>
          </div>
        )}
        <div className={`${s.overlay} ${s.keylight}`} />
        <div className={`${s.overlay} ${s.shadowTint}`} />
      </motion.div>
      <div className={`${s.overlay} ${s.vignette}`} />
      <div className={`${s.overlay} ${s.scrim}`} />
    </motion.div>
  );
}
