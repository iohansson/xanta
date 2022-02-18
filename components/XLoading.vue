<script setup>
import { toRefs, computed } from 'vue';

const props = defineProps({
  r: {
    type: Number,
    default: 32,
  },
  track: {
    type: String,
    default: '#1b1b1b',
  },
  snake: {
    type: String,
    default: '#ffffff',
  },
  type: {
    type: String,
    default: 'square',
  },
});
const { r, track, snake, type } = toRefs(props);

const inf = computed(() => {
  const w = 8 * r.value;
  const h = .5 * w;
  const x = -.5 * w;
  const y = -.5 * h;
  const c = Math.round(r.value / Math.SQRT2);
  const l = Math.ceil((3 * Math.PI + 4) * r.value);
  const d = ~~(Math.PI * r.value);

  return { w, h, x, y, c, l, d };
});

const sqr = computed(() => {
  const w = r.value;
  const h = w;
  const x = -.5 * w;
  const y = -.5 * h;
  const l = w * 4;
  const d = w;

  return { w, h, x, y, l, d };
});

const vars = computed(() => {
  if (type === 'infinity') return inf.value;

  return sqr.value;
});
</script>
<template>
  <svg
    class="max-w-4rem"
    :viewBox="[vars.x, vars.y, vars.w, vars.h].join(' ')"
    :style="{
      stroke: track,
    }"
  >
    <template
      v-if="type === 'infinity'"
    >
      <path
        id="figure"
        :d="`
          M${inf.c}${-inf.c}A${r} ${r} 0 1 1
          ${inf.c} ${inf.c}L${-inf.c}${-inf.c}A${r}
          ${r} 0 1 0${-inf.c} ${inf.c}z`"
      />
    </template>
    <template
      v-else
    >
      <rect
        id="figure"
        :x="sqr.x"
        :y="sqr.y"
        :width="sqr.w"
        :height="sqr.h"
      />
    </template>
    <use
      xlink:href="#figure"
      :stroke-dasharray="`${vars.d} ${vars.l - vars.d}`"
      :stroke-dashoffset="`${vars.l}px`"
      :style="{
        stroke: snake,
      }"
    />
  </svg>
</template>
<style scoped>
svg {
  fill: none;
  stroke-width: 8%;
}

use {
  animation: a 2s ease infinite;
}

@keyframes a { to { stroke-dashoffset: 0px } }
</style>
