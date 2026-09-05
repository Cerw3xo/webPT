"use client";

import { SectionLabel } from "./SectionLabel";
import { EditorialCta } from "./EditorialCta";
import { useSite } from "./SiteContext";
import g from "./sections.module.css";
import styles from "./ProcessSection.module.css";

export function ProcessSection() {
  const { content } = useSite();

  return (
    <section className={`${styles.section} ${g.pad} gutter`} id="process">
      <div className={g.inner}>
        <div>
          <SectionLabel number="02" label={content.process.label} />
          <h2 className={`${g.h2} ${styles.heading}`}>
            <span>{content.process.headline}</span>
            <span className={g.soft}>{content.process.headlineMuted}</span>
          </h2>
          <p className={`${g.lead} ${styles.summary}`}>{content.process.summary}</p>
        </div>

        <div className={styles.grid}>
          {content.process.steps.map((step, index) => (
            <article className={`${styles.cell} ${styles.step}`} key={step.title}>
              <span className={styles.num}>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={`${g.body} ${styles.copy}`}>{step.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.ctaRow}>
          <EditorialCta href="#contact" label={content.process.cta} />
        </div>
      </div>
    </section>
  );
}
