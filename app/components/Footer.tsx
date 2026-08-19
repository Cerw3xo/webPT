const footerNavigation = [
  { label: "O mně", href: "#about" },
  { label: "Trénink", href: "#coaching" },
  { label: "Proces", href: "#process" },
  { label: "Výsledky", href: "#results" },
  { label: "Kontakt", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="site-footer" id="instagram">
      <div className="shell site-footer__top">
        <a className="footer-mark" href="#top" aria-label="MT — zpět nahoru">
          M<span>T</span>
        </a>
        <p>Silový a výkonnostní trénink</p>
      </div>

      <div className="shell site-footer__bottom">
        <p>© {new Date().getFullYear()} MT Coaching</p>
        <nav aria-label="Navigace v patičce">
          {footerNavigation.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
        </nav>
        <a href="#instagram">Instagram ↗</a>
      </div>
    </footer>
  );
}
