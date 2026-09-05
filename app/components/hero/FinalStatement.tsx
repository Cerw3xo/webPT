import { motion, useTransform, type MotionValue } from "motion/react";
import { EditorialCta } from "../EditorialCta";
import { useSite } from "../SiteContext";
import { HERO_TIMING } from "./chapters";
import s from "./FinalStatement.module.css";

export function FinalStatement({ progress }: { progress: MotionValue<number> }) {
  const { content } = useSite();
  const opacity = useTransform(progress, HERO_TIMING.final.opacityInput, HERO_TIMING.final.opacityOutput);
  const y = useTransform(progress, [0, 1], HERO_TIMING.final.y);
  const blur = useTransform(progress, HERO_TIMING.final.blurInput, HERO_TIMING.final.blurOutput);
  const filter = useTransform(blur, (value) => `blur(${value.toFixed(2)}px)`);

  return (
    <article className={s.wrap}>
      <motion.div className={s.motion} style={{ opacity, y, filter }}>
        <div className={s.composition}>
          <div className={`container gutter ${s.inner}`}>
            <p className={s.kicker}>{content.hero.finalLabel}</p>
            <h2 className={s.heading}>
              {content.hero.finalLineOne}
              <br />
              <span className={s.soft}>{content.hero.finalLineTwo}</span> {content.hero.finalLineThree}
            </h2>
            <div className={s.copy}>
              <p>{content.hero.finalLead}</p>
              <p className={s.services}>{content.hero.finalServices}</p>
            </div>
            <EditorialCta href="#coaching" label={content.hero.finalCta} />
          </div>
        </div>
      </motion.div>
    </article>
  );
}
