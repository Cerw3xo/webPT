"use client";

import Image from "next/image";
import { useSite } from "./SiteProvider";

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" className="instagram-icon__dot" />
    </svg>
  );
}

export function Footer() {
  const { content, locale, setLocale } = useSite();

  return (
    <footer className="site-footer" id="instagram">
      <div className="shell site-footer__top">
        <a className="footer-logo-link" href="#top" aria-label={content.footer.homeLabel}>
          <Image
            className="footer-logo"
            src="/Obrázok Codex 31. 8. 2026, 12_46_43.png"
            alt=""
            width={1672}
            height={941}
          />
        </a>
        <p>{content.footer.tagline}</p>
      </div>

      <div className="shell site-footer__bottom">
        <p>© {new Date().getFullYear()} Matej Červenka</p>
        <nav aria-label={content.footer.navigationLabel}>
          {content.navigation.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
        </nav>
        <div className="footer-tools">
          <div className="footer-language" aria-label={content.header.languageLabel}>
            <button type="button" aria-pressed={locale === "cs"} onClick={() => setLocale("cs")}>CZ</button>
            <span aria-hidden="true">/</span>
            <button type="button" aria-pressed={locale === "sk"} onClick={() => setLocale("sk")}>SK</button>
          </div>
          <span className="instagram-placeholder" aria-label={content.footer.instagramPending} title={content.footer.instagramPending}>
            <InstagramIcon />
          </span>
        </div>
      </div>
    </footer>
  );
}
