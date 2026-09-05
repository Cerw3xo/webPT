"use client";

import { useSite } from "./SiteContext";
import "./Header.css";

export function Header() {
  const { content, locale, setLocale } = useSite();

  return (
    <header className="site-header">
      <div className="site-header__inner container gutter">
        <a className="brand-mark" href="#top" aria-label={content.header.homeLabel}>
          <span>Matej</span>
          <span aria-hidden="true">
            <span className="brand-mark__letter-c">C<span className="brand-mark__caron">ˇ</span></span>ervenka
          </span>
          <span className="srOnly">Červenka</span>
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
          >
            <button
              className={`language-switcher__option${locale === "cs" ? " language-switcher__option--selected" : ""}`}
              type="button"
              aria-pressed={locale === "cs"}
              onClick={() => setLocale("cs")}
            >
              CZ
            </button>
            <button
              className={`language-switcher__option${locale === "sk" ? " language-switcher__option--selected" : ""}`}
              type="button"
              aria-pressed={locale === "sk"}
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
