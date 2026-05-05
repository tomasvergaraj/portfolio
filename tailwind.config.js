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
        ink: {
          50:  '#F4F6F9',
          100: '#E5EAF1',
          200: '#C7D0DD',
          300: '#9FAEC2',
          400: '#6F8298',
          500: '#4A5C72',
          600: '#33475F',
          700: '#243549',
          800: '#1E2A3A',
          900: '#141C28',
          950: '#0A0F18',
        },
        paper: {
          DEFAULT: '#FAFAF9',
          dark: '#0E0F11',
        },
      },
      fontFamily: {
        sans: ['"Geist"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(3rem, 8vw, 6.5rem)', { lineHeight: '1', letterSpacing: '-0.04em' }],
        'h1': ['clamp(2.25rem, 5vw, 3.75rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'h2': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        'prose-narrow': '60ch',
      },
    },
  },
  plugins: [],
}
