import { MediaPlaceholder } from "./MediaPlaceholder";

export function AboutSection() {
  return (
    <section className="section about-section" id="about">
      <div className="shell">
        <div className="editorial-grid about-composition">
          <p className="section-kicker"><span>01</span> / O mně</p>
          <h2 className="editorial-major">Trenér. Atlet. Hybridní sportovec.</h2>
          <MediaPlaceholder label="Portrét trenéra" ratio="portrait" index="01" theme="profile" />
          <div className="about-copy">
            <p className="lead-copy">Trénink pro mě nikdy nebyl pouze o vzhledu.</p>
            <p className="body-copy">Síla, kondice a kvalitní pohyb tvoří základ těla, které funguje dlouhodobě.</p>
            <p className="body-copy">Pomáhám lidem budovat silnější, schopnější a sebevědomější verzi sebe sama.</p>
            <a className="text-link" href="#coaching">
              Jak trénujeme <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
