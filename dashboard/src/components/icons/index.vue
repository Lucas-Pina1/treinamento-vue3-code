<template>
  <component :is="name" v-bind="props" />
</template>

<script setup>
import { defineProps } from "vue";
import Loading from "./Loading.vue";
import Copy from "./Copy.vue";
import ChevronDown from "./ChevronDown.vue";

const props = defineProps({
  name: { type: String, required: true },
});
</script>

<script>
export default {
  components: { Loading, Copy, ChevronDown },
};
</script>
