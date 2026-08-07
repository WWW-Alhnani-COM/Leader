"use client";

import { useEffect, useRef, useState } from "react";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import ScrollOverlay from "@/components/ScrollOverlay";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import NewSection from "@/components/NewSection";
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
  
  // مرجع خاص لقسم "اسكرول"
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = scrollSectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // حساب تقدم التمرير داخل قسم "اسكرول" فقط
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      if (sectionTop <= 0 && -sectionTop < sectionHeight - windowHeight) {
        setIsVideoActive(true);
        const progress = Math.abs(sectionTop) / (sectionHeight - windowHeight);
        setScrollProgress(Math.max(0, Math.min(1, progress)));
      } else if (sectionTop > 0) {
        setIsVideoActive(false);
        setScrollProgress(0);
      } else {
        setIsVideoActive(false);
        setScrollProgress(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const adjustedFrame = isVideoActive ? Math.floor(scrollProgress * 119) : 0;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div id="top" />
      
      {/* خلفية الفيديو التفاعلية - تظهر وتتفاعل فقط عندما يكون المستخدم في قسم اسكرول */}
      <div 
        className="fixed inset-0 z-0 transition-opacity duration-700"
        style={{
          opacity: isVideoActive ? 1 : 0,
          pointerEvents: 'none',
        }}
      >
        <BackgroundCanvas images={images} frame={adjustedFrame} />
      </div>

      <Navigation />
      <main className="relative">
        {/* 1. HeroSection الطبيعي */}
        <div className="relative z-10">
          <HeroSection />
        </div>

        {/* 2. قسم "اسكرول" الخاص بالفيديو التفاعلي (بارتفاع 300vh ليعطي مساحة للتمرير) */}
        <div ref={scrollSectionRef} className="relative h-[300vh] z-10">
          <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none">
            <ScrollOverlay frame={adjustedFrame} isVisible={isVideoActive} />
          </div>
        </div>
        
        {/* 3. باقي الأقسام والـقسم الجديد */}
        <div className="relative z-20">
          <NewSection />
          <FeaturesSection />
          <VisionSection />
          <CTASection />
        </div>

        {/* مسافة تمرير إضافية */}
        <div className="h-48 md:h-64 lg:h-80" />
      </main>
    </>
  );
}
