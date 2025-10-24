/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'motivation': "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
