const fields = ["Jméno", "E-mail / Instagram", "Tvůj cíl", "Zpráva"];

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
            {fields.map((field, index) => (
              <div className={`visual-field ${index === fields.length - 1 ? "visual-field--large" : ""}`} key={field}>
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
