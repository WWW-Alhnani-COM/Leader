"use client";

import { motion } from "framer-motion";

// ============================================
// ✅ Typewriter Component
// ============================================

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

// ============================================
// ✅ HeroSection
// ============================================

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* ✅ صورة الخلفية مع scale للتكبير ومنع ظهور الحواف */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: "scale(1.1)", // ✅ تكبير الصورة قليلاً لمنع ظهور الحواف
        }}
      />
      
      {/* ✅ تدرج برتقالي أقوى (زيادة الشفافية) */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, rgba(248,201,40,0.35) 0%, rgba(242,140,40,0.50) 40%, rgba(248,201,40,0.30) 70%, rgba(242,140,40,0.15) 100%)",
        }}
      />
      
      {/* ✅ طبقة سفلية لمنع ظهور أي حواف عند التمرير */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, transparent 80%, rgba(242,140,40,0.20) 100%)",
        }}
      />

      {/* المحتوى */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* ✅ العنوان الرئيسي */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-cairo text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
        >
          <Typewriter text="ليدر" delay={0.2} />
          <span className="text-white/80"> .. </span>
          <span className="text-white">فخر الصناعة اليمنية</span>
          <br />
          <span className="text-white/90">ليدر</span>
        </motion.h1>

        {/* ✅ العنوان الفرعي */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-4 font-cairo text-base font-medium text-white sm:text-lg md:text-xl lg:text-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
        >
          جرب و بيننا
        </motion.p>

        {/* ✅ زر CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="mt-8"
        >
          <motion.a
            href="#features"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-block rounded-full px-8 py-3 font-cairo text-base font-bold transition-all"
          >
            اكتشف المنتج
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
