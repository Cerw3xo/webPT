const navigation = [
  { label: "O mně", href: "#about" },
  { label: "Trénink", href: "#coaching" },
  { label: "Proces", href: "#process" },
  { label: "Výsledky", href: "#results" },
  { label: "Kontakt", href: "#contact" },
];

export function Header() {
  return (
    <header className="site-header">
      <a className="brand-mark" href="#top" aria-label="MT — domů">
        <span>M</span>
        <span className="brand-mark__accent">T</span>
      </a>

      <nav className="site-nav" aria-label="Hlavní navigace">
        {navigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="header-cta" href="#contact">
        Začít trénovat <span aria-hidden="true">→</span>
      </a>
    </header>
  );
}
