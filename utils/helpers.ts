export const TOTAL_FRAMES = 120;

/** Clamp a number between min and max. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolation. */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Build the public path for a given frame index (0-119).
 * Files are named ezgif-frame-001.jpg ... ezgif-frame-120.jpg
 * (3-digit, 1-indexed) — this converts the internal 0-indexed
 * frame number to that filename.
 */
export function framePath(index: number): string {
  const safe = clamp(Math.round(index), 0, TOTAL_FRAMES - 1);
  const fileNumber = String(safe + 1).padStart(3, "0");
  return `/frames/ezgif-frame-${fileNumber}.jpg`;
}

export type SceneId = 1 | 2 | 3 | 4;

export interface Scene {
  id: SceneId;
  start: number;
  end: number;
  entry: "top" | "right" | "left" | "bottom";
  textAlign: "center" | "left" | "right";
  title: string;
  subtitle: string;
}

/** The four scenes exactly as specified in the brief. */
export const SCENES: Scene[] = [
  {
    id: 1,
    start: 0,
    end: 29,
    entry: "top",
    textAlign: "center",
    title: "ليدر",
    subtitle: "جرب و بيننا",
  },
  {
    id: 2,
    start: 30,
    end: 59,
    entry: "right",
    textAlign: "left",
    title: "طعم الأصالة اليمنية",
    subtitle: "جودة وطنية تنافس العالمية",
  },
  {
    id: 3,
    start: 60,
    end: 89,
    entry: "left",
    textAlign: "right",
    title: "فخر اليمن",
    subtitle: "دعم حقيقي لإنتاج مزارع تهامة",
  },
  {
    id: 4,
    start: 90,
    end: 119,
    entry: "bottom",
    textAlign: "center",
    title: "المانجو الحقيقية",
    subtitle: "الطعم الذي يثبت نفسه",
  },
];

/** Find which scene a frame index currently belongs to. */
export function sceneForFrame(frame: number): Scene {
  const found = SCENES.find((s) => frame >= s.start && frame <= s.end);
  return found ?? SCENES[SCENES.length - 1];
}

/**
 * Given a scene and the current frame, return an opacity 0-1 that fades the
 * overlay text in for the first ~20% of the scene, holds, then fades out for
 * the last ~20% - so the text never appears mid-snap and never blocks the
 * product mid-motion.
 */
export function overlayOpacity(scene: Scene, frame: number): number {
  const span = scene.end - scene.start || 1;
  const t = clamp((frame - scene.start) / span, 0, 1);
  
  // ✅ المشهد الرابع: يظهر كاملاً ولا يختفي
  if (scene.id === 4) {
    return 1; // يبقى ظاهراً طوال الوقت
  }
  
  // المشاهد الأخرى: تلاشي دخول وخروج طبيعي (20%)
  const fadeIn = clamp(t / 0.2, 0, 1);
  const fadeOut = clamp((1 - t) / 0.2, 0, 1);
  return Math.min(fadeIn, fadeOut, 1);
}
