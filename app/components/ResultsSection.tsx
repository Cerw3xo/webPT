import { MediaPlaceholder } from "./MediaPlaceholder";

const clientStories = [
  { index: "01", name: "Karel", goal: "Síla + svalový růst", process: "Systematický progres", result: "Lepší výkon" },
  { index: "02", name: "Klient 02", goal: "Redukce tuku", process: "Síla jako základ", result: "Silnější tělo" },
  { index: "03", name: "Klient 03", goal: "Lepší kondice", process: "Postupné budování kapacity", result: "Více energie v pohybu" },
  { index: "04", name: "Klient 04", goal: "Hybridní výkonnost", process: "Síla + vytrvalost", result: "Stabilní progres" },
];

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
          {clientStories.map((client) => (
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
