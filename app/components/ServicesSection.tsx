"use client";

import { MediaPlaceholder } from "./MediaPlaceholder";
import { SectionLabel } from "./SectionLabel";
import { useSite } from "./SiteProvider";

const serviceMedia = [
  {
    index: "01",
    goal: "strength" as const,
    imageSrc: "/strenght.png",
    imagePosition: "50% 56%",
    theme: "strength" as const,
  },
  {
    index: "02",
    goal: "shape" as const,
    imageSrc: "/loss-fat.png",
    imagePosition: "50% 52%",
    theme: "endurance" as const,
  },
  {
    index: "03",
    goal: "performance" as const,
    imageSrc: "/endurance.png",
    imagePosition: "50% 48%",
    theme: "performance" as const,
  },
];

export function ServicesSection() {
  const { content, setContactGoal } = useSite();
  const services = serviceMedia.map((service, index) => ({ ...service, ...content.services.items[index] }));

  return (
    <section className="section coaching-section" id="coaching">
      <div className="shell">
        <div className="editorial-grid section-intro coaching-intro">
          <SectionLabel number="01" label={content.services.label} />
          <h2 className="editorial-major"><span className="editorial-major__muted">{content.services.headlineMuted}</span> {content.services.headline}</h2>
          <p className="section-summary">{content.services.summary}</p>
        </div>

        <div className="coaching-services">
          {services.map((service) => (
            <article className="service-row" key={service.index}>
              <MediaPlaceholder
                label={service.category}
                ratio="landscape"
                index={service.index}
                theme={service.theme}
                imageSrc={service.imageSrc}
                imageAlt={service.imageAlt}
                imagePosition={service.imagePosition}
              />
              <div className="service-row__content">
                <span className="service-row__index">{service.index}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a className="service-row__arrow" href="#contact" onClick={() => setContactGoal(service.goal)}>
                  {content.services.cta} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
