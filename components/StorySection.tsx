"use client";

import { motion } from "framer-motion";

export default function StorySection() {
  return (
    <section id="story" className="relative z-10 flex min-h-screen items-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="content-card mx-auto max-w-2xl px-8 py-10 md:mr-auto md:ml-0"
      >
        <h2 className="font-cairo text-2xl font-extrabold text-orange md:text-3xl">
          قصة المنتج
        </h2>
        <p className="mt-4 font-cairo leading-relaxed text-ink">
          يُعد عصير ليدر المنتج الوطني الجديد من مجموعة عبدالله عتيبة التجارية
          وشركة رويان للاستثمار، اللتين تمتلكان خبرة واسعة في السوق اليمني عبر
          مصنع مياه صنعاء.
        </p>
        <p className="mt-4 font-cairo leading-relaxed text-ink">
          تم تدشينه رسمياً في حفل كبير بالعاصمة صنعاء في مايو 2026، بحضور
          مسؤولين ورجال أعمال، ليكون رسالة تؤكد أن الصناعة الوطنية قادرة على
          المنافسة عندما تتوفر الرؤية والإدارة والاستثمار.
        </p>
        <blockquote className="mt-6 border-e-4 border-mango pe-4 font-cairo italic leading-relaxed text-muted">
          "إطلاق منتج ليدر ليس مجرد إضافة تجارية، بل هو التزام منا بالاستمرار
          في نهج التميز والجودة التي طالما عرفت بها مجموعة عتيبة وشركة
          رويان."
          <footer className="mt-2 font-cairo text-sm font-bold not-italic text-orange">
            — الأستاذ محمد فايز معروف، المدير العام لشركة رويان
          </footer>
        </blockquote>
      </motion.div>
    </section>
  );
}
