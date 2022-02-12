import * as cheerio from 'cheerio';
import { findSchema, getProduct as getProductFromSchema } from './schema.org';

export interface Product {
  name: string;
  price?: string;
  currency?: string;
  image?: string;
  url: string;
  id: string;
}

export async function getProduct(url): Promise<Product> {
  const response = await fetch(url, {
    credentials: 'include',
  });
  const html = await response.text();
  const h = cheerio.load(html);

  // try schema.org
  const schema = findSchema(h);
  if (schema) return getProductFromSchema(schema);
  // try providers
  // const provider = findProvider(response);
  // try meta
  // const meta = findMeta(h);
  // die

  return {
    name: h('#productTitle').text().trim(),
    price: h('#price').text().trim(),
    image: h('#main-image-container img[src]').attr('src'),
    url: h('link[rel="canonical"]').attr('href'),
    id: h('link[rel="canonical"]').attr('href'),
  };
}

export default null;
