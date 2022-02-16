import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  theme: {
    extend: {
      colors: {
        black: '#1b1b1b',
        white: '#f1f1f1',
        red: '#ff1f1f',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  shortcuts: {
    'shadow-card': {
      '&:hover': {
        boxShadow: '6px 6px 0 0 #1b1b1b',
      },
    },
  },
});
