import { Product } from './index';

const SCHEMA_SELECTOR = 'script[type="application/ld+json"]';

const scripts = c => c(SCHEMA_SELECTOR)
  .filter((i, el) => /["\\]*@type["\\]*:\s*["\\]*Product["\\]*/.test(c(el).html()));

export function findSchema(cheerio): SchemaOrgProduct {
  const schemaScript = scripts(cheerio).first();

  if (!schemaScript.length) return null;

  try {
    return JSON.parse(schemaScript.html());
  } catch (err) {
    return null;
  }
}

export function getProduct(schema: SchemaOrgProduct): Product {
  return {
    brand: typeof schema.brand === 'string' ? schema.brand.trim() : schema.brand?.name,
    name: schema.name.trim(),
    price: schema.offers.at(0)?.price,
    currency: schema.offers.at(0)?.priceCurrency,
    image: schema.image,
    id: schema['@id'],
    url: schema.url,
  };
}

interface SchemaOrgOffer {
  price: string;
  priceCurrency: string;
  sku: string;
}

interface SchemaOrgProduct {
  brand?: string | { name: string };
  name: string;
  image: string;
  id: string;
  offers: SchemaOrgOffer[];
  sku: string;
  url: string;
}
