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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const hero = heroRef.current;
      if (!hero) return;
      
      const heroHeight = hero.offsetHeight;
      const scrollY = window.scrollY;
      
      const progress = Math.max(0, Math.min(1, scrollY / (heroHeight * 0.7)));
      
      hero.style.opacity = String(1 - progress);
      hero.style.transform = `translateY(${-progress * 80}px) scale(${1 - progress * 0.05})`;
      
      if (progress >= 0.95) {
        setHeroHidden(true);
        // ✅ حساب نسبة التمرير بعد اختفاء الهيرو
        const remainingScroll = window.scrollY - heroHeight * 0.7;
        const maxRemaining = document.documentElement.scrollHeight - window.innerHeight - heroHeight * 0.7;
        const afterProgress = maxRemaining > 0 ? Math.min(remainingScroll / maxRemaining, 1) : 0;
        setScrollProgress(afterProgress);
      } else {
        setHeroHidden(false);
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ حساب الإطار بناءً على نسبة التمرير بعد اختفاء الهيرو
  const adjustedFrame = heroHidden ? Math.floor(scrollProgress * 119) : 0;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div id="top" />
      
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
        <div ref={heroRef} className="relative z-10">
          <HeroSection />
        </div>

        <div className="relative z-10">
          <ScrollOverlay frame={adjustedFrame} isVisible={heroHidden} />
        </div>
        
        <div className="relative z-10">
          <FeaturesSection />
          <VisionSection />
          <CTASection />
        </div>

        <div className="h-48 md:h-64 lg:h-80" />
      </main>
    </>
  );
}
