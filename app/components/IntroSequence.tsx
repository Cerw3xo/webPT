import Image from "next/image";
import { CinematicChapter } from "./CinematicChapter";

const chapters = [
  { number: "02", line: "Buduj vytrvalost.", label: "Běh / kondice / pohyb", theme: "endurance" as const },
  { number: "03", line: "Buduj výkon.", label: "Box / pohyb / opakování", theme: "performance" as const },
];

export function IntroSequence() {
  return (
    <section className="intro-sequence" id="top" aria-label="Tréninkový manifest">
      <CinematicChapter
        number="01"
        discipline="Síla"
        headline={["Buduj", "sílu."]}
        mediaLabel="Mrtvý tah / silový trénink"
        media={
          <Image
            className="cinematic-chapter__hero-image"
            src="/Obrázok Codex 21. 8. 2026, 13_36_56.png"
            alt="Atlet při přípravě na mrtvý tah"
            width={1672}
            height={941}
            unoptimized
          />
        }
      />

      {chapters.map((chapter, index) => (
        <article className="intro-chapter" data-chapter={chapter.number} key={chapter.number}>
          <div className="intro-chapter__content">
            <div className="intro-chapter__meta">
              <p className="eyebrow">Kapitola {chapter.number}</p>
              <span>{chapter.label}</span>
            </div>
            <div>
              <h1 className="display-type">{chapter.line}</h1>
              <a className="chapter-link" href="#coaching">
                Prozkoumat metodu <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className="intro-chapter__media">
            <span className="media-index">0{index + 1} / 03</span>
            <span className="intro-chapter__media-label">{chapter.label}</span>
            <span className={`intro-chapter__media-shape intro-chapter__media-shape--${chapter.theme}`} aria-hidden="true" />
          </div>
        </article>
      ))}

      <article className="intro-final">
        <div className="shell intro-final__inner">
          <p className="eyebrow">Výsledek</p>
          <h2 className="display-type">
            Vybuduj tělo,
            <br />
            které zvládne <span className="accent-word">víc.</span>
          </h2>
          <a className="text-link" href="#coaching">
            Začít trénovat <span aria-hidden="true">↓</span>
          </a>
        </div>
      </article>
    </section>
  );
}
