import { Product } from './index';

const SCHEMA_SELECTOR = 'script[type="application/ld+json"]';

interface SchemaOrgOffer {
  price: string;
  priceCurrency: string;
  sku: string;
}

interface SchemaOrgProduct {
  name: string;
  image: string;
  id: string;
  offers: SchemaOrgOffer[];
  sku: string;
  url: string;
}

export function findSchema(cheerio): SchemaOrgProduct {
  const schemaScript = cheerio(SCHEMA_SELECTOR)?.first();

  if (!schemaScript) return null;

  try {
    return JSON.parse(schemaScript.html());
  } catch (err) {
    return null;
  }
}

export function getProduct(schema: SchemaOrgProduct): Product {
  return {
    name: schema.name.trim(),
    price: schema.offers.at(0)?.price,
    currency: schema.offers.at(0)?.priceCurrency,
    image: schema.image,
    id: schema['@id'],
    url: schema.url,
  };
}
