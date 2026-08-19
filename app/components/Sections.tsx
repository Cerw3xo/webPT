import { MediaPlaceholder } from "./MediaPlaceholder";

const coachingServices = [
  {
    index: "01",
    title: "Síla",
    text: "Budování síly, svalů a kvalitní techniky.",
  },
  {
    index: "02",
    title: "Kondice",
    text: "Vytrvalost, pracovní kapacita a lepší kondice.",
  },
  {
    index: "03",
    title: "Hybridní trénink",
    text: "Síla, kondice a atletický pohyb v jednom systému.",
  },
];

const process = [
  { index: "01", title: "Zhodnocení", text: "Zjistíme výchozí stav." },
  { index: "02", title: "Plán", text: "Nastavíme směr a priority." },
  { index: "03", title: "Trénink", text: "Pracujeme systematicky." },
  { index: "04", title: "Progres", text: "Sledujeme výsledky a upravujeme plán." },
];

const clients = [
  {
    index: "01",
    name: "Martin K.",
    focus: "Hybridní trénink",
    metric: "+32 kg",
    detail: "na součet za 16 týdnů",
  },
  {
    index: "02",
    name: "Lucie V.",
    focus: "Síla",
    metric: "1.6× BW",
    detail: "nový osobní rekord v dřepu",
  },
  {
    index: "03",
    name: "Tomáš R.",
    focus: "Kondice",
    metric: "−06:18",
    detail: "z času na 10 kilometrů",
  },
  {
    index: "04",
    name: "Nina P.",
    focus: "Výkon",
    metric: "12 týd.",
    detail: "průběžného progresu",
  },
];

export function AboutSection() {
  return (
    <section className="section about-section" id="about">
      <div className="shell">
        <div className="editorial-grid about-composition">
          <p className="section-kicker"><span>01</span> / O mně</p>
          <h2 className="editorial-major">Trenér. Sportovec. Stále se zlepšuju.</h2>
          <MediaPlaceholder label="Portrét trenéra" ratio="portrait" index="01" theme="profile" />
          <div className="about-copy">
            <p className="lead-copy">
              Trénink pro mě není jen o vzhledu. Síla, kondice a kvalitní pohyb tvoří základ dlouhodobého výkonu.
            </p>
            <p className="body-copy">
              Pomáhám lidem trénovat systematicky, bezpečně a s jasným cílem.
            </p>
            <a className="text-link" href="#coaching">
              Jak trénujeme <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CoachingSection() {
  return (
    <section className="section coaching-section" id="coaching">
      <div className="shell">
        <div className="editorial-grid section-intro coaching-intro">
          <p className="section-kicker"><span>02</span> / Trénink</p>
          <h2 className="editorial-major">Trénink podle toho, čeho chceš dosáhnout.</h2>
          <p className="section-summary">Trénink podle toho, čeho chceš dosáhnout — ne jen podle toho, co chceš vidět v zrcadle.</p>
        </div>

        <div className="coaching-services">
          {coachingServices.map((service) => (
            <article className="service-row" key={service.index}>
              <MediaPlaceholder
                label={service.title}
                ratio="landscape"
                index={service.index}
                theme={service.index === "01" ? "strength" : service.index === "02" ? "endurance" : "performance"}
              />
              <div className="service-row__content">
                <span className="service-row__index">{service.index}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a className="service-row__arrow" href="#contact">
                Zjistit víc <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PhilosophySection() {
  return (
    <section className="section philosophy-section" id="process">
      <div className="shell">
        <div className="editorial-grid section-intro process-intro">
          <p className="section-kicker"><span>03</span> / Proces</p>
          <h2 className="editorial-major">Jednoduchý proces. Jasný cíl.</h2>
          <p className="section-summary">Jasný rámec, který dává tréninku směr a zároveň prostor reagovat na reálný život.</p>
        </div>

        <div className="process-grid">
          {process.map((step) => (
            <article className="process-step" key={step.index}>
              <span className="process-step__index">{step.index}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ResultsSection() {
  return (
    <section className="section results-section" id="results">
      <div className="shell editorial-grid results-intro">
        <p className="section-kicker"><span>04</span> / Výsledky</p>
        <h2 className="editorial-major">Výsledky mluví.</h2>
        <div className="results-intro__aside">
          <p className="section-summary">Každý progres má vlastní kontext. Tady jsou krátké záznamy práce, která se posunula dál.</p>
          <div className="results-controls" aria-hidden="true">
            <span>Táhni pro prohlédnutí</span>
            <div className="results-controls__line"><i /></div>
            <span>01 / 04</span>
          </div>
        </div>
      </div>

      <div className="results-viewport shell">
        <div className="results-track" aria-label="Výsledky klientů">
          {clients.map((client) => (
            <article className="result-card" key={client.index}>
              <MediaPlaceholder label={client.focus} ratio="portrait" index={client.index} theme="result" />
              <div className="result-card__identity">
                <div>
                  <h3>{client.name}</h3>
                  <p>{client.focus}</p>
                </div>
                <span>{client.index}</span>
              </div>
              <div className="result-card__metric">
                <strong>{client.metric}</strong>
                <span>{client.detail}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="shell final-cta__inner">
        <p className="eyebrow">Standard</p>
        <h2 className="display-type" id="final-cta-title">
          Vybuduj tělo, které zvládne <span className="accent-word">víc.</span>
        </h2>
        <a className="cta-button" href="#contact">
          Začít trénovat <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

const contactFields = ["Jméno", "E-mail / Instagram", "Tvůj cíl", "Zpráva"];

export function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <div className="shell">
        <div className="contact-grid">
          <div className="contact-intro">
            <p className="section-kicker"><span>05</span> / Kontakt</p>
            <h2 className="contact-title">Začněme spolu.</h2>
            <p className="lead-copy">Napiš mi svůj cíl a stručně popiš, s čím chceš pomoct.</p>
            <a href="mailto:hello@mtcoaching.sk">hello@mtcoaching.sk</a>
            <p>Praha / Online trénink</p>
          </div>

          <div className="contact-form-visual" aria-label="Ukázka kontaktního formuláře">
            {contactFields.map((field, index) => (
              <div className={`visual-field ${index === contactFields.length - 1 ? "visual-field--large" : ""}`} key={field}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{field}</p>
              </div>
            ))}
            <div className="visual-submit" aria-hidden="true">
              Odeslat <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
