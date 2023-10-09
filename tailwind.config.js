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
    extend: {
      boxShadow: {
        'top-md': '0px 4px 6px 7px  rgb(0 0 0 / 0.1), 0px 2px 4px -2px rgb(0 0 0 / 0.1)',
      }
    }
  },
  plugins: [],
}

