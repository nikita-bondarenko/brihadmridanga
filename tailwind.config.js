/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx,css}",
    "./src/components/**/*.{js,jsx,ts,tsx,css}",
    "./src/templates/**/*.{js,jsx,ts,tsx,css}",
  ],
  theme: {
    screens: {
      '2xl': { 'max': '1919px' },

      'xl': { 'max': '1439px' },

      'lg': { 'max': '1023px' },

      'md': { 'max': '767px' },

      'sm': { 'max': '479px' },
    },
    fontFamily: {
      'nunito': ['Nunito', 'ui-serif'],
    },
    extend: {
      colors: {
        'yellow': { 200: '#FFF4DE', 400: '#FEC955' },
        'gray': { 300: '#AFAFAF', 400: '#F5F7FA' }
      },
      animation: {
        'appear': 'appear 1s linear',
        'disappear': 'disappear 0.5s linear',

      },
      keyframes: {
        appear: {
          '0%, 50%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        disappear: {
          '0%': { opacity: 1, display: 'inline-block' },
          '100%': { opacity: 0, display: 'inline-block' },
        }
      }
    },
  },
  plugins: [],
}

