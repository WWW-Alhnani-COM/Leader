"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    icon: "",
    title: "", // تم إزالة النص
    body: "", // تم إزالة النص
  },
  {
    icon: "",
    title: "", // تم إزالة النص
    body: "", // تم إزالة النص
  },
  {
    icon: "",
    title: "", // تم إزالة النص
    body: "", // تم إزالة النص
  },
];

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: 30 * dir }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: -30 * dir }),
};

export default function FeaturesSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % features.length);
    }, 5000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  function go(n: number) {
    setDirection(n > index ? 1 : -1);
    setIndex(((n % features.length) + features.length) % features.length);
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = window.setInterval(() => {
        setDirection(1);
        setIndex((i) => (i + 1) % features.length);
      }, 5000);
    }
  }

  return (
    <section
      id="features"
      className="relative z-10 flex min-h-screen items-center px-6 py-24"
    >
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
          {/* Left side - Text content */}
          <div className="flex-1">
            {/* Icon and Title */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              key={index}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex items-start gap-4"
            >
              <div className="text-5xl">{features[index].icon}</div>
              <h3 className="font-cairo text-2xl font-extrabold text-orange">
                {features[index].title}
              </h3>
            </motion.div>

            {/* Body text */}
            <div className="mt-6">
              <AnimatePresence custom={direction} mode="wait">
                <motion.p
                  key={index}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="font-cairo text-base leading-relaxed text-ink backdrop-blur-sm"
                >
                  {features[index].body}
                </motion.p>
              </AnimatePresence>

              {/* Navigation controls */}
              <div className="mt-8 flex items-center gap-4">
                <button
                  aria-label="السابق"
                  onClick={() => go(index - 1)}
                  className="rounded-full bg-mango/10 p-2 text-xl font-bold text-mango transition-all hover:scale-110 hover:bg-mango/20"
                >
                  ›
                </button>
                <div className="flex gap-2">
                  {features.map((_, i) => (
                    <motion.button
                      key={i}
                      aria-label={`عرض ${i + 1}`}
                      onClick={() => go(i)}
                      className={`rounded-full transition-all duration-300 ${
                        i === index
                          ? "h-3 w-10 bg-mango"
                          : "h-2.5 w-2.5 bg-mango/30 hover:bg-mango/50"
                      }`}
                      whileHover={{ scale: 1.1 }}
                    />
                  ))}
                </div>
                <button
                  aria-label="التالي"
                  onClick={() => go(index + 1)}
                  className="ml-auto rounded-full bg-mango/10 p-2 text-xl font-bold text-mango transition-all hover:scale-110 hover:bg-mango/20"
                >
                  ‹
                </button>
              </div>
            </div>
          </div>

          {/* Right side - Decorative bottle placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            key={index}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="hidden w-48 flex-shrink-0 items-center justify-center md:flex"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="h-40 w-24 rounded-2xl bg-gradient-to-b from-mango to-orange shadow-lg backdrop-blur-sm"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
      }
