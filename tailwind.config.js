/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mango: "#F8C928",
        cream: "#FFF5D6",
        orange: "#F28C28",
        yemen: {
          green: "#009A44",
          red: "#CE1126",
        },
        ink: "#1A1A1A",
        muted: "#666666",
      },
      fontFamily: {
        cairo: ["var(--font-cairo)", "sans-serif"],
        tajawal: ["var(--font-tajawal)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 30px rgba(26, 26, 26, 0.08)",
        glow: "0 0 40px rgba(248, 201, 40, 0.35)",
      },
      backgroundImage: {
        "mango-gradient": "linear-gradient(135deg, #F8C928 0%, #F28C28 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};
