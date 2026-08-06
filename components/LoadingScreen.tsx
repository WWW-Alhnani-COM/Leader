"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface LoadingScreenProps {
  progress: number;
  visible: boolean;
}

export default function LoadingScreen({ progress, visible }: LoadingScreenProps) {
  const [shouldExit, setShouldExit] = useState(false);

  useEffect(() => {
    if (progress >= 100) {
      // ✅ انتظر 2 ثانية بعد اكتمال التحميل
      const timer = setTimeout(() => setShouldExit(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (!visible && shouldExit) return null;

  return (
    <AnimatePresence>
      {visible && !shouldExit && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream"
        >
          {/* المحتوى */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
