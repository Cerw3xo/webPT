"use client";

import { useSite } from "./SiteContext";
import g from "./sections.module.css";
import styles from "./ManifestSection.module.css";

export function ManifestSection() {
  const { content } = useSite();

  return (
    <section className={`${styles.section} ${g.padLarge} gutter`} id="manifest" aria-label={content.manifest.label}>
      <div className={g.inner}>
        <div className={styles.grid}>
          <p className={styles.labelCol}>
            <span className={styles.labelAccent}>00</span>
            <span className={styles.labelLine} aria-hidden="true" />
            <span>{content.manifest.label}</span>
          </p>

          <div className={styles.contentCol}>
            <h2 className={styles.statement}>
              <span>
                {content.manifest.statement}{" "}
                <span className={styles.statementSoft}>{content.manifest.statementMuted}</span>
              </span>{" "}
              <span className={styles.statementSoft}>{content.manifest.description}</span>
            </h2>

          </div>
        </div>
      </div>
    </section>
  );
}
