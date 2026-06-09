/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // scan all your source files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5f6fff",   // cleaned hex (drop `ff` at end)
        secondary: "#9333EA",
        accent: "#F59E0B",
      },
      gridTemplateColumns:{
        'auto': 'repeat(auto-fit, minmax(200px, 1fr))',
      }
    },
  },
  plugins: [],
};
