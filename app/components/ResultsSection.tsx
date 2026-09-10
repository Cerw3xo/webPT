"use client";

import Image from "next/image";
import { SectionLabel } from "./SectionLabel";
import { useSite } from "./SiteContext";
import "./ResultsSection.css";
import "./Typography.css";

export function ResultsSection() {
  const { content } = useSite();
  const testimonials = content.references.cards;
  const columnCount = Math.min(Math.max(testimonials.length, 2), 4);

  return (
    <section className={`results-section${testimonials.length === 0 ? " results-section--empty" : ""}`} id="results">
      <div className="container gutter results-intro">
        <SectionLabel number="05" label={content.references.label} />
        <h2 className="editorial-major"><span className="editorial-major__muted">{content.references.headlineMuted}</span> {content.references.headline}</h2>
        {content.references.summary ? (
          <div className="results-intro__aside">
            <p className="section-summary">{content.references.summary}</p>
          </div>
        ) : null}
      </div>

      {testimonials.length > 0 ? (
        <div className="results-viewport container gutter">
          <div
            className={`results-track results-track--messages results-track--${columnCount}`}
            aria-label={content.references.label}
          >
            {testimonials.map((testimonial, index) => (
              <article className="result-card result-message-card" key={`${testimonial.name}-${index}`}>
                <div className="result-message-card__meta">
                  <span>
                    {testimonial.name}{testimonial.age ? `, ${testimonial.age}` : ""}
                  </span>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                {testimonial.image ? (
                  <div className="result-message-card__media">
                    <Image src={testimonial.image} alt={testimonial.name} fill sizes="(max-width: 900px) 82vw, 25vw" />
                  </div>
                ) : null}
                <div className="result-message-card__thread">
                  <div className="message-bubble message-bubble--client">
                    <p>“{testimonial.message}”</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
