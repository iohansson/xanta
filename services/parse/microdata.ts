import { Product } from './index';

const PROPS = [
  'brand',
  'name',
  'image',
  'price',
  'priceCurrency',
  'productID',
  'url',
];

const getContent = dataElement => dataElement.attr('content')
  || dataElement.attr('src')
  || dataElement.attr('href')
  || dataElement.text()
  || dataElement.html();

const items = c => c('[itemscope]')
  .filter((i, el) => c(el).attr('itemtype')?.includes('schema.org/Product'));

const getProp = (dataRoot, propName) => getContent(dataRoot.find(`[itemprop="${propName}"]`))?.trim();

const getProps = dataRoot => Object.fromEntries(
  PROPS.map($prop => [
    $prop,
    getProp(dataRoot, $prop),
  ]),
);

export function findMicrodata(cheerio) {
  const dataRoot = items(cheerio).first();

  if (!dataRoot.length) return null;

  return dataRoot;
}

export function getProduct(dataRoot): Product {
  const props = getProps(dataRoot);

  return {
    brand: props.brand,
    name: props.name,
    price: props.price,
    currency: props.priceCurrency,
    image: props.image,
    id: props.productID || props.url,
    url: props.url,
  };
}
