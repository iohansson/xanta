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
    class="bg-black text-white px-4 py-1 uppercase font-bold mt-4"
    @click="getAmazonProduct"
  >
    Click
  </button>
  <div
    class="py-12"
  >
    <div
      v-for="item in state.items"
      :key="item.id"
      class="flex max-w-[400px] bg-black text-white w-full shadow-lg rounded-20px transition cursor-pointer"
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
          {{ item.title }}
        </div>
        <div
          class="bg-red text-white font-sans cursor-pointer rounded-12px py-1 px-2 mt-auto ml-auto"
        >
          {{ item.price }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup async>
import { reactive } from 'vue';
import * as cheerio from 'cheerio';

const state = reactive({
  url: '',
  items: [
    {
      title: 'Programming Rust: Fast, Safe Systems Development',
      price: '€51.51',
      image: 'https://images-na.ssl-images-amazon.com/images/I/51whbJcK+1L._SX258_BO1,204,203,200_.jpg',
      id: 'https://www.amazon.de/-/en/Jim-Blandy/dp/1492052590',
    },
  ],
});

async function getAmazonProduct() {
  const response = await fetch(state.url, {
    credentials: 'include',
  });
  const html = await response.text();
  const h = cheerio.load(html);

  state.items.push({
    title: h('#productTitle').text().trim(),
    price: h('#price').text().trim(),
    image: h('#main-image-container img[src]').attr('src'),
    id: h('link[rel="canonical"]').attr('href'),
  });
}
</script>
