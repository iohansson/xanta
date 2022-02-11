import { defineConfig } from 'windicss/helpers';
import colors from 'windicss/colors';

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
});
