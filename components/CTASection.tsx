"use client";

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section
      id="cta"
      className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="content-card mx-auto max-w-xl px-8 py-10 text-center"
      >
        <h2 className="font-cairo text-3xl font-extrabold text-mango md:text-4xl">
          انضم إلى دعم المنتج الوطني
        </h2>
        <p className="mt-4 font-cairo leading-relaxed text-muted">
          اكتشف طعم الجودة اليمنية الأصيلة وشاركنا رحلة الفخر بصناعتنا
          الوطنية.
        </p>
        <blockquote className="mt-6 border-e-4 border-orange pe-4 text-right font-cairo italic leading-relaxed text-muted">
          "بدلاً من أن كنا ندعم المزارع الهندي، أصبحنا اليوم ندعم المزارع
          اليمني ونبحث عن أسواق خارجية لتصدير منتجاتنا الوطنية."
          <footer className="mt-2 font-cairo text-sm font-bold not-italic text-orange">
            — الأستاذ أحمد الشوتري، نائب وزير الاقتصاد والصناعة
          </footer>
        </blockquote>
        <a
          href="#top"
          className="btn-secondary mt-8 inline-block rounded-full px-8 py-3 font-cairo text-base font-bold"
        >
          العودة للأعلى
        </a>
      </motion.div>
    </section>
  );
}
