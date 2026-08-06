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
          {/* الشعار المتحرك */}
          <motion.div
            animate={{ 
              scale: [1, 1.08, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img 
              src="/loading.gif"
              alt="جرب و بيننا" 
              className="h-28 w-auto"
              style={{
                mixBlendMode: "multiply",
                backgroundColor: "transparent",
                filter: "drop-shadow(0 0 30px rgba(248, 201, 40, 0.3))",
              }}
            />
          </motion.div>

          {/* نص "جرب و بيننا" - أنميشن احترافي */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              textShadow: [
                "0 0 0px rgba(0, 154, 68, 0)",
                "0 0 20px rgba(0, 154, 68, 0.3)",
                "0 0 0px rgba(0, 154, 68, 0)",
              ],
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.3 },
              y: { duration: 0.6, delay: 0.3 },
              textShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="mt-4 font-cairo text-3xl font-bold text-yemen-green md:text-4xl"
            style={{
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.5)",
              paintOrder: "stroke fill",
            }}
          >
            جرب و بيننا
          </motion.p>

          {/* شريط التحميل */}
          <div className="mt-8 h-1.5 w-56 overflow-hidden rounded-full bg-white/60">
            <motion.div
              className="h-full bg-mango-gradient"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
