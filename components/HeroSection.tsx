"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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
    subtitle: "نقاء بلا سكر",
  },
  {
    id: 2,
    start: 30,
    end: 59,
    entry: "right",
    textAlign: "left",
    title: "دقة في التصنيع",
    subtitle: "كل التفاصيل محسوبة",
  },
  {
    id: 3,
    start: 60,
    end: 89,
    entry: "left",
    textAlign: "right",
    title: "هندسة متقدمة",
    subtitle: "اكتشف ما في الداخل",
  },
  {
    id: 4,
    start: 90,
    end: 119,
    entry: "bottom",
    textAlign: "center",
    title: "جاهز للإطلاق",
    subtitle: "عد للخلف لإعادة التشغيل",
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
  const firstScene = SCENES[0];

  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-screen items-end justify-center px-6 pb-24 md:items-center md:pb-0"
    >
      <div className="mx-auto max-w-2xl text-center">
        {/* Tagline - من SCENES */}
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-block font-cairo text-sm font-bold tracking-wide text-yemen-green"
        >
          {firstScene.subtitle}
        </motion.span>

        {/* Main Title - من SCENES */}
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="mt-3 font-cairo text-4xl font-extrabold leading-tight text-mango md:text-5xl"
        >
          <Typewriter text={firstScene.title} delay={0.2} />
        </motion.h1>

        {/* Subtitle - من SCENES */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-4 font-cairo text-lg text-muted md:text-xl"
        >
          {firstScene.subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="#story"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          className="btn-primary mt-8 inline-block rounded-full px-8 py-3 font-cairo text-base font-bold"
        >
          اكتشف المنتج
        </motion.a>

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
