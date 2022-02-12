import vue from '@vitejs/plugin-vue';
import ssr from 'vite-plugin-ssr/plugin';
import windicss from 'vite-plugin-windicss';

export default {
  plugins: [
    windicss({
      scan: {
        // By default only `src/` is scanned
        dirs: ['pages'],
        // We only have to specify the file extensions we actually use.
        fileExtensions: ['vue', 'js', 'ts', 'jsx', 'tsx', 'html', 'pug'],
      },
    }),
    vue(),
    ssr(),
  ],
  resolve: {
    alias: {
      '#root': __dirname,
    },
  },
};
