import { motion, useTransform, type MotionValue } from "motion/react";
import type { Chapter } from "./chapters";
import s from "./ScrollProgressIndicator.module.css";

type Props = { chapters: Chapter[]; progress: MotionValue<number>; label: string };

function Tick({ chapter, progress, index, total }: { chapter: Chapter; progress: MotionValue<number>; index: number; total: number }) {
  const span = 1 / total;
  const opacity = useTransform(
    progress,
    [span * (index - 0.4), span * (index + 0.2), span * (index + 0.9), span * (index + 1.4)],
    [0.28, 1, 1, 0.28],
  );
  return <motion.span className={s.tick} style={{ opacity }}>{chapter.index}</motion.span>;
}

export function ScrollProgressIndicator({ chapters, progress, label }: Props) {
  const scaleY = useTransform(progress, [0, 1], [0, 1]);
  return (
    <aside className={s.wrap} aria-label={label}>
      <div className={s.track} aria-hidden="true"><motion.div className={s.bar} style={{ scaleY }} /></div>
      <div className={s.ticks}>
        {chapters.map((chapter, index) => (
          <Tick key={chapter.id} chapter={chapter} progress={progress} index={index} total={chapters.length} />
        ))}
      </div>
    </aside>
  );
}
