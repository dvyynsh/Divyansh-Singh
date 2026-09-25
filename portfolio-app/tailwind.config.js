/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        primary: '#1a4b9e', // deep blue
        secondary: '#0f295e',
        accent: '#3b82f6', // brighter blue
        text: '#f5f5f5',
        'text-muted': '#a1a1aa'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif']
      }
    },
  },
  plugins: [],
}
