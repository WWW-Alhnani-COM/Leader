"use client";

import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-transparent backdrop-blur-sm px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Logo - حجم 10 */}
        <a href="#top" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="ليدر" 
            className="h-10 w-auto"
          />
        </a>

        {/* روابط التنقل - في المنتصف */}
        <div className="hidden items-center gap-8 md:flex md:absolute md:left-1/2 md:-translate-x-1/2">
          <a href="#features" className="font-cairo text-sm font-medium text-white/80 hover:text-mango transition-colors duration-300 hover:scale-105">
            الميزات
          </a>
          <a href="#vision" className="font-cairo text-sm font-medium text-white/80 hover:text-mango transition-colors duration-300 hover:scale-105">
            رؤيتنا
          </a>
          <a href="#cta" className="font-cairo text-sm font-medium text-white/80 hover:text-mango transition-colors duration-300 hover:scale-105">
            تواصل معنا
          </a>
        </div>

        {/* زر القائمة للجوال */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* قائمة الجوال */}
      {isOpen && (
        <div className="mt-4 flex flex-col gap-4 md:hidden bg-black/40 backdrop-blur-md rounded-lg p-4 border border-white/10">
          <a href="#features" className="font-cairo text-sm text-white/80 hover:text-mango transition-colors duration-300">
            الميزات
          </a>
          <a href="#vision" className="font-cairo text-sm text-white/80 hover:text-mango transition-colors duration-300">
            رؤيتنا
          </a>
          <a href="#cta" className="font-cairo text-sm text-white/80 hover:text-mango transition-colors duration-300">
            تواصل معنا
          </a>
        </div>
      )}
    </nav>
  );
}
