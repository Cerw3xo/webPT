"use client";

import { MediaPlaceholder } from "./MediaPlaceholder";
import { SectionLabel } from "./SectionLabel";
import { useSite } from "./SiteContext";

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
              <span className="about-headline__line">{content.about.headlineFirst}</span>
              <span className="about-headline__line editorial-major__muted">
                {content.about.headlineMuted}
              </span>
              <span className="about-headline__line">{content.about.headline}</span>
            </h2>
            <div className="about-copy">
              <p className="body-copy about-description">{content.about.description}</p>
              <dl className="about-stats" aria-label={content.about.label}>
                {content.about.stats.map((stat) => (
                  <div className="about-stat" key={stat.label}>
                    <dt>{stat.value}</dt>
                    <dd>{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
