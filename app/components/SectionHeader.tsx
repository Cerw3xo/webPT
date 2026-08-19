type SectionHeaderProps = {
  index: string;
  label: string;
  title: string;
  tone?: "dark" | "light";
};

export function SectionHeader({ index, label, title, tone = "dark" }: SectionHeaderProps) {
  return (
    <header className={`section-header section-header--${tone}`}>
      <div className="section-header__meta">
        <span>{index}</span>
        <span>{label}</span>
      </div>
      <h2 className="section-title">{title}</h2>
    </header>
  );
}
