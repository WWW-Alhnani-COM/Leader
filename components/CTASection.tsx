"use client";

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section
      id="cta"
      className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24"
    >
      <div className="mx-auto max-w-xl text-center">
        {/* Main title - Removed text */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          animate={{
            textShadow: [
              "0 0 10px rgba(248, 201, 40, 0.3)",
              "0 0 20px rgba(248, 201, 40, 0.6)",
              "0 0 10px rgba(248, 201, 40, 0.3)",
            ],
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            textShadow: {
              repeat: Infinity,
              duration: 2,
              delay: 0.8,
            },
          }}
          className="font-cairo text-3xl font-extrabold text-mango md:text-4xl backdrop-blur-sm"
        >
          {/* Text removed */}
        </motion.h2>

        {/* Subtitle - Removed text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-4 font-cairo leading-relaxed text-muted backdrop-blur-sm"
        >
          {/* Text removed */}
        </motion.p>

        {/* Quote - Removed text */}
        <motion.blockquote
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-6 border-e-4 border-orange pe-4 text-right font-cairo italic leading-relaxed text-muted backdrop-blur-sm"
        >
          {/* Text removed */}
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-2 font-cairo text-sm font-bold not-italic text-orange"
          >
            {/* Text removed */}
          </motion.footer>
        </motion.blockquote>

        {/* CTA Button with ripple effect - Removed text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="mt-8"
        >
          <motion.a
            href="#top"
            className="btn-secondary relative inline-block rounded-full px-8 py-3 font-cairo text-base font-bold overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-mango/20 rounded-full"
              initial={{ scale: 0 }}
              whileHover={{
                scale: [0, 1, 1.5],
              }}
              transition={{
                duration: 0.6,
              }}
            />
            <span className="relative">{/* Text removed */}</span>
          </motion.a>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 flex justify-center gap-4"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: i * 0.2,
              }}
              className="h-2 w-2 rounded-full bg-mango"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
