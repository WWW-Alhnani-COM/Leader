"use client";

import { motion } from "framer-motion";

const points = [
  {
    title: "دعم الاقتصاد الوطني",
    body: "تقليل فاتورة الاستيراد والاعتماد على الذات",
  },
  {
    title: "خلق فرص عمل",
    body: "توفير وظائف مباشرة وغير مباشرة للشباب اليمني",
  },
  {
    title: "طموح تصديري",
    body: "نطمح لأن ننافس بمنتجنا الوطني في الأسواق الإقليمية قريباً، ونجعل من المنتج اليمني علامة فارقة في المنطقة",
  },
];

export default function VisionSection() {
  return (
    <section id="vision" className="relative z-10 flex min-h-screen items-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="content-card mx-auto max-w-2xl px-8 py-10 md:ml-auto md:mr-0"
      >
        <h2 className="font-cairo text-2xl font-extrabold text-orange md:text-3xl">
          الرؤية والأثر الاقتصادي
        </h2>
        <p className="mt-4 font-cairo leading-relaxed text-ink">
          لا يقتصر منتج ليدر على كونه عصيراً فاخراً، بل هو مشروع وطني بطموح
          كبير:
        </p>
        <ul className="mt-6 space-y-4">
          {points.map((p) => (
            <li key={p.title} className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-mango" />
              <div>
                <p className="font-cairo font-bold text-ink">{p.title}</p>
                <p className="font-cairo text-sm text-muted">{p.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
