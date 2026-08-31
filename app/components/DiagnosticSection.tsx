"use client";

import { SectionLabel } from "./SectionLabel";
import { useSite } from "./SiteProvider";

export function DiagnosticSection() {
  const { content } = useSite();

  return (
    <section className="section diagnostic-section" id="diagnostika">
      <div className="shell">
        <div className="editorial-grid diagnostic-composition">
          <SectionLabel number="04" label={content.diagnostic.label} />
          <h2 className="editorial-major"><span className="editorial-major__muted">{content.diagnostic.headlineMuted}</span> {content.diagnostic.headline}</h2>
          <div className="diagnostic-copy">
            <p className="lead-copy">{content.diagnostic.lead}</p>
            <p className="body-copy">{content.diagnostic.body}</p>
          </div>
          <div className="diagnostic-details" aria-label={content.diagnostic.detailsLabel}>
            {content.diagnostic.details.map((detail) => <span key={detail}>{detail}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
