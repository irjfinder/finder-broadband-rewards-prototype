/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        finder: {
          blue: '#1f7aec',
          blueDark: '#0a4fb6',
          ink: '#0f172a',
          muted: '#64748b',
          line: '#e2e8f0',
          bg: '#f8fafc',
          green: '#0e8f5e',
          greenBg: '#e7f8f0',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,23,42,.04), 0 4px 12px rgba(15,23,42,.05)',
      },
    },
  },
  plugins: [],
};
