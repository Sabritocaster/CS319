/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        menuvar: {
          100:"#00529f",
          200:"#FFF8F0",
          300:"#FF5722",
          400:"#57636C",
          500:"#101213",
          600:"#3e4450"
        }
      },
    },
  },
  plugins: [require("daisyui")],
}
