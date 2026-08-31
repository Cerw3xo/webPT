type SectionLabelProps = {
  number: string;
  label: string;
};

export function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <p className="section-kicker">
      <span className="section-kicker__number">{number}</span>
      <span className="section-kicker__separator" aria-hidden="true" />
      <span className="section-kicker__label">{label}</span>
    </p>
  );
}
