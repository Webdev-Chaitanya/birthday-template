import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        script: ['Great Vibes', 'cursive'],
      },
      colors: {
        background: '#0B1020',
        primary: '#FF6B9A',
        secondary: '#9F7AEA',
        accent: '#FFD166',
      },
      boxShadow: {
        glow: '0 20px 80px rgba(255,107,154,0.16)',
      },
    },
  },
  plugins: [],
}
