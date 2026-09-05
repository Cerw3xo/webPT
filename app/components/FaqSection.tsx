"use client";

import { SectionLabel } from "./SectionLabel";
import { useSite } from "./SiteContext";
import g from "./sections.module.css";
import styles from "./FaqSection.module.css";

export function FaqSection() {
  const { content } = useSite();

  return (
    <section className={`${styles.section} ${g.pad} gutter`} id="faq" aria-label={content.faq.ariaLabel}>
      <div className={`${g.inner} ${g.grid12}`}>
        <header className={styles.head}>
          <SectionLabel number="06" label={content.faq.label} />
          <h2 className={`${g.h2} ${styles.title}`}>
            {content.faq.headline}
            <br />
            <span className={g.soft}>{content.faq.headlineMuted}</span>
          </h2>
        </header>

        <div className={styles.list} data-localized-faq>
          <dl className={styles.dl}>
            {content.faq.items.map((item) => (
              <div className={styles.row} key={item.question}>
                <dt className={styles.question}>{item.question}</dt>
                <dd className={styles.answer}>{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
