<template>
  <h1>Stuff</h1>
  <form-kit
    v-model="state.url"
    type="url"
    label="url"
    placeholder="https://good.stuff"
    validation="required|url"
    input-class="text-base text-black border border-black px-2 py-1"
    label-class="text-base font-medium pb-1 block"
  />
  <button
    class="bg-white text-black px-4 py-1 uppercase font-bold mt-4"
    @click="addProduct"
  >
    Click
  </button>
  <div
    class="py-12"
  >
    <a
      v-for="item in state.items"
      :key="item.id"
      :href="item.url"
      class="flex max-w-[400px] bg-white text-black w-full border-black rounded-20px transition cursor-pointer"
    >
      <div
        :class="{
          'w-200px rounded-20px transition relative max-h-250px overflow-hidden': true,
          'flex items-center justify-center flex-shrink-0': true,
        }"
      >
        <img
          :src="item.image"
          class="w-full rounded-20px transition"
        >
      </div>
      <div
        class="p-4 flex flex-col"
      >
        <div
          class="pb-2 font-bold"
        >
          {{ item.name }}
        </div>
        <div
          class="bg-red text-white font-sans cursor-pointer rounded-12px py-1 px-2 mt-auto ml-auto"
        >
          {{ item.price }}
        </div>
      </div>
    </a>
  </div>
</template>

<script setup async>
import { reactive } from 'vue';
import { getProduct } from '#root/services/parse';

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
  const product = await getProduct(state.url);

  state.items.push(product);
}
</script>
