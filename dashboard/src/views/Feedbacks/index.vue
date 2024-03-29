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
              @select="changeFeedbacksType"
              class="mt-8 animate__animated animate__fadeIn animate__faster"
            />
          </template>
          <template #fallback>
            loading... <FiltersLoading class="mt-8" />
          </template>
        </suspense>
      </div>

      <div class="px-10 pt-20 col-span-3">
        <p
          v-if="state.hasError"
          class="text-lg text-center text-gray-800 font-regular"
        >
          Aconteceu um erro ao carregar os feedbacks.
        </p>

        <p
          v-if="
            !state.feedbacks.length &&
            !state.isLoading &&
            !state.isloadingFeedbacks &&
            !state.hasError
          "
          class="text-lg text-center text-gray-800 font-regular"
        >
          Ainda nenhum feedback recebido.
        </p>

        <FeedbackCardLoading
          v-if="state.isLoading || state.isloadingFeedbacks"
        />
        <FeedbackCard
          v-else
          v-for="(feedback, index) in state.feedbacks"
          :key="feedback.id"
          :is-opened="index === 0"
          :feedback="feedback"
          class="mb-8"
        />

        <FeedbackCardLoading v-if="state.isloadingMoreFeedback" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, onUnmounted, onErrorCaptured } from "vue";
import Filters from "./Filters.vue";
import FiltersLoading from "./FiltersLoading.vue";
import HeaderLogged from "../../components/HeaderLogged/index.vue";
import FeedbackCard from "../../components/FeedbackCard/index.vue";
import FeedbackCardLoading from "../../components/FeedbackCard/Loading.vue";
import services from "../../services";

const state = reactive({
  isLoading: false,
  isloadingFeedbacks: false,
  isloadingMoreFeedbacks: false,
  feedbacks: [],
  currentFeedbackType: "",
  pagination: {
    limit: 5,
    offset: 0,
    total: 0,
  },
  hasError: false,
});

onErrorCaptured(handleErros);

onMounted(() => {
  fetchFeedBacks();
  window.addEventListener("scroll", handleScroll, false);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll, false);
});

function handleErros(error) {
  state.isLoading = false;
  state.isloadingFeedbacks = false;
  state.isloadingMoreFeedback = false;
  state.hasError = !!error;
}

async function handleScroll() {
  const isBottomOfWindow =
    Math.ceil(document.documentElement.scrollTop + window.innerHeight) >=
    document.documentElement.scrollHeight;

  if (state.isLoading || state.isloadingMoreFeedbacks) return;
  if (!isBottomOfWindow) return;
  if (state.feedbacks.length >= state.pagination.total) return;

  try {
    state.isloadingMoreFeedback = true;
    const { data } = await services.feedbacks.getAll({
      ...state.pagination,
      type: state.currentFeedbackType,
      offset: state.pagination.offset + 5,
    });

    if (data.results.length) {
      state.feedbacks.push(...data.results);
    }

    state.isloadingMoreFeedbacks = false;
    state.pagination = data.pagination;
  } catch (error) {
    state.isloadingMoreFeedbacks = false;
    handleErros(error);
  }
}

async function changeFeedbacksType(type) {
  try {
    state.isloadingFeedbacks = true;
    state.pagination.offset = 0;
    state.pagination.limit = 5;
    state.currentFeedbackType = type;
    const { data } = await services.feedbacks.getAll({
      type,
      ...state.pagination,
    });

    state.feedbacks = data.results;
    state.pagination = data.pagination;
    state.isloadingFeedbacks = false;
  } catch (error) {
    handleErros(error);
  }
}

async function fetchFeedBacks() {
  try {
    state.isLoading = true;
    const { data } = await services.feedbacks.getAll({
      ...state.pagination,
      type: state.currentFeedBackType,
    });

    state.feedbacks = data.results;
    state.pagination = data.pagination;
    state.isLoading = false;
  } catch (error) {
    handleErros(error);
  }
}
</script>
