import { CinematicChapter } from "./CinematicChapter";

const chapters = [
  { number: "02", line: "Build endurance.", label: "Run / Condition / Move", theme: "endurance" as const },
  { number: "03", line: "Build performance.", label: "Box / Move / Repeat", theme: "performance" as const },
];

export function IntroSequence() {
  return (
    <section className="intro-sequence" id="top" aria-label="Tréningový manifest">
      <CinematicChapter
        number="01"
        discipline="Strength"
        headline={["Build", "strength."]}
        mediaLabel="Deadlift / strength training"
      />

      {chapters.map((chapter, index) => (
        <article className="intro-chapter" data-chapter={chapter.number} key={chapter.number}>
          <div className="intro-chapter__content">
            <div className="intro-chapter__meta">
              <p className="eyebrow">Chapter {chapter.number}</p>
              <span>{chapter.label}</span>
            </div>
            <div>
              <h1 className="display-type">{chapter.line}</h1>
              <a className="chapter-link" href="#coaching">
                Explore the method <span aria-hidden="true">↗</span>
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
          <p className="eyebrow">The outcome</p>
          <h2 className="display-type">
            Build a body
            <br />
            that can <span className="accent-word">do more.</span>
          </h2>
          <a className="text-link" href="#coaching">
            Begin the work <span aria-hidden="true">↓</span>
          </a>
        </div>
      </article>
    </section>
  );
}
