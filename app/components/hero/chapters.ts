export type ChapterMedia =
  | { kind: "image"; src: string; alt: string; width: number; height: number }
  | { kind: "video"; src: string; poster?: string; alt: string }
  | { kind: "placeholder"; label: string };

export type ImageMotion = {
  scale: [number, number];
  x: [number, number];
  y: [number, number];
};

export type Chapter = {
  id: "strength" | "endurance" | "performance";
  index: string;
  label: string;
  lineOne: string;
  lineTwo: string;
  media: ChapterMedia;
  motion: ImageMotion;
};

export const HERO_TIMING = {
  chapterHeight: 2,
  chapterCutoff: 0.74,
  fadeRatio: 0.32,
  spring: { stiffness: 90, damping: 26, mass: 0.4 },
  chapterGroupFade: { input: [0.68, 0.78], output: [1, 0] },
  mediaBlur: { input: [0, 0.15, 0.85, 1], output: [10, 0, 0, 10] },
  textY: { from: 28, to: -28 },
  final: {
    opacityInput: [0, 0.35, 1],
    opacityOutput: [0, 1, 1],
    y: [40, 0],
    blurInput: [0, 0.5],
    blurOutput: [14, 0],
  },
} as const;

/** Media and motion stay independent from localized chapter copy. */
export const chapters: Chapter[] = [
  {
    id: "strength",
    index: "01",
    label: "Síla",
    lineOne: "Buduj",
    lineTwo: "sílu.",
    media: {
      kind: "image",
      src: "/3.jpg",
      alt: "Atlet při přípravě na mrtvý tah",
      width: 1376,
      height: 768,
    },
    motion: { scale: [1.05, 1.18], x: [0, -1.5], y: [1.5, -1.5] },
  },
  {
    id: "endurance",
    index: "02",
    label: "Vytrvalost",
    lineOne: "Buduj",
    lineTwo: "vytrvalost.",
    media: {
      kind: "image",
      src: "/1.jpg",
      alt: "Atlet při tréninku na air bike",
      width: 1376,
      height: 768,
    },
    motion: { scale: [1.14, 1.06], x: [4, -4], y: [0, 0] },
  },
  {
    id: "performance",
    index: "03",
    label: "Výkon",
    lineOne: "Buduj",
    lineTwo: "výkon.",
    media: {
      kind: "image",
      src: "/2.jpg",
      alt: "Atlet při boxerském tréninku",
      width: 1376,
      height: 768,
    },
    motion: { scale: [1.22, 1.06], x: [-3, 3], y: [-2, 2] },
  },
];
