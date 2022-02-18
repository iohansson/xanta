const Product = require('./model');
const axios = require('axios');

module.exports = {
  async get(req, res) {
    res.status(200).json(await Product.find());
  },
  async post(req, res) {
    res.status(201).json(await Product.create(req.body));
  },

  async html(req, res) {
    console.log('get', req.query.url);
    const response = await axios.get(req.query.url, {
      withCredentials: true,
    });
    
    res.status(200).send(response.data);
  },
};
