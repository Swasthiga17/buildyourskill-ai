/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070A14',
          900: '#0B0F19',
          850: '#101726',
          800: '#172033',
          700: '#1E293B'
        },
        amber: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706'
        },
        cyan: {
          400: '#38BDF8',
          500: '#06B6D4',
          600: '#0891B2'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    },
  },
  plugins: [],
}
