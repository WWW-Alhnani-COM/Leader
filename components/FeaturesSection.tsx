"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const features = [
  {
    id: 1,
    icon: "🥭",
    title: "مانجو يمنية 100%",
    description: "نستخدم أجود أنواع المانجو اليمنية من مزارع تهامة، لضمان طعم أصيل وفريد.",
    color: "from-mango/20 to-orange/20",
  },
  {
    id: 2,
    icon: "🏭",
    title: "معايير عالمية",
    description: "نصنع عصائرنا وفق أحدث التقنيات العالمية، مع الالتزام بأعلى معايير الجودة.",
    color: "from-orange/20 to-mango/20",
  },
  {
    id: 3,
    icon: "💪",
    title: "خبرة عريقة",
    description: "ننطلق من رحم مجموعة رويان العريقة، التي تمتلك عقوداً من الخبرة في السوق.",
    color: "from-mango/20 to-orange/20",
  },
  {
    id: 4,
    icon: "🌿",
    title: "طبيعي 100%",
    description: "خالي من المواد الحافظة والألوان الصناعية، طبيعة نقية في كل رشفة.",
    color: "from-orange/20 to-mango/20",
  },
  {
    id: 5,
    icon: "🇾🇪",
    title: "دعم الاقتصاد الوطني",
    description: "باختيارك ليدر، أنت تدعم المزارع اليمني والاقتصاد الوطني.",
    color: "from-mango/20 to-orange/20",
  },
  {
    id: 6,
    icon: "🌟",
    title: "جودة تليق بك",
    description: "نقدم لك منتجاً يجمع بين الأصالة والجودة، ليكون خيارك الأول.",
    color: "from-orange/20 to-mango/20",
  },
];

export default function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="features"
      className="relative z-10 py-24 px-6 md:py-32 overflow-hidden"
    >
      {/* خلفية القسم */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-cream/50 via-white to-cream/50" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* عنوان القسم */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="inline-block font-cairo text-sm font-bold text-mango bg-mango/10 px-4 py-1.5 rounded-full mb-4">
            🌟 مميزاتنا
          </span>
          <h2 className="font-cairo text-3xl font-extrabold text-ink md:text-4xl lg:text-5xl">
            لماذا <span className="text-mango">ليدر</span>؟
          </h2>
          <p className="mt-4 font-cairo text-base text-muted max-w-2xl mx-auto md:text-lg">
            نقدم لك منتجاً يجمع بين الأصالة اليمنية والجودة العالمية
          </p>
        </motion.div>

        {/* شبكة المميزات */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className={`group relative rounded-2xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-mango/20`}
            >
              {/* خلفية البطاقة */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative">
                {/* الأيقونة */}
                <div className="text-5xl mb-4">{feature.icon}</div>
                
                {/* العنوان */}
                <h3 className="font-cairo text-xl font-extrabold text-ink mb-3">
                  {feature.title}
                </h3>
                
                {/* الوصف */}
                <p className="font-cairo text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
