/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '360px',     // Compact mobile
      'sm': '640px',     // Standard mobile / small tablet
      'md': '768px',     // Tablet portrait
      'lg': '1024px',    // Tablet landscape / small laptop
      'xl': '1280px',    // Standard desktop
      '2xl': '1536px',   // Large monitors
    },
    extend: {
      colors: {
        brand: {
          50: '#fef2f2',
          100: '#ffe1e1',
          200: '#ffc8c8',
          300: '#ffa2a2',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#C62828', // Deep Fire Red
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        accent: {
          DEFAULT: '#F5B400',
          hover: '#E5A500',
          light: '#FEF3C7',
          dark: '#B45309',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.08)',
        'hover': '0 20px 35px -5px rgba(198, 40, 40, 0.12)',
        'glow': '0 0 25px rgba(198, 40, 40, 0.25)',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      }
    },
  },
  plugins: [],
}
