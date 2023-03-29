<template>
  <div
    class="flex flex-col px-8 py-6 rounded cursor-pointer bg-brand-gray"
    @click="handleToggle"
  >
    <div class="flex items-center justify-between w-full mb-8">
      <Badge :type="props.feedback.type" />
      <span class="font-regular text-brand-graydark">
        {{ getDiffTimeBetweenCurrentDate(feedback.createdAt) }}
      </span>
    </div>

    <div
      :class="{ animate__fadeutUp: state.isClosing }"
      class="text-lg font-medium text=gray-800"
    >
      {{ feedback.text }}
    </div>

    <div
      v-if="state.isOpen"
      class="flex mt-8 animate__animated animate__fadeInUp animate__faster"
    >
      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">
            Páginas
          </span>
          <span class="font-medium text-gray-700 uppercase">
            {{ feedback.page }}
          </span>
        </div>

        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">
            Dispositivo
          </span>
          <span class="font-medium text-gray-700 uppercase">
            {{ feedback.device }}
          </span>
        </div>
      </div>

      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">
            Usuario
          </span>
          <span class="font-medium text-gray-700 uppercase">
            {{ feedback.fingerprint }}
          </span>
        </div>
      </div>
    </div>

    <div
      v-if="!state.isOpen"
      class="flex justify-end mt-8"
    >
      <Icon
        name="chevron-down"
        size="24"
        :color="brandColors.graydrak"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, reactive } from 'vue'
import Icon from '../icons/index.vue'
import Badge from './Badge'
import { getDiffTimeBetweenCurrentDate } from '../../utils/date'
import palette from '../../../palette'
import { wait } from '../../utils/timeout'

const brandColors = palette.brand

const props = defineProps({
  isOpened: { type: Boolean, default: false },
  feedback: { type: Object, required: true }
})

const state = reactive({
  isOpen: props.isOpened,
  isClosing: !props.isOpened
})

async function handleToggle () {
  state.isClosing = true

  await wait(250)
  state.isOpen = !state.isOpen
  state.isClosing = false
}
</script>
