"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TOTAL_FRAMES, clamp, framePath } from "@/utils/helpers";

/**
 * Preloads all frame images so the canvas can paint them instantly during
 * scroll, without a network stall causing a visible skip. Returns progress
 * (0-100), a ready flag, and the loaded HTMLImageElement cache.
 */
export function useFramePreloader() {
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let cancelled = false;
    let count = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = img.onerror = () => {
        if (cancelled) return;
        count += 1;
        setLoaded(Math.round((count / TOTAL_FRAMES) * 100));
        if (count === TOTAL_FRAMES) setReady(true);
      };
      images[i] = img;
    }

    imagesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, []);

  return { loaded, ready, images: imagesRef };
}

/**
 * Tracks page scroll position and converts it into a smoothed frame index
 * (0-119) plus overall progress (0-1). Uses requestAnimationFrame to avoid
 * layout thrash and keep the canvas render loop smooth.
 */
export function useScrollFrame() {
  const [frame, setFrame] = useState(0);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  const computeFrame = useCallback(() => {
    const doc = document.documentElement;
    const scrollTop = window.scrollY;
    const maxScroll = doc.scrollHeight - window.innerHeight;
    const p = maxScroll > 0 ? clamp(scrollTop / maxScroll, 0, 1) : 0;
    setProgress(p);
    setFrame(Math.round(p * (TOTAL_FRAMES - 1)));
    rafRef.current = null;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(computeFrame);
      }
    };
    const onResize = () => {
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(computeFrame);
      }
    };

    computeFrame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [computeFrame]);

  return { frame, progress };
}
