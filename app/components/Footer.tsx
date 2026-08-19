const footerNavigation = [
  { label: "O mne", href: "#about" },
  { label: "Coaching", href: "#coaching" },
  { label: "Výsledky", href: "#results" },
  { label: "Kontakt", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="site-footer" id="instagram">
      <div className="shell site-footer__top">
        <a className="footer-mark" href="#top" aria-label="MT — späť hore">
          M<span>T</span>
        </a>
        <p>Strength &amp; performance coaching</p>
      </div>

      <div className="shell site-footer__bottom">
        <p>© {new Date().getFullYear()} MT Coaching</p>
        <nav aria-label="Navigácia v päte">
          {footerNavigation.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
        </nav>
        <a href="#instagram">Instagram ↗</a>
      </div>
    </footer>
  );
}
