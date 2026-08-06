"use client";

import { useEffect, useRef } from "react";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import ScrollOverlay from "@/components/ScrollOverlay";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import VisionSection from "@/components/VisionSection";
import CTASection from "@/components/CTASection";
import { useFramePreloader, useScrollFrame } from "@/hooks/useScrollAnimation";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "عصير ليدر",
  description: "أول منتج عصائر يمني بنكهة الأصالة وجودة العالم.",
  brand: { "@type": "Brand", name: "ليدر" },
  manufacturer: { "@type": "Organization", name: "شركة رويان للاستثمار" },
  countryOfOrigin: { "@type": "Country", name: "اليمن" },
  category: "مشروبات - عصائر",
};

export default function Home() {
  const { images } = useFramePreloader();
  const { frame } = useScrollFrame();
  const heroRef = useRef<HTMLDivElement>(null);

  // تأثير اختفاء HeroSection عند التمرير
  useEffect(() => {
    const handleScroll = () => {
      const hero = heroRef.current;
      if (!hero) return;
      
      const scrollY = window.scrollY;
      const heroHeight = hero.offsetHeight;
      
      // عندما يمرر المستخدم 70% من ارتفاع الهيرو، يبدأ بالاختفاء
      const progress = Math.min(scrollY / (heroHeight * 0.7), 1);
      hero.style.opacity = String(1 - progress);
      hero.style.transform = `scale(${1 - progress * 0.05})`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div id="top" />
      
      {/* خلفية الفيديو - ثابتة في الخلفية */}
      <div className="fixed inset-0 z-0">
        <BackgroundCanvas images={images} frame={frame} />
        <ScrollOverlay frame={frame} />
      </div>

      <Navigation />
      <main className="relative">
        {/* HeroSection - يظهر فوق الفيديو ويختفي عند التمرير */}
        <div ref={heroRef} className="relative z-10">
          <HeroSection />
        </div>
        
        {/* باقي الأقسام - تظهر بعد اختفاء HeroSection */}
        <div className="relative z-10">
          <FeaturesSection />
          <VisionSection />
          <CTASection />
        </div>
      </main>
    </>
  );
}
