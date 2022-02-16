<template>
  <a
    class="block"
    target="_blank"
    :href="item.url"
  >
    <article
      :class="[
        'flex overflow-hidden flex-col border-2 border-black text-black',
        'transition-all transform-gpu',
        'hover:-translate-x-1.5 hover:-translate-y-1.5',
        'shadow-card',
      ]"
    >
      <div
        :class="[
          'border-b-2 border-black',
          'overflow-hidden bg-black h-200px w-full flex-shrink-0',
        ]"
      >
        <img
          :src="item.image"
          class="h-full bg-white border-r-2 border-black"
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
          class="bg-red text-white font-sans cursor-pointer py-1 px-2 mt-auto ml-auto border-2 border-black"
        >
          {{ item.price }}
        </div>
      </div>
    </article>
  </a>
</template>
<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
const { item } = toRefs(props);
</script>
<style>
</style>