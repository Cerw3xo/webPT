type EditorialCtaProps = {
  href: string;
  label: string;
  className?: string;
  variant?: "micro-accent" | "minimal-text";
};

export function EditorialCta({ href, label, className, variant }: EditorialCtaProps) {
  const classes = ["editorial-cta", variant ? `editorial-cta--${variant}` : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <a className={classes} href={href}>
      <span className="editorial-cta__label">{label}</span>
      <span className="editorial-cta__line" aria-hidden="true" />
      <span className="editorial-cta__arrow" aria-hidden="true">→</span>
    </a>
  );
}
