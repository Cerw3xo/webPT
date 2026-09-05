import { motion, useTransform, type MotionValue } from "motion/react";
import type { Chapter } from "./chapters";
import { HERO_TIMING } from "./chapters";
import { useChapterMotion } from "./useChapterMotion";
import s from "./ChapterContent.module.css";

type Props = { chapter: Chapter; index: number; total: number; progress: MotionValue<number>; intensity: number };

export function ChapterContent({ chapter, index, total, progress, intensity }: Props) {
  const compact = intensity < 1;
  const fadeRatio = compact ? HERO_TIMING.mobileTextFadeRatio : HERO_TIMING.fadeRatio;
  const textIntensity = compact ? 0.8 : intensity;
  const { opacity, local } = useChapterMotion(progress, index, total, fadeRatio, !compact);
  const y = useTransform(local, [0, 1], [HERO_TIMING.textY.from * textIntensity, HERO_TIMING.textY.to * textIntensity]);

  return (
    <motion.article className={s.wrap} style={{ opacity }}>
      <motion.div className={s.inner} style={{ y }}>
        <div className={s.meta} data-localized-hero>
          <span className={s.metaIndex}>{chapter.index}</span>
          <span className={s.metaDash} aria-hidden="true" />
          <span>{chapter.label}</span>
        </div>
        <h1 className={s.heading}>
          <span className={s.lineOne}>{chapter.lineOne}</span>
          <span>{chapter.lineTwo}</span>
        </h1>
      </motion.div>
    </motion.article>
  );
}
