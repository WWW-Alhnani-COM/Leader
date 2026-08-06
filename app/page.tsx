"use client";

import { useEffect, useRef, useState } from "react";
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
  const [heroHidden, setHeroHidden] = useState(false);
  const [startFrame, setStartFrame] = useState(0);
  const frameRef = useRef(0);

  // تتبع قيمة الفريم الحالية
  useEffect(() => {
    frameRef.current = frame;
  }, [frame]);

  useEffect(() => {
    const handleScroll = () => {
      const hero = heroRef.current;
      if (!hero) return;
      
      const heroHeight = hero.offsetHeight;
      const scrollY = window.scrollY;
      
      const scrollProgress = Math.max(0, Math.min(1, scrollY / (heroHeight * 0.7)));
      
      hero.style.opacity = String(1 - scrollProgress);
      hero.style.transform = `translateY(${-scrollProgress * 80}px) scale(${1 - scrollProgress * 0.05})`;
      
      // ✅ عندما يختفي الهيرو، نحفظ قيمة الفريم الحالية كقيمة بداية
      if (scrollProgress >= 0.95 && !heroHidden) {
        setHeroHidden(true);
        setStartFrame(frameRef.current);
      } else if (scrollProgress < 0.95 && heroHidden) {
        setHeroHidden(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [heroHidden]);

  // ✅ حساب الفريم المعدل (يبدأ من 0 عند اختفاء الهيرو)
  const adjustedFrame = heroHidden ? Math.max(0, frame - startFrame) : 0;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div id="top" />
      
      {/* خلفية الفيديو */}
      <div 
        className="fixed inset-0 z-0 transition-opacity duration-700"
        style={{
          opacity: heroHidden ? 1 : 0,
          pointerEvents: 'none',
        }}
      >
        <BackgroundCanvas images={images} frame={adjustedFrame} />
      </div>

      <Navigation />
      <main className="relative">
        {/* HeroSection */}
        <div ref={heroRef} className="relative z-10">
          <HeroSection />
        </div>

        {/* الهيلبر - مع الفريم المعدل */}
        <div className="relative z-10">
          <ScrollOverlay frame={adjustedFrame} isVisible={heroHidden} />
        </div>
        
        {/* باقي الأقسام */}
        <div className="relative z-10">
          <FeaturesSection />
          <VisionSection />
          <CTASection />
        </div>

        {/* ✅ مسافة تمرير إضافية لضمان الوصول إلى الإطار 120 */}
        <div className="h-32 md:h-48 lg:h-64" />
      </main>
    </>
  );
            }
