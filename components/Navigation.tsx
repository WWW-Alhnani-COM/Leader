"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#story", label: "قصتنا" },
  { href: "#features", label: "الميزات" },
  { href: "#vision", label: "رؤيتنا" },
  { href: "#cta", label: "تواصل معنا" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-4 transition-colors duration-300 md:px-12 ${
        scrolled ? "bg-cream/85 shadow-soft backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <a href="#top" className="font-cairo text-xl font-extrabold text-orange">
        ليدر
      </a>
      <nav className="hidden gap-8 md:flex">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-cairo text-sm font-semibold text-ink transition-colors hover:text-orange"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <a href="#hero" className="btn-primary rounded-full px-5 py-2 font-cairo text-sm font-bold">
        اكتشف المنتج
      </a>
    </header>
  );
}
