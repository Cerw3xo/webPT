const chapters = [
  { number: "01", line: "Build strength." },
  { number: "02", line: "Build endurance." },
  { number: "03", line: "Build performance." },
];

export function IntroSequence() {
  return (
    <section className="intro-sequence" id="top" aria-label="Tréningový manifest">
      {chapters.map((chapter, index) => (
        <article className="intro-chapter" data-chapter={chapter.number} key={chapter.number}>
          <div className="intro-chapter__media" aria-hidden="true">
            <span className="media-index">0{index + 1} / 03</span>
          </div>

          <div className="intro-chapter__content shell">
            <p className="eyebrow">Chapter {chapter.number}</p>
            <h1 className="display-type">{chapter.line}</h1>
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
            Explore coaching <span aria-hidden="true">↓</span>
          </a>
        </div>
      </article>
    </section>
  );
}
