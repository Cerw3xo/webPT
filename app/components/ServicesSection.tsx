import { MediaPlaceholder } from "./MediaPlaceholder";

const services = [
  { index: "01", title: "Silový trénink", text: "Budování svalů, síly a správných pohybových návyků.", theme: "strength" as const },
  { index: "02", title: "Kondice a pohyb", text: "Lepší kondice, kontrola těla a vyšší pracovní kapacita.", theme: "endurance" as const },
  { index: "03", title: "Hybridní trénink", text: "Kombinace síly, kondice a atletického pohybu pro tělo, které zvládne víc.", theme: "performance" as const },
];

export function ServicesSection() {
  return (
    <section className="section coaching-section" id="coaching">
      <div className="shell">
        <div className="editorial-grid section-intro coaching-intro">
          <p className="section-kicker"><span>02</span> / Trénink</p>
          <h2 className="editorial-major">Trénink podle toho, čeho chceš dosáhnout.</h2>
          <p className="section-summary">Trénink podle toho, čeho chceš dosáhnout — ne jen podle toho, co chceš vidět v zrcadle.</p>
        </div>

        <div className="coaching-services">
          {services.map((service) => (
            <article className="service-row" key={service.index}>
              <MediaPlaceholder label={service.title} ratio="landscape" index={service.index} theme={service.theme} />
              <div className="service-row__content">
                <span className="service-row__index">{service.index}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a className="service-row__arrow" href="#contact">
                  Zjistit víc <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
