import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#18202B',
        steel: '#526174',
        mint: '#2F9E8F',
        coral: '#E86F51',
        amber: '#E7A93C',
        paper: '#F7F7F2',
      },
      boxShadow: {
        soft: '0 18px 55px rgba(24, 32, 43, 0.12)',
      },
    },
  },
  plugins: [],
} satisfies Config;
