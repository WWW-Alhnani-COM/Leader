"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* صورة الخلفية */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* تدرج برتقالي فوق الصورة */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, rgba(248,201,40,0.20) 0%, rgba(242,140,40,0.30) 50%, rgba(248,201,40,0.15) 100%)",
        }}
      />
      
      {/* محتوى فارغ - فقط الخلفية */}
      <div className="relative z-10" />
    </section>
  );
}
