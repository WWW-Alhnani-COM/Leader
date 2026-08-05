"use client";

import { useEffect, useRef } from "react";

interface BackgroundCanvasProps {
  images: React.MutableRefObject<HTMLImageElement[]>;
  frame: number;
}

/**
 * Renders the current frame image onto a full-viewport fixed canvas,
 * behind all page content. Uses devicePixelRatio-aware sizing for crisp
 * rendering, and "cover" fit so the viewport is filled (overflow cropped).
 */
export default function BackgroundCanvas({ images, frame }: BackgroundCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const lastFrameRef = useRef<number>(-1);
  const backgroundImageRef = useRef<HTMLImageElement | null>(null);

  // تحميل صورة الخلفية
  useEffect(() => {
    const img = new Image();
    img.src = "/Background.png";
    img.onload = () => {
      backgroundImageRef.current = img;
    };
  }, []);

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
    lastFrameRef.current = -1;
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = images.current[frame];
    const bgImg = backgroundImageRef.current;
    if (!canvas || !ctx) return;

    const { width, height, dpr } = sizeRef.current;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // رسم صورة الخلفية بدلاً من اللون
    if (bgImg && bgImg.complete && bgImg.naturalWidth > 0) {
      // cover fit للصورة الخلفية
      const scale = Math.max(width / bgImg.naturalWidth, height / bgImg.naturalHeight);
      const drawWidth = bgImg.naturalWidth * scale;
      const drawHeight = bgImg.naturalHeight * scale;
      const dx = (width - drawWidth) / 2;
      const dy = (height - drawHeight) / 2;
      ctx.drawImage(bgImg, dx, dy, drawWidth, drawHeight);
    } else {
      // fallback في حال لم تتحمل الصورة
      ctx.fillStyle = "#FFF5D6";
      ctx.fillRect(0, 0, width, height);
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    // cover fit للإطارات
    const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
    const drawWidth = img.naturalWidth * scale;
    const drawHeight = img.naturalHeight * scale;
    const dx = (width - drawWidth) / 2;
    const dy = (height - drawHeight) / 2;

    ctx.drawImage(img, dx, dy, drawWidth, drawHeight);

    // ✅ تدرج برتقالي (أكثر وضوحاً)
    const gradient = ctx.createRadialGradient(
      width / 2, height / 2, 0,
      width / 2, height / 2, Math.max(width, height) / 1.5
    );
    gradient.addColorStop(0, "rgba(248, 201, 40, 0.06)");   // مانجو شفاف
    gradient.addColorStop(0.5, "rgba(242, 140, 40, 0.10)"); // برتقالي شفاف
    gradient.addColorStop(1, "rgba(242, 140, 40, 0.15)");   // برتقالي أغمق قليلاً
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // ✅ طبقة زجاجية خفيفة جداً (تأثير blur زجاجي)
    ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
    ctx.fillRect(0, 0, width, height);
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
