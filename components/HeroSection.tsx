"use client";

import { motion } from "framer-motion";

// ============================================
// ✅ المنطق المستورد من helpers.ts
// ============================================

export const TOTAL_FRAMES = 120;

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

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
  },
];

export function sceneForFrame(frame: number): Scene {
  const found = SCENES.find((s) => frame >= s.start && frame <= s.end);
  return found ?? SCENES[SCENES.length - 1];
}

export function overlayOpacity(scene: Scene, frame: number): number {
  const span = scene.end - scene.start || 1;
  const t = clamp((frame - scene.start) / span, 0, 1);
  const fadeIn = clamp(t / 0.2, 0, 1);
  const fadeOut = clamp((1 - t) / 0.2, 0, 1);
  return Math.min(fadeIn, fadeOut, 1);
}

// ============================================
// ✅ HeroSection
// ============================================

const Typewriter = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const characters = text.split("");
  return (
    <motion.span>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 0.05,
            delay: delay + i * 0.05,
          }}
          viewport={{ once: true }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function HeroSection() {
  const scene = SCENES[0];

  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-screen items-end justify-center px-6 pb-24 md:items-center md:pb-0"
    >
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Tagline - "جرب و بيننا" */}
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-block font-cairo text-sm font-bold tracking-wide text-yemen-green bg-black/20 px-4 py-1.5 rounded-full backdrop-blur-sm border border-yemen-green/30"
        >
          {scene.subtitle}
        </motion.span>

        {/* Main Title - "ليدر .. فخر الصناعة اليمنية من خيرات أرضنا" */}
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="mt-6 font-cairo text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl"
        >
          <span className="text-mango drop-shadow-[0_2px_10px_rgba(248,201,40,0.3)]">
            <Typewriter text={scene.title} delay={0.2} />
          </span>
          <span className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"> .. </span>
          <span className="text-orange drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">فخر الصناعة اليمنية</span>
          <br />
          <span className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">من خيرات أرضنا</span>
        </motion.h1>

        {/* Subtitle - أبيض واضح ومتجاوب */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-4 font-cairo text-base font-medium text-white/90 sm:text-lg md:text-xl lg:text-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
        >
          {scene.subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.a
            href="#features"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-block rounded-full px-8 py-3 font-cairo text-base font-bold transition-all"
          >
            اكتشف المنتج
          </motion.a>
          <motion.a
            href="#story"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block rounded-full border-2 border-white/30 px-8 py-3 font-cairo text-base font-bold text-white transition-all hover:bg-white/10"
          >
            تعرف على القصة
          </motion.a>
        </motion.div>

        {/* Pulse animation for button */}
        <motion.div
          initial={{ boxShadow: "0 0 0 0 rgba(248, 201, 40, 0.35)" }}
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(248, 201, 40, 0.35)",
              "0 0 0 15px rgba(248, 201, 40, 0)",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            delay: 1.2,
          }}
          className="pointer-events-none"
        />

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="yemen-thread mx-auto mt-8 w-24 origin-center"
        />
      </div>
    </section>
  );
}
