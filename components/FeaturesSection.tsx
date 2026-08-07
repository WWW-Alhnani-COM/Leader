"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // تتبع حركة التمرير داخل هذا القسم فقط لإنشاء تأثير Parallax دقيق
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // تحريك الطبقات والخلفيات بسرعة متفاوته لتوليد عمق Parallax
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  const features = [
    {
      title: "طعم طبيعي 100% نكتار",
      description: "نستخلص أجود الفواكه لنقدم لك نكهة غنية وأصيلة تعيد تعريف مفهوم العصائر الطبيعية.",
      icon: "🍃",
    },
    {
      title: "صحة أفضل ونشاط مستمر",
      description: "خالٍ من المواد الحافظة، غني بالفيتامينات الأساسية ليدعم حيويتك وطاقتك طوال اليوم.",
      icon: "⚡",
    },
    {
      title: "جودة عالمية بأيادٍ يمنية",
      description: "نلتزم بأعلى معايير الجودة العالمية في التصنيع لنضع بين يديك فخر الصناعة الوطنية.",
      icon: "🏆",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="features"
      className="relative min-h-screen overflow-hidden py-32 px-6 bg-slate-900 text-white"
    >
      {/* طبقة خلفية متحركة بتأثير Parallax */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
      >
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-orange-600 rounded-full blur-3xl" />
      </motion.div>

      {/* المحتوى الرئيسي مع تأثير الحركة والظهور */}
      <motion.div
        style={{ y: textY, opacity: opacityTransform }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        {/* عنوان القسم */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-amber-400 font-bold tracking-wider uppercase text-sm sm:text-base bg-amber-400/10 px-4 py-2 rounded-full border border-amber-400/20"
          >
            المميزات والفوائد
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 font-cairo text-3xl md:text-5xl font-extrabold tracking-tight"
          >
            لماذا تختار عصير ليدر؟
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 text-gray-300 max-w-2xl mx-auto text-base sm:text-lg font-medium"
          >
            نحول أجود المكونات الطبيعية إلى تجربة متكاملة تغذي حواسك وتدعم صحتك.
          </motion.p>
        </div>

        {/* شبكة الكروت بتأثير زجاجي (Glassmorphism) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden group"
            >
              {/* لمعة خلفية عند المرور */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="text-4xl mb-6 p-4 w-fit rounded-2xl bg-amber-500/20 border border-amber-500/30">
                {feature.icon}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-cairo mb-3 text-white group-hover:text-amber-300 transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
