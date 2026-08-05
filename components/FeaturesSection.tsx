"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "🇾🇪",
    title: "هوية يمنية خالصة",
    body: "يعتمد بشكل كامل على أجود أنواع المانجو وغيرها من المحاصيل الزراعية اليمنية. هذا المنتج دعم حقيقي للمزارع اليمني، حيث حولنا دعمنا من المزارع الهندي إلى المزارع اليمني.",
  },
  {
    icon: "🏭",
    title: "معايير عالمية وجودة فائقة",
    body: "يُصنع في اليمن بمصنع ليدر للعصائر الفاخرة، وفق أحدث التقنيات وخطوط الإنتاج المتوافقة مع معايير الجودة والسلامة الغذائية العالمية.",
  },
  {
    icon: "💪",
    title: "ثقة وخبرة عريقة",
    body: "ينطلق من رحم مجموعة رويان العريقة التابعة لمجموعة عبدالله عتيبة التجارية، المشهود لها بالتميز والنجاح، وفي مقدمتها مصنع مياه صنعاء.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative z-10 flex min-h-screen items-center px-6 py-24">
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.12 }}
            className="content-card px-6 py-8 text-center"
          >
            <div className="text-4xl">{f.icon}</div>
            <h3 className="mt-4 font-cairo text-xl font-extrabold text-orange">
              {f.title}
            </h3>
            <p className="mt-3 font-cairo text-sm leading-relaxed text-muted">
              {f.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
