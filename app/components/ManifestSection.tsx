"use client";

import { useSite } from "./SiteContext";

export function ManifestSection() {
  const { content } = useSite();

  return (
    <section className="section manifest-section" id="manifest" aria-label={content.manifest.label}>
      <div className="shell">
        <div className="manifest-layout">
          <p className="manifest-label">
            <span className="manifest-label__accent" aria-hidden="true" />
            <span className="manifest-label__line" aria-hidden="true" />
            <span>{content.manifest.label}</span>
          </p>

          <div className="manifest-content">
            <h2 className="manifest-quote">
              <span>{content.manifest.statement}</span>{" "}
              <span className="manifest-quote__muted">{content.manifest.statementMuted}</span>
            </h2>

            <dl className="manifest-pillars">
              {content.manifest.pillars.map((pillar) => (
                <div className="manifest-pillar" key={pillar.title}>
                  <dt>{pillar.title}</dt>
                  <dd>{pillar.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
