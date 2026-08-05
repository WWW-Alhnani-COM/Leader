"use client";

import { motion } from "framer-motion";

export default function StorySection() {
  return (
    <section
      id="story"
      className="relative z-10 flex min-h-screen items-center px-6 py-24"
    >
      <div className="mx-auto max-w-2xl md:ml-auto md:mr-0">
        {/* Title - Removed text */}
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-cairo text-2xl font-extrabold text-orange md:text-3xl"
        >
          {/* Text removed */}
        </motion.h2>

        {/* Vertical line separator */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="mt-3 h-1 w-16 origin-top bg-gradient-to-b from-mango to-orange"
        />

        {/* First paragraph - Removed text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-6 font-cairo leading-relaxed text-ink backdrop-blur-sm"
        >
          {/* Text removed */}
        </motion.p>

        {/* Second paragraph - Removed text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-4 font-cairo leading-relaxed text-ink backdrop-blur-sm"
        >
          {/* Text removed */}
        </motion.p>

        {/* Quote - Removed text */}
        <motion.blockquote
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-6 border-e-4 border-mango pe-4 font-cairo italic leading-relaxed text-muted backdrop-blur-sm"
        >
          {/* Text removed */}
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-2 font-cairo text-sm font-bold not-italic text-orange"
          >
            {/* Text removed */}
          </motion.footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
