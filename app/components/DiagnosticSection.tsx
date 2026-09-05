"use client";

import { SectionLabel } from "./SectionLabel";
import { useSite } from "./SiteContext";
import "./DiagnosticSection.css";
import "./Typography.css";

export function DiagnosticSection() {
  const { content } = useSite();

  return (
    <section className="diagnostic-section" id="diagnostika">
      <div className="container gutter">
        <div className="diagnostic-composition">
          <div className="diagnostic-intro">
            <SectionLabel number="04" label={content.diagnostic.label} />
            <h2 className="editorial-major">
              <span>{content.diagnostic.headline}</span>
              <span className="editorial-major__muted">{content.diagnostic.headlineMuted}</span>
            </h2>
            <div className="diagnostic-summary">
              {content.diagnostic.summary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="diagnostic-conclusion">
              <strong>{content.diagnostic.conclusion}</strong>
            </p>
          </div>

          <ol className="diagnostic-details" aria-label={content.diagnostic.detailsLabel}>
            {content.diagnostic.details.map((detail, index) => (
              <li className="diagnostic-detail" key={detail.title}>
                <span className="diagnostic-detail__index">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{detail.title}</h3>
                  <p>{detail.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
