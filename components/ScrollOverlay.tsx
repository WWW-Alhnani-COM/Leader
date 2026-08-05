"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SCENES, overlayOpacity, sceneForFrame } from "@/utils/helpers";

interface ScrollOverlayProps {
  frame: number;
}

// These map to true physical screen sides (left/right), matching where the
// product enters in each frame sequence - independent of the page's RTL
// reading direction, which is why the wrapper below forces dir="ltr".
const positionClasses: Record<string, string> = {
  center: "inset-0 items-center justify-center text-center",
  left: "inset-0 items-center justify-start text-left ps-8 md:ps-20",
  right: "inset-0 items-center justify-end text-right pe-8 md:pe-20",
};

/**
 * Displays the scene's synced headline/subtitle over the canvas, always on
 * the side opposite where the product enters the frame, per the brief's
 * scene table.
 */
export default function ScrollOverlay({ frame }: ScrollOverlayProps) {
  const scene = sceneForFrame(frame);
  const opacity = overlayOpacity(scene, frame);
  const posClass = positionClasses[scene.textAlign];

  // Scene 4 travels from the top toward the center as it plays.
  const localT =
    scene.id === 4
      ? Math.min(Math.max((frame - scene.start) / (scene.end - scene.start || 1), 0), 1)
      : 0;
  const translateY = scene.id === 4 ? -60 + localT * 60 : 0;

  return (
    <div
      dir="ltr"
      className={`pointer-events-none fixed z-[5] flex px-6 ${posClass}`}
      aria-hidden={opacity < 0.05}
    >
      <AnimatePresence mode="wait">
        {opacity > 0.02 && (
          <motion.div
            key={scene.id}
            initial={{ opacity: 0, y: scene.id === 4 ? -30 : 16 }}
            animate={{ opacity, y: translateY }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            dir="rtl"
            className="max-w-md"
          >
            <h2 className="font-cairo text-4xl font-extrabold text-mango drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)] md:text-6xl">
              {scene.title}
            </h2>
            <p className="mt-3 font-cairo text-lg font-semibold text-orange drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)] md:text-2xl">
              {scene.subtitle}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { SCENES };
