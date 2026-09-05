"use client";

import Image from "next/image";
import { SectionLabel } from "./SectionLabel";
import { EditorialCta } from "./EditorialCta";
import { useSite } from "./SiteContext";
import g from "./sections.module.css";
import styles from "./ServicesSection.module.css";

const serviceMedia = [
  {
    index: "01",
    imageSrc: "/pillar-strength.jpg",
    imagePosition: "50% 50%",
  },
  {
    index: "02",
    imageSrc: "/pillar-conditioning.jpg",
    imagePosition: "50% 52%",
  },
  {
    index: "03",
    imageSrc: "/pillar-hybrid.jpg",
    imagePosition: "50% 48%",
  },
];

export function ServicesSection() {
  const { content } = useSite();
  const services = serviceMedia.map((service, index) => ({ ...service, ...content.services.items[index] }));

  return (
    <section className={`${styles.section} ${g.pad} gutter`} id="coaching">
      <div className={g.inner}>
        <div className={styles.head}>
          <div className={styles.headLabel}>
            <SectionLabel number="01" label={content.services.label} />
          </div>
          <div className={styles.headTitle}>
            <h2 className={`${g.h2} ${styles.heading}`}>
              <span>{content.services.headline}</span>
              <span>
                {content.services.headlineContinuation}{" "}
                <span className={g.soft}>{content.services.headlineMuted}</span>
              </span>
            </h2>
          </div>
        </div>

        <div className={styles.grid}>
          {services.map((service) => (
            <article className={styles.cell} key={service.index}>
              <div className={styles.card}>
                <div className={styles.figure}>
                  <Image
                    className={styles.image}
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                    style={{ objectPosition: service.imagePosition }}
                  />
                  <div className={styles.imageTint} aria-hidden="true" />
                </div>
                <div className={styles.content}>
                  <p className={`${g.tag} ${styles.index}`}>{service.index}</p>
                  <h3 className={`${g.cardTitle} ${styles.title}`}>{service.title}</h3>
                  <p className={`${g.body} ${styles.copy}`}>{service.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.ctaRow}>
          <EditorialCta
            href="#contact"
            label={content.services.sectionCta}
          />
        </div>
      </div>
    </section>
  );
}
