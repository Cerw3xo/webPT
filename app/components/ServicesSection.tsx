"use client";

import { MediaPlaceholder } from "./MediaPlaceholder";
import { SectionLabel } from "./SectionLabel";
import { EditorialCta } from "./EditorialCta";
import { useSite } from "./SiteContext";

const serviceMedia = [
  {
    index: "01",
    imageSrc: "/strenght.png",
    imagePosition: "50% 56%",
    theme: "strength" as const,
  },
  {
    index: "02",
    imageSrc: "/loss-fat.png",
    imagePosition: "50% 52%",
    theme: "endurance" as const,
  },
  {
    index: "03",
    imageSrc: "/endurance.png",
    imagePosition: "50% 48%",
    theme: "performance" as const,
  },
];

export function ServicesSection() {
  const { content } = useSite();
  const services = serviceMedia.map((service, index) => ({ ...service, ...content.services.items[index] }));

  return (
    <section className="section coaching-section" id="coaching">
      <div className="shell">
        <div className="editorial-grid section-intro coaching-intro">
          <SectionLabel number="01" label={content.services.label} />
          <h2 className="editorial-major training-heading">
            <span>{content.services.headline}</span>
            <span>
              {content.services.headlineContinuation}{" "}
              <span className="editorial-major__muted">{content.services.headlineMuted}</span>
            </span>
          </h2>
        </div>

        <div className="training-grid">
          {services.map((service) => (
            <article className="training-card" key={service.index}>
              <MediaPlaceholder
                label={service.category}
                ratio="square"
                index={service.index}
                theme={service.theme}
                imageSrc={service.imageSrc}
                imageAlt={service.imageAlt}
                imagePosition={service.imagePosition}
              />
              <div className="training-card__content">
                <span className="training-card__index">{service.index}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="training-cta-row">
          <EditorialCta
            className="editorial-cta--border-glow editorial-cta--subtle-glow"
            href="#contact"
            label={content.services.sectionCta}
            variant="micro-accent"
          />
        </div>
      </div>
    </section>
  );
}
