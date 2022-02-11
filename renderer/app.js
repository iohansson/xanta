import { createSSRApp, h } from 'vue';
import { plugin, defaultConfig } from '@formkit/vue/dist/index.esm';
import PageShell from './PageShell.vue';
import { setPageContext } from './usePageContext';

function createApp(pageContext) {
  const { Page, pageProps } = pageContext;
  const PageWithLayout = {
    render() {
      return h(
        PageShell,
        {},
        {
          default() {
            return h(Page, pageProps || {});
          },
        },
      );
    },
  };

  const app = createSSRApp(PageWithLayout);
  app.use(plugin, defaultConfig);

  // We make `pageContext` available from any Vue component
  setPageContext(app, pageContext);

  return app;
}

export { createApp };
