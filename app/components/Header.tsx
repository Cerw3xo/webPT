"use client";

import { useSite } from "./SiteContext";

export function Header() {
  const { content, locale, setLocale } = useSite();

  return (
    <header className="site-header">
      <div className="site-header__inner shell">
        <a className="brand-mark" href="#top" aria-label={content.header.homeLabel}>
          <span>Matej</span>
          <span aria-hidden="true">
            <span className="brand-mark__letter-c">C<span className="brand-mark__caron">ˇ</span></span>ervenka
          </span>
          <span className="sr-only">Červenka</span>
        </a>

        <nav className="site-nav" aria-label={content.header.navigationLabel}>
          {content.navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <div
            className="language-switcher language-switcher--contrast"
            aria-label={content.header.languageLabel}
            style={{ backgroundColor: "#000000" }}
          >
            <button
              className={`language-switcher__option${locale === "cs" ? " language-switcher__option--selected" : ""}`}
              type="button"
              aria-pressed={locale === "cs"}
              style={{
                backgroundColor: locale === "cs" ? "var(--primary)" : "#000000",
                color: locale === "cs" ? "var(--accent)" : "var(--text-secondary)",
              }}
              onClick={() => setLocale("cs")}
            >
              CZ
            </button>
            <button
              className={`language-switcher__option${locale === "sk" ? " language-switcher__option--selected" : ""}`}
              type="button"
              aria-pressed={locale === "sk"}
              style={{
                backgroundColor: locale === "sk" ? "var(--primary)" : "#000000",
                color: locale === "sk" ? "var(--accent)" : "var(--text-secondary)",
              }}
              onClick={() => setLocale("sk")}
            >
              SK
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
