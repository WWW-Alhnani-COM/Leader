# موقع عصائر ليدر — Next.js 14 + TypeScript + Tailwind + Framer Motion

موقع هبوط (Landing Page) لمنتج عصائر "ليدر" اليمني، مبني بنظام Scrollytelling
يعتمد على Canvas كخلفية ثابتة للموقع بالكامل، مع تحسين متكامل لمحركات البحث.

## 🚀 التشغيل

\`\`\`bash
# 1. تثبيت الاعتماديات
npm install

# 2. ضع صور الإطارات (120 صورة) في:
#    public/frames/ezgif-frame-001.jpg ... ezgif-frame-120.jpg
#    (راجع public/frames/README.txt)

# 3. تشغيل بيئة التطوير
npm run dev
# افتح http://localhost:3000

# 4. البناء للإنتاج
npm run build
npm start
\`\`\`

قبل النشر، أضف أيضاً:
- \`public/favicon.ico\`
- \`public/og-image.jpg\` (1200×630) لبطاقات المشاركة على وسائل التواصل

## 🧠 كيف يعمل نظام Scrollytelling

- **\`hooks/useScrollAnimation.ts\`**
  - \`useFramePreloader()\`: يحمّل كل الإطارات الـ120 مسبقاً في الذاكرة ويرجع
    نسبة التقدم (0–100%) لعرضها في شاشة التحميل.
  - \`useScrollFrame()\`: يستمع لحدث scroll عبر requestAnimationFrame
    (لا setState مباشر داخل معالج التمرير، لتفادي التقطيع)، ويحوّل نسبة
    التمرير الكلية للصفحة (0 → 1) إلى رقم إطار (0 → 119).

- **\`components/BackgroundCanvas.tsx\`**
  - Canvas بموضع fixed inset-0 z-0 يغطي كامل الشاشة خلف كل المحتوى.
  - يتعامل مع devicePixelRatio (بحد أقصى 2x) لوضوح عالٍ دون إهدار أداء.
  - يرسم كل إطار بنظام "contain fit" (لا اقتصاص) ويعيد الحساب عند تغيير
    حجم النافذة.
  - يرسم فقط عند تغيّر رقم الإطار فعلياً لتفادي رسم زائد.

- **\`components/ScrollOverlay.tsx\`**
  - يحدّد "المشهد" الحالي (1–4) بناءً على رقم الإطار عبر utils/helpers.ts.
  - يعرض العنوان والعنوان الفرعي في الجهة المقابلة لاتجاه دخول المنتج
    تماماً كما في جدول البرومبت (وسط / يسار / يمين / من الأعلى للوسط).
  - يُجبر الحاوية الخارجية على dir="ltr" حتى تبقى "اليسار" و"اليمين" جهات
    فعلية على الشاشة بغض النظر عن اتجاه الصفحة RTL، بينما يُعاد dir="rtl"
    على مستوى النص نفسه لعرض العربية بشكل صحيح.
  - يتلاشى النص دخولاً وخروجاً (fade) عبر أول وآخر 20% من مدة كل مشهد.

- **\`app/page.tsx\`**
  - يربط كل ما سبق: شاشة تحميل → Canvas ثابت → طبقة النصوص المتزامنة →
    شريط تنقل شفاف → أقسام المحتوى فوق كل شيء بخلفيات كريمية شبه شفافة.
  - رقم الإطار مبني على تقدم التمرير الكلي للصفحة بأكملها.

## 🎨 نظام الألوان (Tailwind)

معرّفة في tailwind.config.js تحت المفاتيح: mango, cream, orange,
yemen.green, yemen.red, ink, muted.

## ♿ الأداء وإمكانية الوصول

- prefers-reduced-motion مفعّل في globals.css.
- focus-visible واضح على كل الروابط والأزرار.
- الصور تُحمّل مسبقاً مرة واحدة فقط ثم تُرسم من الذاكرة.
- خطوط Cairo/Tajawal عبر next/font/google.
- Metadata كاملة + JSON-LD (Product schema) + sitemap.ts + robots.ts.

## 📂 بنية المشروع

\`\`\`
app/            layout.tsx, page.tsx, globals.css, sitemap.ts, robots.ts
components/     BackgroundCanvas, Navigation, HeroSection, StorySection,
                FeaturesSection, VisionSection, CTASection, ScrollOverlay,
                LoadingScreen
hooks/          useScrollAnimation.ts
utils/          helpers.ts
public/frames/  ضع هنا 120 صورة ezgif-frame-001.jpg إلى ezgif-frame-120.jpg
\`\`\`
