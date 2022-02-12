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
  ],
});

async function addProduct() {
  const product = await getProduct(state.url);

  state.items.push(product);
}
</script>
