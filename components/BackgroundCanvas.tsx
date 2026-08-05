"use client";

import { useEffect, useRef } from "react";

interface BackgroundCanvasProps {
  images: React.MutableRefObject<HTMLImageElement[]>;
  frame: number;
}

/**
 * Renders the current frame image onto a full-viewport fixed canvas,
 * behind all page content. Uses devicePixelRatio-aware sizing for crisp
 * rendering, and "contain" fit so the product is never cropped.
 */
export default function BackgroundCanvas({ images, frame }: BackgroundCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const lastFrameRef = useRef<number>(-1);

  const resize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    sizeRef.current = { width, height, dpr };
    lastFrameRef.current = -1; // force a repaint after resize
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = images.current[frame];
    if (!canvas || !ctx) return;

    const { width, height, dpr } = sizeRef.current;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#FFF5D6";
    ctx.fillRect(0, 0, width, height);

    if (!img || !img.complete || img.naturalWidth === 0) return;

    // contain fit
    const scale = Math.min(width / img.naturalWidth, height / img.naturalHeight);
    const drawWidth = img.naturalWidth * scale;
    const drawHeight = img.naturalHeight * scale;
    const dx = (width - drawWidth) / 2;
    const dy = (height - drawHeight) / 2;

    ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (lastFrameRef.current === frame) return;
    lastFrameRef.current = frame;
    let rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frame]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 h-screen w-screen"
    />
  );
}
