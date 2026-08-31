"use client";

import { MediaPlaceholder } from "./MediaPlaceholder";
import { SectionLabel } from "./SectionLabel";
import { useSite } from "./SiteProvider";

export function AboutSection() {
  const { content } = useSite();

  return (
    <section className="section about-section" id="about">
      <div className="shell">
        <div className="about-layout">
          <MediaPlaceholder
            label={content.about.portraitLabel}
            ratio="portrait"
            index="01"
            theme="profile"
            imageSrc="/IMG_6418.jpg"
            imageAlt={content.about.portraitAlt}
            imagePosition="50% 34%"
          />

          <div className="about-content">
            <SectionLabel number="03" label={content.about.label} />
            <h2 className="editorial-major">
              {content.about.headlineFirst}{" "}
              <span className="editorial-major__muted">{content.about.headlineMuted}</span>{" "}
              {content.about.headline}
            </h2>
            <div className="about-copy">
              <p className="lead-copy">{content.about.lead}</p>
              <p className="body-copy">{content.about.bodyOne}</p>
              <p className="body-copy">{content.about.bodyTwo}</p>
              <a className="text-link" href="#coaching">
                {content.about.cta} <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
