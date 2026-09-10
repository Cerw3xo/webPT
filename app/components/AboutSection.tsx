"use client";

import Image from "next/image";
import { SectionLabel } from "./SectionLabel";
import { useSite } from "./SiteContext";
import g from "./sections.module.css";
import styles from "./AboutSection.module.css";

export function AboutSection() {
  const { content } = useSite();

  return (
    <section className={`${styles.section} ${g.pad} gutter`} id="about">
      <div className={`${g.inner} ${styles.grid}`}>
        <div className={styles.mediaCol}>
          <div className={styles.media}>
            <Image
              className={styles.portrait}
              src="/IMG_6477.JPG"
              alt={content.about.portraitAlt}
              fill
              sizes="(max-width: 1023px) 100vw, 42vw"
              style={{ objectPosition: "50% 40%" }}
            />
          </div>
        </div>

        <div className={styles.textCol}>
          <SectionLabel number="02" label={content.about.label} />
          <h2 className={`${g.h2} ${g.h2Large} ${styles.heading}`}>
            <span>{content.about.headlineFirst}</span>
            <span className={g.soft}>{content.about.headlineMuted}</span>
          </h2>
          <div className={`${g.lead} ${styles.copy}`}>
            {content.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              {content.about.bridge}{" "}
              <strong className={styles.emphasis}>{content.about.emphasis}</strong>{" "}
              {content.about.conclusion}
            </p>
            <dl className={styles.stats} aria-label={content.about.label}>
              {content.about.stats.map((stat) => (
                <div className={styles.stat} data-localized-stat key={stat.label}>
                  <dt className={styles.statValue}>{stat.value}</dt>
                  <dd className={styles.statKey}>{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
