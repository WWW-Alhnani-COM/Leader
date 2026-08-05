"use client";

import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  progress: number;
  visible: boolean;
}

export default function LoadingScreen({ progress, visible }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream"
        >
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="font-cairo text-3xl font-extrabold text-mango md:text-4xl"
          >
            ليدر
          </motion.div>
          <p className="mt-3 font-cairo text-sm text-muted">
            جاري تحضير التجربة...
          </p>
          <div className="mt-6 h-1.5 w-56 overflow-hidden rounded-full bg-white/60">
            <motion.div
              className="h-full bg-mango-gradient"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <span className="mt-2 font-cairo text-xs text-muted">{progress}%</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
