import Image from "next/image";
import "./MediaPlaceholder.css";

type MediaPlaceholderProps = {
  label: string;
  ratio?: "portrait" | "landscape" | "square";
  index?: string;
  theme?: "strength" | "endurance" | "performance" | "profile" | "result";
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
};

export function MediaPlaceholder({
  label,
  ratio = "landscape",
  index,
  theme,
  imageSrc,
  imageAlt,
  imagePosition,
}: MediaPlaceholderProps) {
  return (
    <div
      className={`media-placeholder media-placeholder--${ratio}${theme ? ` media-placeholder--${theme}` : ""}${imageSrc ? " media-placeholder--with-image" : ""}`}
      aria-label={imageAlt ?? `${label} — vizuál bude doplněn`}
    >
      {imageSrc ? (
        <Image
          className="media-placeholder__image"
          src={imageSrc}
          alt={imageAlt ?? ""}
          fill
          sizes="(max-width: 720px) 100vw, 33vw"
          style={{ objectPosition: imagePosition }}
        />
      ) : (
        <>
          <span className="media-placeholder__cross" aria-hidden="true" />
          <span className="media-placeholder__frame" aria-hidden="true" />
        </>
      )}
      <span className="media-placeholder__label">{label}</span>
      {index ? <span className="media-placeholder__index">{index}</span> : null}
    </div>
  );
}
