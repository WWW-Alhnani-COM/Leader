"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-screen items-end justify-center px-6 pb-24 md:items-center md:pb-0"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="content-card mx-auto max-w-xl px-8 py-10 text-center"
      >
        <span className="font-cairo text-sm font-bold tracking-wide text-yemen-green">
          جرب وبيننا
        </span>
        <h1 className="mt-3 font-cairo text-4xl font-extrabold leading-tight text-mango md:text-5xl">
          ليدر .. فخر الصناعة اليمنية من خيرات أرضنا
        </h1>
        <p className="mt-4 font-cairo text-lg text-muted md:text-xl">
          أول منتج عصائر يمني بنكهة الأصالة وجودة العالم
        </p>
        <a
          href="#story"
          className="btn-primary mt-8 inline-block rounded-full px-8 py-3 font-cairo text-base font-bold"
        >
          اكتشف المنتج
        </a>
        <div className="yemen-thread mx-auto mt-8 w-24" />
      </motion.div>
    </section>
  );
}
