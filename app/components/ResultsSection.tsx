"use client";

import { SectionLabel } from "./SectionLabel";
import { useSite } from "./SiteProvider";

export function ResultsSection() {
  const { content } = useSite();

  return (
    <section className="section results-section" id="results">
      <div className="shell editorial-grid results-intro">
        <SectionLabel number="05" label={content.references.label} />
        <h2 className="editorial-major"><span className="editorial-major__muted">{content.references.headlineMuted}</span> {content.references.headline}</h2>
        <div className="results-intro__aside">
          <p className="section-summary">{content.references.summary}</p>
        </div>
      </div>

      <div className="results-viewport shell">
        <div className="results-track results-track--messages" aria-label={content.references.label}>
          {content.references.cards.map((card, index) => (
            <article className="result-card result-message-card" key={card.label}>
              <div className="result-message-card__meta">
                <span>{card.label}</span>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="result-message-card__thread">
                <div className="message-bubble message-bubble--coach">
                  <p>{card.message}</p>
                  <span>{content.references.coach}</span>
                </div>
                <div className="message-bubble message-bubble--pending">
                  <span>{content.references.pending}</span>
                </div>
              </div>
              <a className="text-link result-message-card__cta" href="#contact">
                {content.references.cta} <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
