require('dotenv').config();
const ProductController = require('./api/product/controller');
const express = require('express');
const compression = require('compression');
const { createPageRenderer } = require('vite-plugin-ssr');
const mongoose = require('mongoose');

const { DB_USER, DB_PASS } = process.env;
console.log(DB_USER, DB_PASS);
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@xanta.e5iwg.mongodb.net/mahBase?retryWrites=true&w=majority`);

const isProduction = process.env.NODE_ENV === 'production';
const root = `${__dirname}/..`;

async function startServer() {
  const app = express();

  app.use(compression());

  let viteDevServer;
  if (isProduction) {
    app.use(express.static(`${root}/dist/client`));
  } else {
    const vite = require('vite');
    viteDevServer = await vite.createServer({
      root,
      server: { middlewareMode: 'ssr' },
    });
    app.use(viteDevServer.middlewares);
  }

  app.get('/api/products', ProductController.get);
  app.post('/api/products', ProductController.post);

  const renderPage = createPageRenderer({ viteDevServer, isProduction, root });
  app.get('*', async (req, res, next) => {
    const url = req.originalUrl;
    const pageContextInit = {
      url,
    };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) return next();
    const { body, statusCode, contentType } = httpResponse;
    res.status(statusCode).type(contentType).send(body);
  });

  const port = process.env.PORT || 3000;
  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}

startServer();
