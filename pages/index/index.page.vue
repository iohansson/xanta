<template>
  <h1
    class="text-7xl font-black leading-tight pb-8"
  >
    covertsanta
  </h1>
  <form-kit
    v-model="state.url"
    type="url"
    label="put url here"
    placeholder="https://good.stuff"
    validation="required|url"
    :input-class="`
      text-2xl text-black font-medium leading-tight
      border-2 border-black px-4 py-2 focus:outline-solid-hex-ff90e8 block w-full
      bg-white
    `"
    label-class="text-lg font-bold pb-1 block"
    outer-class="pb-4"
  />
  <button
    class="
      bg-white text-black
      block border-2 border-black mx-auto mb-16 px-8 py-2
      leading-tight font-bold text-xl uppercase
    "
    @click="addProduct"
  >
    <span>Click</span>
    <!-- <x-loading
      class="w-4"
      track="#f1f1f1"
      snake="#1b1b1b"
    /> -->
  </button>
  <div
    class="pb-8 grid grid-cols-2 gap-8"
  >
    <x-card
      v-for="item in state.items"
      :key="item.id"
      :item="item"
    />
  </div>
</template>

<script setup async>
import { reactive } from 'vue';
import { getProduct } from '#root/services/parse';
// import service from '#root/services/api';
import XCard from '#root/components/XCard.vue';
// import XLoading from '#root/components/XLoading.vue';

const state = reactive({
  url: '',
  items: [
    {
      name: 'Programming Rust: Fast, Safe Systems Development',
      price: '€51.51',
      image: 'https://images-na.ssl-images-amazon.com/images/I/51whbJcK+1L._SX258_BO1,204,203,200_.jpg',
      id: 'https://www.amazon.de/-/en/Jim-Blandy/dp/1492052590',
    },
    {
      brand: 'MONOPRICE',
      name: '73-cm monitor, gaming, 4K UHD, USB-C, 60 Hz',
      price: '239.00',
      currency: 'EUR',
      image: 'https://cdn-reichelt.de/bilder/web/artikel_ws/E300/MONOPRICE_43009_01.jpg',
      id: 'mpn:MONOPRICE 43009',
      url: 'https://www.reichelt.de/de/en/73-cm-monitor-gaming-4k-uhd-usb-c-60-hz-monoprice-43009-p318639.html',
    },
    {
      brand: 'Onkron.de',
      name: 'Monitor Tischhalterung doppel Arm 13 – 32 Zoll neigbar schwenkbar ausziehbar G200 Weiss',
      price: '10999',
      currency: 'EUR',
      image: 'https://cdn.shopify.com/s/files/1/0031/6860/0153/products/G200_wht_site_0.png?v=1633935664',
      id: 'https://onkron.de/products/monitor-tischhalterung-doppel-arm-13-34-zoll-neigbar-schwenkbar-ausziehbar-g200-weiss',
      url: 'https://onkron.de/products/monitor-tischhalterung-doppel-arm-13-34-zoll-neigbar-schwenkbar-ausziehbar-g200-weiss'
    },
    {
      name: 'LG 27UL550-W 68.58 cm (27 Inches) UHD 4K IPS Monitor (AMD Radeon FreeSync, DAS Mode, 98%sRGB), Black/White',
      price: '€279.00',
      image: 'https://images-eu.ssl-images-amazon.com/images/I/71Op7C9imyL.__AC_SY300_SX300_QL70_ML2_.jpg',
      url: 'https://www.amazon.de/-/en/27UL550-W-Inches-Monitor-FreeSync-98-sRGB/dp/B07QS5DBBH',
      id: 'https://www.amazon.de/-/en/27UL550-W-Inches-Monitor-FreeSync-98-sRGB/dp/B07QS5DBBH',
    },
  ],
});

async function addProduct() {
  console.log('add product');
  const product = await getProduct(state.url);

  state.items.push(product);
}

// const products = await service.get();
// console.log(products);
</script>
