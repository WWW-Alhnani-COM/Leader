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
  const [videoVisible, setVideoVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = heroRef.current;
      if (!hero) return;
      
      const rect = hero.getBoundingClientRect();
      const heroHeight = hero.offsetHeight;
      
      // حساب مقدار التمرير بالنسبة لارتفاع الهيرو
      const scrollProgress = Math.max(0, Math.min(1, (window.scrollY) / (heroHeight * 0.8)));
      
      // اختفاء الهيرو: يتلاشى ويتحرك للأعلى
      hero.style.opacity = String(1 - scrollProgress);
      hero.style.transform = `translateY(${-scrollProgress * 50}px) scale(${1 - scrollProgress * 0.03})`;
      
      // عندما يختفي الهيرو تماماً (أكثر من 95%)، يظهر الفيديو
      if (scrollProgress >= 0.95) {
        setVideoVisible(true);
      } else {
        setVideoVisible(false);
      }
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
      
      {/* خلفية الفيديو - تظهر فقط بعد اختفاء الهيرو */}
      <div 
        className="fixed inset-0 z-0 transition-opacity duration-700"
        style={{
          opacity: videoVisible ? 1 : 0,
          pointerEvents: videoVisible ? 'auto' : 'none',
        }}
      >
        <BackgroundCanvas images={images} frame={frame} />
        <ScrollOverlay frame={frame} />
      </div>

      <Navigation />
      <main className="relative">
        {/* HeroSection - يختفي عند التمرير */}
        <div ref={heroRef} className="relative z-10 transition-all duration-300">
          <HeroSection />
        </div>
        
        {/* باقي الأقسام */}
        <div className="relative z-10">
          <FeaturesSection />
          <VisionSection />
          <CTASection />
        </div>
      </main>
    </>
  );
}
