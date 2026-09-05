import "./EditorialCta.css";

type EditorialCtaProps = {
  href: string;
  label: string;
  className?: string;
};

export function EditorialCta({ href, label, className }: EditorialCtaProps) {
  const classes = ["editorial-cta", className].filter(Boolean).join(" ");

  return (
    <a className={classes} href={href}>
      <span className="editorial-cta__label">{label}</span>
      <span className="editorial-cta__line" aria-hidden="true" />
      <span className="editorial-cta__arrow" aria-hidden="true">→</span>
    </a>
  );
}
