"use client";

import { useSite } from "./SiteProvider";

export function FinalCta() {
  const { content } = useSite();

  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="shell final-cta__inner">
        <p className="eyebrow">{content.finalCta.eyebrow}</p>
        <h2 className="display-type" id="final-cta-title">
          {content.finalCta.headline} <span className="accent-word">{content.finalCta.accent}</span>
        </h2>
        <a className="cta-button" href="#contact">
          {content.finalCta.cta} <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
