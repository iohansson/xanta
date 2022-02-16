import Axios from 'axios';

const {
  VITE_PROTOCOL: PROTOCOL,
  VITE_HOST: HOST,
  VITE_PORT: PORT,
} = import.meta.env;

const axios = Axios.create({
  baseURL: `${PROTOCOL}://${HOST}:${PORT}/api`,
});

axios.interceptors.request.use((config) => {
  console.log('request', config);

  return config;
});

export default {
  get() {
    return axios.get('/products');
  },
  post(product) {
    return axios.post('/products', product);
  },
};
