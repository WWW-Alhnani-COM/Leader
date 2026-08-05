"use client";

import { motion } from "framer-motion";

const points = [
  {
    number: ,
    title: "", // تم إزالة النص
    body: "", // تم إزالة النص
  },
  {
    number: ,
    title: "", // تم إزالة النص
    body: "", // تم إزالة النص
  },
  {
    number: ,
    title: "", // تم إزالة النص
    body: "", // تم إزالة النص
  },
];

export default function VisionSection() {
  return (
    <section id="vision" className="relative z-10 flex min-h-screen items-center px-6 py-24">
      <div className="mx-auto max-w-2xl md:ml-auto md:mr-0">
        {/* Title - Removed text */}
        <motion.h2
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-cairo text-2xl font-extrabold text-orange md:text-3xl"
        >
          {/* Text removed */}
        </motion.h2>

        {/* Intro paragraph - Removed text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-4 font-cairo leading-relaxed text-ink backdrop-blur-sm"
        >
          {/* Text removed */}
        </motion.p>

        {/* Vertical timeline line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="absolute right-[50%] top-1/3 h-48 w-1 origin-top bg-gradient-to-b from-mango via-orange to-transparent md:right-auto md:left-[50%]"
        />

        {/* Vision points timeline */}
        <motion.ul className="relative mt-8 space-y-6 md:mt-10">
          {points.map((p, idx) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: 0.4 + idx * 0.2,
                ease: "easeOut",
              }}
              className="flex items-start gap-4"
            >
              {/* Number circle */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + idx * 0.2,
                  ease: "easeOut",
                }}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-mango to-orange text-sm font-bold text-ink"
              >
                {p.number}
              </motion.div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + idx * 0.2,
                  }}
                  className="font-cairo font-bold text-ink"
                >
                  {p.title}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + idx * 0.2,
                  }}
                  className="font-cairo text-sm text-muted backdrop-blur-sm"
                >
                  {p.body}
                </motion.p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
