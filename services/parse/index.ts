import * as cheerio from 'cheerio';
import { findSchema, getProduct as getProductFromSchema } from './schema.org';
import { findMicrodata, getProduct as getProductFromMicrodata } from './microdata';
import api from '#root/services/api';

export interface Product {
  brand?: string;
  name: string;
  price?: string;
  currency?: string;
  image?: string;
  url: string;
  id: string;
}

export async function getProduct(url): Promise<Product> {
  const h = cheerio.load(await api.html(url));

  // try schema.org
  const schema = findSchema(h);
  console.log('schema', schema);
  if (schema) return getProductFromSchema(schema);
  const microdata = findMicrodata(h);
  console.log('microdata', microdata);
  if (microdata) return getProductFromMicrodata(microdata);
  // try providers
  // const provider = findProvider(response);
  // fall to meta
  // const meta = findMeta(h);
  // no meta - die

  let price = h('#price');
  if (!price.length) price = h('.a-price').first();
  if (price.children().length > 1) price = price.children().first();

  return {
    name: h('#productTitle').text().trim(),
    price: price.text().trim(),
    image: h('#main-image-container img[src]').attr('src'),
    url: h('link[rel="canonical"]').attr('href'),
    id: h('link[rel="canonical"]').attr('href'),
  };
}

export default null;
