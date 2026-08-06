export const TOTAL_FRAMES = 130;

/** Clamp a number between min and max. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolation. */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

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
  extraText?: string; // ✅ حقل جديد للنص الإضافي
}

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
    extraText: "🇾🇪 منتج يمني 100%", // ✅ نص إضافي للمشهد الرابع
  },
];

export function sceneForFrame(frame: number): Scene {
  const found = SCENES.find((s) => frame >= s.start && frame <= s.end);
  return found ?? SCENES[SCENES.length - 1];
}

export function overlayOpacity(scene: Scene, frame: number): number {
  const span = scene.end - scene.start || 1;
  const t = clamp((frame - scene.start) / span, 0, 1);
  
  if (scene.id === 4) {
    return 1;
  }
  
  const fadeIn = clamp(t / 0.2, 0, 1);
  const fadeOut = clamp((1 - t) / 0.2, 0, 1);
  return Math.min(fadeIn, fadeOut, 1);
}
