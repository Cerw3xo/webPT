import { Barlow_Condensed, Oswald, Roboto_Condensed } from "next/font/google";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: "600",
  display: "swap",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: "600",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin", "latin-ext"],
  weight: "600",
  display: "swap",
});

const headlines = [
  "BUDUJ SÍLU.",
  "BUDUJ VYTRVALOST.",
  "BUDUJ VÝKON.",
  "VYBUDUJ TĚLO,\nKTERÉ ZVLÁDNE VÍC.",
];

const fonts = [
  { name: "Barlow Condensed", font: barlowCondensed.className },
  { name: "Roboto Condensed", font: robotoCondensed.className },
  { name: "Oswald", font: oswald.className },
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
      <header style={{ maxWidth: "84rem", margin: "0 auto 4rem" }}>
        <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Pouze pro vývoj / porovnání display fontů
        </p>
        <h1 style={{ margin: "1rem 0 0", fontSize: "clamp(2.5rem, 7vw, 6rem)", fontWeight: 500, letterSpacing: "-0.05em", lineHeight: 0.9, textTransform: "uppercase" }}>
          Česká a slovenská diakritika
        </h1>
        <p style={{ maxWidth: "44rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Stejná váha, stejný obsah a stejná sazba pro srovnání proporcí, čitelnosti a charakteru titulkového písma.
        </p>
      </header>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))", gap: "1px", maxWidth: "84rem", margin: "0 auto", background: "var(--border-subtle)", border: "1px solid var(--border-subtle)" }} aria-label="Porovnání display fontů">
        {fonts.map((font) => (
          <article key={font.name} style={{ minWidth: 0, padding: "clamp(1.25rem, 3vw, 2.5rem)", background: "var(--bg-elevated)" }}>
            <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase" }}>
              {font.name} / 600 / latin-ext
            </p>
            <div className={font.font} style={{ display: "grid", gap: "1.4rem", marginTop: "2.2rem", fontSize: "clamp(2.25rem, 4.3vw, 4.8rem)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 0.88, textTransform: "uppercase", whiteSpace: "pre-line" }}>
              {headlines.map((headline) => (
                <p key={headline} style={{ margin: 0 }}>{headline}</p>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
