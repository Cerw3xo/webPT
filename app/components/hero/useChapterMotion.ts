import { useTransform, type MotionValue } from "motion/react";
import { HERO_TIMING } from "./chapters";

export function useChapterMotion(progress: MotionValue<number>, index: number, total: number) {
  const span = 1 / total;
  const start = span * index;
  const end = start + span;
  const fade = span * HERO_TIMING.fadeRatio;

  return {
    opacity: useTransform(
      progress,
      [start - fade, start + fade * 0.35, end - fade * 0.35, end + fade],
      index === 0 ? [1, 1, 1, 0] : [0, 1, 1, 0],
    ),
    local: useTransform(progress, [start - fade, end + fade], [0, 1]),
  };
}
