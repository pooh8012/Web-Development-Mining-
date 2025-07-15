/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A", // dark background
        accent: "#3B82F6", // neon‑blue pill
        light: "#F8FAFC", // off‑white text
      },
    },
  },
  plugins: [],
};
