import { MediaPlaceholder } from "./MediaPlaceholder";

const coachingServices = [
  {
    index: "01",
    title: "Strength",
    text: "Buduj silu, ktorá sa prenáša do športu aj každodenného života.",
  },
  {
    index: "02",
    title: "Conditioning",
    text: "Rozvíjaj motor, ktorý vydrží pracovať, regenerovať a opakovať výkon.",
  },
  {
    index: "03",
    title: "Hybrid training",
    text: "Spoj silu a vytrvalosť bez toho, aby jedna brzdila druhú.",
  },
];

const process = [
  { index: "01", title: "Assess", text: "Zistíme, kde si a čo ťa limituje." },
  { index: "02", title: "Plan", text: "Vytvoríme systém okolo tvojho cieľa." },
  { index: "03", title: "Train", text: "Pracujeme presne, tvrdo a udržateľne." },
  { index: "04", title: "Progress", text: "Meriame, upravujeme a posúvame ďalej." },
];

const clients = [
  {
    index: "01",
    name: "Martin K.",
    focus: "Hybrid athlete",
    metric: "+32 kg",
    detail: "na total za 16 týždňov",
  },
  {
    index: "02",
    name: "Lucia V.",
    focus: "Strength",
    metric: "1.6× BW",
    detail: "nový osobný rekord v drepe",
  },
  {
    index: "03",
    name: "Tomáš R.",
    focus: "Conditioning",
    metric: "−06:18",
    detail: "z času na 10 kilometrov",
  },
  {
    index: "04",
    name: "Nina P.",
    focus: "Performance",
    metric: "12 týž.",
    detail: "konzistentného progresu",
  },
];

export function AboutSection() {
  return (
    <section className="section about-section" id="about">
      <div className="shell">
        <div className="editorial-grid about-composition">
          <p className="section-kicker"><span>01</span> / About</p>
          <h2 className="editorial-major">Coach. Athlete. Student of performance.</h2>
          <MediaPlaceholder label="Coach portrait" ratio="portrait" index="01" theme="profile" />
          <div className="about-copy">
            <p className="lead-copy">
              Pripravujem ľudí na výkon, ktorý má zmysel aj mimo tréningovej haly.
            </p>
            <p className="body-copy">
              Spájam silový tréning, kondíciu a atletický pohyb do jasného systému. Bez skratiek, s rešpektom k tvojmu cieľu aj životu mimo tréningu.
            </p>
            <a className="text-link" href="#coaching">
              Ako trénujeme <span aria-hidden="true">↓</span>
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
          <p className="section-kicker"><span>02</span> / Coaching</p>
          <h2 className="editorial-major">Built around what you want to do.</h2>
          <p className="section-summary">Tréning je postavený okolo toho, čo chceš vedieť robiť — nie iba okolo toho, čo chceš vidieť v zrkadle.</p>
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
                  Zistiť viac <span aria-hidden="true">↗</span>
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
    <section className="section philosophy-section">
      <div className="shell">
        <div className="editorial-grid section-intro process-intro">
          <p className="section-kicker"><span>03</span> / Process</p>
          <h2 className="editorial-major">Simple process. Serious intent.</h2>
          <p className="section-summary">Jasný rámec, ktorý dáva tréningu smer a zároveň priestor reagovať na reálny život.</p>
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
        <p className="section-kicker"><span>04</span> / Results</p>
        <h2 className="editorial-major">The work shows.</h2>
        <div className="results-intro__aside">
          <p className="section-summary">Každý progres má vlastný kontext. Tu sú krátke záznamy práce, ktorá sa preniesla ďalej.</p>
          <div className="results-controls" aria-hidden="true">
            <span>Drag to explore</span>
            <div className="results-controls__line"><i /></div>
            <span>01 / 04</span>
          </div>
        </div>
      </div>

      <div className="results-viewport shell">
        <div className="results-track" aria-label="Výsledky klientov">
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
        <p className="eyebrow">The standard</p>
        <h2 className="display-type" id="final-cta-title">
          Build a body that can do <span className="accent-word">more.</span>
        </h2>
        <a className="cta-button" href="#contact">
          Začať spoluprácu <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

const contactFields = ["Meno", "E-mail", "O čo máš záujem?", "Povedz mi o svojom cieli"];

export function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <div className="shell">
        <div className="contact-grid">
          <div className="contact-intro">
            <p className="section-kicker"><span>05</span> / Contact</p>
            <h2 className="contact-title">Start the conversation.</h2>
            <p className="lead-copy">Dobrý tréning začína dobrým kontextom. Napíš mi, kam sa chceš dostať.</p>
            <a href="mailto:hello@mtcoaching.sk">hello@mtcoaching.sk</a>
            <p>Bratislava / Online coaching</p>
          </div>

          <div className="contact-form-visual" aria-label="Ukážka kontaktného formulára">
            {contactFields.map((field, index) => (
              <div className={`visual-field ${index === contactFields.length - 1 ? "visual-field--large" : ""}`} key={field}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{field}</p>
              </div>
            ))}
            <div className="visual-submit" aria-hidden="true">
              Odoslať <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
