"use client";

import { SectionLabel } from "./SectionLabel";
import { useSite } from "./SiteProvider";

export function ProcessSection() {
  const { content } = useSite();

  return (
    <section className="section philosophy-section" id="process">
      <div className="shell">
        <div className="editorial-grid section-intro process-intro">
          <SectionLabel number="02" label={content.process.label} />
          <h2 className="editorial-major"><span className="editorial-major__muted">{content.process.headlineMuted}</span> {content.process.headline}</h2>
          <p className="section-summary">{content.process.summary}</p>
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
      </div>
    </section>
  );
}
