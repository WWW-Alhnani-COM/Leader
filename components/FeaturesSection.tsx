"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    icon: "🇾🇪",
    title: "هوية يمنية خالصة",
    body: "يعتمد بشكل كامل على أجود أنواع المانجو وغيرها من المحاصيل الزراعية اليمنية. هذا المنتج دعم حقيقي للمزارع اليمني، حيث حولنا دعمنا من المزارع الهندي إلى المزارع اليمني.",
  },
  {
    icon: "🏭",
    title: "معايير عالمية وجودة فائقة",
    body: "يُصنع في اليمن بمصنع ليدر للعصائر الفاخرة، وفق أحدث التقنيات وخطوط الإنتاج المتوافقة مع معايير الجودة والسلامة الغذائية العالمية.",
  },
  {
    icon: "💪",
    title: "ثقة وخبرة عريقة",
    body: "ينطلق من رحم مجموعة ر��يان العريقة التابعة لمجموعة عبدالله عتيبة التجارية، المشهود لها بالتميز والنجاح، وفي مقدمتها مصنع مياه صنعاء.",
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
    // auto-advance every 5s
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
    // reset timer when user interacts
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = window.setInterval(() => {
        setDirection(1);
        setIndex((i) => (i + 1) % features.length);
      }, 5000);
    }
  }

  return (
    <section id="features" className="relative z-10 flex min-h-screen items-center px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="content-card px-8 py-10">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{features[index].icon}</div>
                <h3 className="font-cairo text-2xl font-extrabold text-orange">
                  {features[index].title}
                </h3>
              </div>

              <div className="mt-4 text-right">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.p
                    key={index}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="font-cairo text-sm leading-relaxed text-muted"
                  >
                    {features[index].body}
                  </motion.p>
                </AnimatePresence>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    aria-label="السابق"
                    onClick={() => go(index - 1)}
                    className="rounded-full bg-white/6 p-2 text-xl shadow-sm transition hover:scale-105"
                  >
                    ‹
                  </button>
                  <div className="flex gap-2">
                    {features.map((_, i) => (
                      <button
                        key={i}
                        aria-label={`عرض ${i + 1}`}
                        onClick={() => go(i)}
                        className={`h-2.5 w-8 rounded-full transition-all duration-300 ${
                          i === index
                            ? "bg-mango"
                            : "bg-white/30 hover:bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    aria-label="التالي"
                    onClick={() => go(index + 1)}
                    className="ml-auto rounded-full bg-white/6 p-2 text-xl shadow-sm transition hover:scale-105"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden w-48 flex-shrink-0 items-center justify-center md:flex">
              {/* decorative bottle / image placeholder - keep space for imagery */}
              <div className="h-40 w-24 rounded-2xl bg-gradient-to-b from-mango to-orange shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
