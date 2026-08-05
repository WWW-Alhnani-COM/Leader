"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-screen items-end justify-center px-6 pb-24 md:items-center md:pb-0"
    >
      <div className="mx-auto max-w-2xl text-center">
        {/* Tagline - Removed text */}
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-block font-cairo text-sm font-bold tracking-wide text-yemen-green"
        >
          {/* Text removed */}
        </motion.span>

        {/* Main Title - Removed text */}
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="mt-3 font-cairo text-4xl font-extrabold leading-tight text-mango md:text-5xl"
        >
          {/* Text removed */}
        </motion.h1>

        {/* Subtitle - Removed text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-4 font-cairo text-lg text-muted md:text-xl"
        >
          {/* Text removed */}
        </motion.p>
      </div>
    </section>
  );
}
