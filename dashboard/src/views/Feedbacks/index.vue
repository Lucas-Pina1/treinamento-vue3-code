<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <HeaderLogged />
  </div>

  <div class="flex flex-col itens-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">Feddbacks</h1>
    <p class="text-lg text-center justify-center h-64 bg-brand-gray">
      Detalhes de todos os feedbacks recebidos.
    </p>
  </div>

  <div class="flex justify-center w-full pb-20">
    <div class="w-4/5 max-w-6xl py-10 grid-cols-4 gap-2">
      <div>
        <h1 class="text-3xl font-black text-brand-darkgray">Listagem</h1>
        <suspense>
          <template #default>
            <Filters
              class="mt-8 animate__animated animate__fadeIn animate__faster"
            />
          </template>
          <template #fallback> loading... <FiltersLoading class="mt-8" /> </template>
        </suspense>
      </div>

      <div class="px-10 pt-20 col-span-3"></div>
    </div>
  </div>
</template>

<script setup>
import Filters from "./Filters.vue";
import FiltersLoading from "./FiltersLoading.vue";
import HeaderLogged from "../../components/HeaderLogged/index";
</script>
