import { MediaPlaceholder } from "./MediaPlaceholder";
import { SectionHeader } from "./SectionHeader";

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
        <SectionHeader index="02" label="O mne" title="Coach. Athlete. Student of performance." />

        <div className="about-grid">
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
    <section className="section" id="coaching">
      <div className="shell">
        <SectionHeader index="03" label="Coaching" title="Built around what you want to do." />

        <div className="service-list">
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
        <SectionHeader index="04" label="Metóda" title="Simple process. Serious intent." />

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
      <div className="shell">
        <SectionHeader index="05" label="Výsledky" title="The work shows." />
      </div>

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

      <div className="shell results-controls" aria-hidden="true">
        <span>Drag to explore</span>
        <div className="results-controls__line"><i /></div>
        <span>01 / 04</span>
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
          Build a body<br />that can do<br /><span className="accent-word">more.</span>
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
        <SectionHeader index="06" label="Kontakt" title="Start the conversation." />

        <div className="contact-grid">
          <div className="contact-intro">
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
              Odoslať žiadosť <span>↗</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
