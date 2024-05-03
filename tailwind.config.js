/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'mp-green': '#0A6B2B',
      'mp-light-green': '#55B13E',
      'mp-blue': '#007EC2',
      'mp-dark': '#2F2E41',
      'mp-gray-soft': '#F3F0F0',
      'mp-error': '#EF4444',
      'mp-soft-red': '#FEF2F2',
      'mp-strong-red': '#991B1B',
      'mp-strong-gray': '#DDDDDD',
      'mp-soft-dark': '#5B596A',
      'mp-white': '#F8FAFC'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    fontFamily: {
      coda: ['Coda', 'sans-serif']
    }
  },
  plugins: [],
}
