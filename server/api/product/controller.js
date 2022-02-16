const Product = require('./model');

module.exports = {
  async get(req, res) {
    res.status(200).json(await Product.find());
  },
  async post(req, res) {
    res.status(201).json(await Product.create(req.body));
  },
};
