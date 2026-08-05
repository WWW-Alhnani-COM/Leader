import type { Metadata, Viewport } from "next";
import { Cairo, Tajawal } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFF5D6",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://leader-yemen-ed42.onrender.com"),
  title: {
    default: "ليدر | عصائر يمنية فاخرة - فخر الصناعة اليمنية",
    template: "%s | ليدر - عصائر يمنية",
  },
  description:
    "عصير ليدر - أول منتج عصائر يمني بنكهة الأصالة وجودة العالم. منتج وطني من مجموعة عبدالله عتيبة التجارية وشركة رويان للاستثمار.",
  keywords: [
    "عصير ليدر",
    "عصائر يمنية",
    "منتج وطني يمني",
    "عصير مانجو يمني",
    "صناعة يمنية",
    "عصائر فاخرة",
    "ليدر",
    "Leader Juice",
    "Yemeni Juice",
  ],
  authors: [{ name: "شركة رويان للاستثمار" }],
  openGraph: {
    title: "ليدر | عصائر يمنية فاخرة - فخر الصناعة اليمنية",
    description:
      "أول منتج عصائر يمني بنكهة الأصالة وجودة العالم. اكتشف طعم الجودة اليمنية الأصيلة.",
    url: "https://leader-yemen-ed42.onrender.com",
    siteName: "ليدر - عصائر يمنية فاخرة",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "عصير ليدر - فخر الصناعة اليمنية",
      },
    ],
    locale: "ar_YE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ليدر | عصائر يمنية فاخرة - فخر الصناعة اليمنية",
    description: "أول منتج عصائر يمني بنكهة الأصالة وجودة العالم.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: "https://leader-juice.com",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${tajawal.variable}`}>
      <body className="font-cairo bg-cream text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
