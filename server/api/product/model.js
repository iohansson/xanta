const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  brand: String,
  name: String,
  price: String,
  currency: String,
  image: String,
  id: String,
  url: String,
});

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
