import { MediaPlaceholder } from "./MediaPlaceholder";

const coachingServices = [
  {
    index: "01",
    title: "Silový trénink",
    text: "Budování svalů, síly a správných pohybových návyků.",
  },
  {
    index: "02",
    title: "Kondice a pohyb",
    text: "Lepší kondice, kontrola těla a vyšší pracovní kapacita.",
  },
  {
    index: "03",
    title: "Hybridní trénink",
    text: "Kombinace síly, kondice a atletického pohybu pro tělo, které zvládne víc.",
  },
];

const process = [
  { index: "01", title: "Zhodnocení", text: "Zjistíme aktuální stav, cíle a možnosti." },
  { index: "02", title: "Plán", text: "Nastavíme strategii, která dává smysl." },
  { index: "03", title: "Trénink", text: "Budujeme sílu, techniku a kondici." },
  { index: "04", title: "Progres", text: "Sledujeme výsledky a upravujeme směr." },
];

const clients = [
  {
    index: "01",
    name: "Karel",
    goal: "Síla + svalový růst",
    process: "Systematický progres",
    result: "Lepší výkon",
  },
  {
    index: "02",
    name: "Klient 02",
    goal: "Redukce tuku",
    process: "Síla jako základ",
    result: "Silnější tělo",
  },
  {
    index: "03",
    name: "Klient 03",
    goal: "Lepší kondice",
    process: "Postupné budování kapacity",
    result: "Více energie v pohybu",
  },
  {
    index: "04",
    name: "Klient 04",
    goal: "Hybridní výkonnost",
    process: "Síla + vytrvalost",
    result: "Stabilní progres",
  },
];

export function AboutSection() {
  return (
    <section className="section about-section" id="about">
      <div className="shell">
        <div className="editorial-grid about-composition">
          <p className="section-kicker"><span>01</span> / O mně</p>
          <h2 className="editorial-major">Trenér. Atlet. Hybridní sportovec.</h2>
          <MediaPlaceholder label="Portrét trenéra" ratio="portrait" index="01" theme="profile" />
          <div className="about-copy">
            <p className="lead-copy">
              Trénink pro mě nikdy nebyl pouze o vzhledu.
            </p>
            <p className="body-copy">
              Síla, kondice a kvalitní pohyb tvoří základ těla, které funguje dlouhodobě.
            </p>
            <p className="body-copy">
              Pomáhám lidem budovat silnější, schopnější a sebevědomější verzi sebe sama.
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

export function DiagnosticSection() {
  return (
    <section className="section diagnostic-section" id="diagnostika">
      <div className="shell">
        <div className="editorial-grid diagnostic-composition">
          <p className="section-kicker"><span>03</span> / Diagnostika</p>
          <h2 className="editorial-major">Nehádám. Analyzuji.</h2>
          <div className="diagnostic-copy">
            <p className="lead-copy">Nejdu pouze podle tabulky cviků.</p>
            <p className="body-copy">Nejdříve pochopím tvoje tělo, pohyb a cíle. Teprve potom nastavíme trénink, který má jasný směr.</p>
          </div>
          <div className="diagnostic-details" aria-label="Oblasti diagnostiky">
            <span>Pohybová diagnostika</span>
            <span>Technika cviků</span>
            <span>Individuální nastavení</span>
            <span>Odstranění slabých míst</span>
          </div>
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
          <p className="section-kicker"><span>04</span> / Proces</p>
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
        <p className="section-kicker"><span>05</span> / Výsledky</p>
        <h2 className="editorial-major">Výsledky mluví.</h2>
        <div className="results-intro__aside">
          <p className="section-summary">Připraveno pro skutečné příběhy klientů — jejich cíl, průběh práce a výsledek v kontextu.</p>
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
              <MediaPlaceholder label={client.goal} ratio="portrait" index={client.index} theme="result" />
              <div className="result-card__identity">
                <div>
                  <h3>{client.name}</h3>
                  <p>{client.goal}</p>
                </div>
                <span>{client.index}</span>
              </div>
              <div className="result-card__process">
                <span>Proces</span>
                <p>{client.process}</p>
              </div>
              <div className="result-card__metric">
                <strong>{client.result}</strong>
                <span>Výsledek</span>
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
        <p className="eyebrow">Začni svůj proces.</p>
        <h2 className="display-type" id="final-cta-title">
          Vybuduj tělo, které zvládne <span className="accent-word">víc.</span>
        </h2>
        <a className="cta-button" href="#contact">
          Úvodní konzultace <span aria-hidden="true">→</span>
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
            <p className="section-kicker"><span>06</span> / Kontakt</p>
            <h2 className="contact-title">Začněme spolu.</h2>
            <p className="lead-copy">Napiš mi svůj cíl a zjistíme, jak ti můžu pomoct.</p>
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
