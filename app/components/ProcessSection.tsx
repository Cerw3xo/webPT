const steps = [
  { index: "01", title: "Zhodnocení", text: "Zjistíme aktuální stav, cíle a možnosti." },
  { index: "02", title: "Plán", text: "Nastavíme strategii, která dává smysl." },
  { index: "03", title: "Trénink", text: "Budujeme sílu, techniku a kondici." },
  { index: "04", title: "Progres", text: "Sledujeme výsledky a upravujeme směr." },
];

export function ProcessSection() {
  return (
    <section className="section philosophy-section" id="process">
      <div className="shell">
        <div className="editorial-grid section-intro process-intro">
          <p className="section-kicker"><span>04</span> / Proces</p>
          <h2 className="editorial-major">Jednoduchý proces. Jasný cíl.</h2>
          <p className="section-summary">Jasný rámec, který dává tréninku směr a zároveň prostor reagovat na reálný život.</p>
        </div>

        <div className="process-grid">
          {steps.map((step) => (
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
