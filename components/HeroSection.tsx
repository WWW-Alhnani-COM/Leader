"use client";

import { motion } from "framer-motion";

const Typewriter = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const characters = text.split("");
  return (
    <motion.span>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 0.05,
            delay: delay + i * 0.05,
          }}
          viewport={{ once: true }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-screen items-end justify-center px-6 pb-24 md:items-center md:pb-0"
    >
      <div className="mx-auto max-w-2xl text-center">
        {/* Tagline - Scale animation */}
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-block font-cairo text-sm font-bold tracking-wide text-yemen-green"
        >
          جرب وبيننا
        </motion.span>

        {/* Main Title - Typewriter effect */}
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="mt-3 font-cairo text-4xl font-extrabold leading-tight text-mango md:text-5xl"
        >
          <Typewriter text="ليدر .. فخر الصناعة اليمنية من خيرات أرضنا" delay={0.2} />
        </motion.h1>

        {/* Subtitle - Fade and slide up */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-4 font-cairo text-lg text-muted md:text-xl"
        >
          أول منتج عصائر يمني بنكهة الأصالة وجودة العالم
        </motion.p>

        {/* CTA Button - Pulse effect */}
        <motion.a
          href="#story"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          className="btn-primary mt-8 inline-block rounded-full px-8 py-3 font-cairo text-base font-bold"
        >
          اكتشف المنتج
        </motion.a>

        {/* Pulse animation for button */}
        <motion.div
          initial={{ boxShadow: "0 0 0 0 rgba(248, 201, 40, 0.35)" }}
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(248, 201, 40, 0.35)",
              "0 0 0 15px rgba(248, 201, 40, 0)",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            delay: 1.2,
          }}
          className="pointer-events-none"
        />

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="yemen-thread mx-auto mt-8 w-24 origin-center"
        />
      </div>
    </section>
  );
}
