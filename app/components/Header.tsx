"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSite } from "./SiteContext";
import "./Header.css";

export function Header() {
  const { content, locale, setLocale } = useSite();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback((restoreFocus = true) => {
    setMenuOpen(false);

    if (restoreFocus) {
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const root = document.documentElement;
    const desktop = window.matchMedia("(min-width: 961px)");
    const getFocusableElements = () => {
      const panelElements = Array.from(
        mobileMenuRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

      return [menuButtonRef.current, ...panelElements].filter(
        (element): element is HTMLElement => element !== null,
      );
    };
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu(false);
    };
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      } else if (!focusableElements.includes(activeElement as HTMLElement)) {
        event.preventDefault();
        (focusableElements[1] ?? firstElement).focus();
      }
    };

    root.classList.add("site-menu-open");
    desktop.addEventListener("change", closeAtDesktop);
    window.addEventListener("keydown", handleKeyboard);
    mobileMenuRef.current?.querySelector<HTMLAnchorElement>("a[href]")?.focus();

    return () => {
      root.classList.remove("site-menu-open");
      desktop.removeEventListener("change", closeAtDesktop);
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [closeMenu, menuOpen]);

  return (
    <header className={`site-header${menuOpen ? " site-header--menu-open" : ""}`}>
      <div className="site-header__inner container gutter">
        <a
          className="brand-mark"
          href="#top"
          aria-label={content.header.homeLabel}
          onClick={() => {
            if (menuOpen) closeMenu();
          }}
        >
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
            role="group"
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
          <button
            ref={menuButtonRef}
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-site-menu"
            aria-label={menuOpen ? content.header.menuClose : content.header.menuOpen}
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div ref={mobileMenuRef} className="mobile-menu" id="mobile-site-menu">
          <nav className="mobile-menu__nav container gutter" aria-label={content.header.menuLabel}>
            {content.navigation.map((item, index) => (
              <a key={item.href} href={item.href} onClick={() => closeMenu()}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.label}</strong>
              </a>
            ))}
          </nav>

          <div className="mobile-menu__footer container gutter">
            <span className="mobile-menu__language-label">{content.header.languageLabel}</span>
            <div
              className="language-switcher language-switcher--contrast"
              role="group"
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
      ) : null}
    </header>
  );
}
