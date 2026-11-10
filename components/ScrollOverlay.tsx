"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SCENES, sceneForFrame } from "@/utils/helpers";

interface ScrollOverlayProps {
  frame: number;
  isVisible?: boolean;
}

const positionClasses: Record<string, string> = {
  center: "inset-0 items-center justify-center text-center",
  left: "inset-0 items-center justify-start text-left ps-8 md:ps-20",
  right: "inset-0 items-center justify-end text-right pe-8 md:pe-20",
};

export default function ScrollOverlay({ frame, isVisible = true }: ScrollOverlayProps) {
  const scene = sceneForFrame(frame);

  if (!isVisible || !scene) return null;

  const posClass = positionClasses[scene.textAlign];

  return (
    <div
      dir="ltr"
      className={`pointer-events-none fixed flex px-6 ${posClass}`}
      style={{ zIndex: 5 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          dir="rtl"
          className="max-w-md"
        >
          <h2 className="font-cairo text-4xl font-extrabold text-mango drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)] md:text-6xl">
            {scene.title}
          </h2>
          <p className="mt-3 font-cairo text-3xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)] md:text-4xl [-webkit-text-stroke:0.5px_rgba(255,255,255,0.3)]">
            {scene.subtitle}
          </p>
          {scene.extraText && (
            <p className="mt-2 font-cairo text-xl font-semibold text-white drop-shadow-md md:text-2xl">
              {scene.extraText}
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export { SCENES };
