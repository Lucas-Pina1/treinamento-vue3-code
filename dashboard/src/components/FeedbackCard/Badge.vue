<template>
  <span
    :class="`bg-${classColor}`"
    class="p-2 text-xs font-black text-white uppercase rounded-full"
  >
    {{ label }}
  </span>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  type: { type: String, required: true },
});

const label = computed(() => {
  if (props.type === "ISSUE") {
    return "problema";
  }

  if (props.type === "IDEA") {
    return "ideia";
  }

  return "outros";
});

const classColor = computed(() => {
  if (props.type === "ISSUE") {
    return "brand-danger";
  }

  if (props.type === "IDEA") {
    return "brand-warnig";
  }

  return "brand-graydark";
});
</script>
