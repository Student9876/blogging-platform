/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // ✅ Add this
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css}",               // optional, in case you have Tailwind classes in CSS
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
