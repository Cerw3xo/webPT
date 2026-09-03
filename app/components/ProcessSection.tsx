"use client";

import { SectionLabel } from "./SectionLabel";
import { EditorialCta } from "./EditorialCta";
import { useSite } from "./SiteContext";

export function ProcessSection() {
  const { content } = useSite();

  return (
    <section className="section philosophy-section" id="process">
      <div className="shell">
        <div className="editorial-grid section-intro process-intro">
          <SectionLabel number="02" label={content.process.label} />
          <h2 className="editorial-major process-heading">
            <span>{content.process.headline}</span>
            <span className="editorial-major__muted">{content.process.headlineMuted}</span>
          </h2>
        </div>

        <div className="process-grid">
          {content.process.steps.map((step, index) => (
            <article className="process-step" key={step.title}>
              <span className="process-step__index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="process-cta-row">
          <EditorialCta href="#contact" label={content.process.cta} variant="minimal-text" />
        </div>
      </div>
    </section>
  );
}
