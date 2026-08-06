"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* صورة الخلفية */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* طبقة تغميق فوق الصورة (لجعل النصوص واضحة) */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* الشارة العلوية */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-block rounded-full bg-mango/20 px-4 py-1.5 text-sm font-bold text-mango backdrop-blur-sm border border-mango/30">
             فخر الصناعة اليمنية
          </span>
        </motion.div>

        {/* العنوان الرئيسي */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-6 font-cairo text-4xl font-extrabold leading-tight text-white md:text-6xl"
        >
          <span className="text-mango">ليدر</span>
          <span className="text-white"> .. </span>
          <span className="text-white">فخر الصناعة اليمنية</span>
          <br />
          <span className="text-orange">من خيرات أرضنا</span>
        </motion.h1>

        {/* النص التعريفي */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-4 font-cairo text-lg text-white/80 md:text-xl"
        >
          أول منتج عصائر يمني بنكهة الأصالة وجودة العالم
        </motion.p>

        {/* الأزرار */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#features"
            className="btn-primary inline-block rounded-full px-8 py-3 font-cairo text-base font-bold transition-all hover:scale-105"
          >
            اكتشف المنتج
          </a>
          <a
            href="#story"
            className="inline-block rounded-full border-2 border-white/30 px-8 py-3 font-cairo text-base font-bold text-white transition-all hover:bg-white/10 hover:scale-105"
          >
            تعرف على القصة
          </a>
        </motion.div>

        {/* إحصائيات */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="mt-12 flex justify-center gap-8 md:gap-12"
        >
          <div className="text-center">
            <p className="font-cairo text-2xl font-extrabold text-mango">100%</p>
            <p className="font-cairo text-sm text-white/60">يمني</p>
          </div>
          <div className="text-center">
            <p className="font-cairo text-2xl font-extrabold text-mango">طبيعي</p>
            <p className="font-cairo text-sm text-white/60">بدون مواد حافظة</p>
          </div>
          <div className="text-center">
            <p className="font-cairo text-2xl font-extrabold text-mango">جودة</p>
            <p className="font-cairo text-sm text-white/60">عالمية</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
