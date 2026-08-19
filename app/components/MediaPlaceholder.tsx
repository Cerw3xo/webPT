type MediaPlaceholderProps = {
  label: string;
  ratio?: "portrait" | "landscape" | "square";
  index?: string;
  theme?: "strength" | "endurance" | "performance" | "profile" | "result";
};

export function MediaPlaceholder({ label, ratio = "landscape", index, theme }: MediaPlaceholderProps) {
  return (
    <div
      className={`media-placeholder media-placeholder--${ratio}${theme ? ` media-placeholder--${theme}` : ""}`}
      aria-label={`${label} — vizuál bude doplněn`}
    >
      <span className="media-placeholder__cross" aria-hidden="true" />
      <span className="media-placeholder__frame" aria-hidden="true" />
      <span className="media-placeholder__label">{label}</span>
      {index ? <span className="media-placeholder__index">{index}</span> : null}
    </div>
  );
}
