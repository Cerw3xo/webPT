type MediaPlaceholderProps = {
  label: string;
  ratio?: "portrait" | "landscape" | "square";
  index?: string;
};

export function MediaPlaceholder({ label, ratio = "landscape", index }: MediaPlaceholderProps) {
  return (
    <div className={`media-placeholder media-placeholder--${ratio}`} aria-label={`${label} — vizuál bude doplnený`}>
      <span className="media-placeholder__cross" aria-hidden="true" />
      <span className="media-placeholder__label">{label}</span>
      {index ? <span className="media-placeholder__index">{index}</span> : null}
    </div>
  );
}
