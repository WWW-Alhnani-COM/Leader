"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // تتبع حركة التمرير لإنشاء تأثير الـ Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);

  const features = [
    {
      title: "نكتار طبيعي 100%",
      description: "مستخلص من أجود الفواكه الطازجة بدون أي نكهات صناعية أو ألوان مضافة، لتستمتع بالطعم الأصلي الخالص.",
      icon: "🍃",
      badge: "طبيعي تماماً",
    },
    {
      title: "خالي من المواد الحافظة",
      description: "مصنوع بعناية فائقة لضمان أعلى معايير الأمان الصحي، مما يجعله الخيار الأمثل لصحة وعافية العائلة.",
      icon: "🛡️",
      badge: "صحي وآمن",
    },
    {
      title: "إنتاج وطني فاخر",
      description: "نفخر بصناعته في اليمن بأيدي محلية ووفق أحدث المعايير العالمية، لنقدم لك فخر الصناعة الوطنية.",
      icon: "🏆",
      badge: "دعم الاقتصاد المحلي",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="features"
      className="relative min-h-screen overflow-hidden py-32 px-6 bg-slate-950 text-white flex items-center"
    >
      {/* خلفية تفاعلية متحركة (Parallax Background) */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
      >
        <div className="absolute top-1/3 left-5 w-96 h-96 bg-amber-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-5 w-96 h-96 bg-orange-600 rounded-full blur-[120px]" />
      </motion.div>

      {/* المحتوى الرئيسي */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 max-w-6xl mx-auto w-full"
      >
        {/* عنوان القسم */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-amber-400 font-bold tracking-wider uppercase text-sm sm:text-base bg-amber-500/10 px-5 py-2 rounded-full border border-amber-500/20 inline-block"
          >
            المميزات والفوائد
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 font-cairo text-3xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            لماذا تختار عصير ليدر؟
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg font-medium"
          >
            نحول المواصفات التقنية الفاخرة إلى فوائد ملموسة تغذي حواسك وتدعم صحتك كل يوم.
          </motion.p>
        </div>

        {/* شبكة الكروت (3 أعمدة) بتصميم زجاجي فاخر */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden group"
            >
              {/* تدرج مضيء يظهر عند تمرير الماوس */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex items-center justify-between mb-6">
                <div className="text-4xl p-4 w-fit rounded-2xl bg-amber-500/10 border border-amber-500/20 shadow-inner">
                  {feature.icon}
                </div>
                <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                  {feature.badge}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-cairo mb-3 text-white group-hover:text-amber-300 transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-normal">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
