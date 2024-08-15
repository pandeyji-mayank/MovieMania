/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        customNob: ['Nabla', 'system-ui'],
        customHeading: ['Bungee Tint', 'system-ui']
      },
      keyframes: {
        textTransform: {
          '0%, 100%': { textTransform: 'uppercase' },
          '50%': { textTransform: 'lowercase' },
        },
      },
      animation: {
        textTransform: 'textTransform 2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('daisyui')
  ]
}

