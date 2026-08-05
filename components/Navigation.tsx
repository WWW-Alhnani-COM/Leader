"use client";

import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-transparent backdrop-blur-sm px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Logo */}
        <a href="#top" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="ليدر" 
            className="h-8 w-auto"
          />
        </a>

        {/* روابط التنقل */}
        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="font-cairo text-sm text-white/80 hover:text-mango transition-colors">
            الميزات
          </a>
          <a href="#vision" className="font-cairo text-sm text-white/80 hover:text-mango transition-colors">
            رؤيتنا
          </a>
          <a href="#cta" className="font-cairo text-sm text-white/80 hover:text-mango transition-colors">
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
        <div className="mt-4 flex flex-col gap-4 md:hidden bg-black/50 backdrop-blur-sm rounded-lg p-4">
          <a href="#features" className="font-cairo text-sm text-white/80 hover:text-mango transition-colors">
            الميزات
          </a>
          <a href="#vision" className="font-cairo text-sm text-white/80 hover:text-mango transition-colors">
            رؤيتنا
          </a>
          <a href="#cta" className="font-cairo text-sm text-white/80 hover:text-mango transition-colors">
            تواصل معنا
          </a>
        </div>
      )}
    </nav>
  );
}
