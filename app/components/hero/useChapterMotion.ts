import { useTransform, type MotionValue } from "motion/react";
import { HERO_TIMING } from "./chapters";

export function useChapterMotion(
  progress: MotionValue<number>,
  index: number,
  total: number,
  fadeRatio = HERO_TIMING.fadeRatio,
  crossfade = true,
) {
  const span = 1 / total;
  const start = span * index;
  const end = start + span;
  const fade = span * fadeRatio;

  const opacityInput = crossfade
    ? [start - fade, start + fade * 0.35, end - fade * 0.35, end + fade]
    : [start - fade, start, start + fade * 0.6, end - fade * 0.6, end, end + fade];
  const opacityOutput = crossfade
    ? index === 0 ? [1, 1, 1, 0] : [0, 1, 1, 0]
    : index === 0 ? [1, 1, 1, 1, 0, 0] : [0, 0, 1, 1, 0, 0];

  return {
    opacity: useTransform(progress, opacityInput, opacityOutput),
    local: useTransform(progress, [start - fade, end + fade], [0, 1]),
  };
}
