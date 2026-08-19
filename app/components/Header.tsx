const navigation = [
  { label: "O mne", href: "#about" },
  { label: "Coaching", href: "#coaching" },
  { label: "Výsledky", href: "#results" },
  { label: "Kontakt", href: "#contact" },
];

export function Header() {
  return (
    <header className="site-header">
      <a className="brand-mark" href="#top" aria-label="MT — domov">
        <span>M</span>
        <span className="brand-mark__accent">T</span>
      </a>

      <nav className="site-nav" aria-label="Hlavná navigácia">
        {navigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="social-link" href="#instagram" aria-label="Instagram placeholder">
        Instagram <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
