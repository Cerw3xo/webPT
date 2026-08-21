import { HeroSection } from "./HeroSection";

export function IntroSequence() {
  return (
    <section className="intro-sequence" id="top" aria-label="Tréninkový manifest">
      <HeroSection />

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
