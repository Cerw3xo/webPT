const czechSample = "PŘÍLIŠ ŽLUŤOUČKÝ KŮŇ ÚPĚL ĎÁBELSKÉ ÓDY";
const slovakSample = "PÄŤ ŽLTÝCH ĽALIÍ ČUŠÍ PRI ĎATĽOVI";
const uppercaseCharacters = "Č Ď Ě Ľ Ĺ Ň Ř Š Ť Ž Á Ä É Í Ó Ô Ú Ý";
const lowercaseCharacters = "č ď ě ľ ĺ ň ř š ť ž á ä é í ó ô ú ý";

const specimens = [
  { family: "Antonio", weight: 600, note: "Načtená váha" },
  { family: "Antonio", weight: 700, note: "Načtená váha" },
  { family: "Inter", weight: 400, note: "Regular" },
  { family: "Inter", weight: 500, note: "Medium" },
];

export default function TypographyTestPage() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <main
      style={{
        minHeight: "100svh",
        padding: "clamp(1.5rem, 5vw, 5rem)",
        background: "var(--bg-main)",
        color: "var(--text-primary)",
      }}
    >
      <header style={{ maxWidth: "76rem", margin: "0 auto 4rem" }}>
        <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Pouze pro vývoj / test diakritiky
        </p>
        <h1 style={{ margin: "1rem 0 0", fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 7vw, 6rem)", fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 0.9, textTransform: "uppercase" }}>
          Typografický test
        </h1>
        <p style={{ maxWidth: "44rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Antonio je v této aplikaci načtený pouze ve vahách 600 a 700. Váhy 400 a 500 proto nejsou simulované.
        </p>
      </header>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))", gap: "1px", maxWidth: "76rem", margin: "0 auto", background: "var(--border-subtle)", border: "1px solid var(--border-subtle)" }} aria-label="Vzorky písem">
        {specimens.map((specimen) => (
          <article key={`${specimen.family}-${specimen.weight}`} style={{ padding: "clamp(1.25rem, 3vw, 2.5rem)", background: "var(--bg-elevated)" }}>
            <p style={{ margin: 0, color: "var(--text-muted)", fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase" }}>
              {specimen.family} / {specimen.weight} / {specimen.note}
            </p>
            <p style={{ margin: "2rem 0 0", fontFamily: specimen.family === "Antonio" ? "var(--font-display)" : "var(--font-body)", fontSize: specimen.family === "Antonio" ? "clamp(2.1rem, 4vw, 3.75rem)" : "clamp(1.5rem, 2.4vw, 2.25rem)", fontWeight: specimen.weight, letterSpacing: specimen.family === "Antonio" ? "-0.04em" : "-0.03em", lineHeight: 1, textTransform: specimen.family === "Antonio" ? "uppercase" : "none" }}>
              {czechSample}
            </p>
            <p style={{ margin: "1.4rem 0 0", fontFamily: specimen.family === "Antonio" ? "var(--font-display)" : "var(--font-body)", fontSize: specimen.family === "Antonio" ? "clamp(1.7rem, 3vw, 2.8rem)" : "clamp(1.25rem, 2vw, 1.8rem)", fontWeight: specimen.weight, letterSpacing: specimen.family === "Antonio" ? "-0.035em" : "-0.02em", lineHeight: 1.1, textTransform: specimen.family === "Antonio" ? "uppercase" : "none" }}>
              {slovakSample}
            </p>
            <p style={{ margin: "2rem 0 0", color: "var(--text-secondary)", fontFamily: specimen.family === "Antonio" ? "var(--font-display)" : "var(--font-body)", fontWeight: specimen.weight, lineHeight: 1.7 }}>
              {uppercaseCharacters}
              <br />
              {lowercaseCharacters}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
