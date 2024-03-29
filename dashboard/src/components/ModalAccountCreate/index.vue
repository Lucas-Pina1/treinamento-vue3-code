<template>
  <div id="modal-create-account" class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">Crie uma conta</h1>

    <button @click="close" class="text-4xl text-gray-600 focus:outline-none">
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input
          v-model="state.email.value"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          type="email"
          :class="{
            'border-brand-danger': !!state.email.errorMenssage,
          }"
          placeholder="jane.dae@gmail.com"
        />
        <span
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.email.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Nome</span>
        <input
          v-model="state.name.value"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          type="text"
          :class="{
            'border-brand-danger': !!state.name.errorMenssage,
          }"
          placeholder="Jane Dae"
        />
        <span
          v-if="!!state.name.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.name.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <input
          v-model="state.password.value"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          type="password"
          :class="{
            'border-brand-danger': !!state.password.errorMenssage,
          }"
          placeholder="jane.dae@gmail.com"
        />
        <span
          v-if="!!state.password.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.password.errorMessage }}
        </span>
      </label>

      <button
        class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
        :class="{
          'opacity-50': state.isLoading,
        }"
        :disabled="state.isLoading"
        type="submit"
      >
        <Icon v-if="state.isLoading" name="Loading" class="animate-spin" />
        <span v-else>Entrar</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useField } from "vee-validate";
import { useToast } from "vue-toastification";
import { useModal } from "../../hooks/useModal";
import Icon from "../icons/index.vue";
import {
  validateEmptyAndLength3,
  validateEmptyAndEmail,
} from "../../utils/validators";
import services from "../../services";
import { useRouter } from "vue-router";

const router = useRouter();
const toast = useToast();

const { value: emailValue, errorMenssage: emailErrorMenssage } = useField(
  "email",
  validateEmptyAndEmail
);

const { value: nameValue, errorMenssage: nameErrorMenssage } = useField(
  "name",
  validateEmptyAndLength3
);

const { value: passwordValue, errorMenssage: passwordErrorMenssage } = useField(
  "password",
  validateEmptyAndLength3
);

const state = reactive({
  hasErrors: false,
  isLoading: false,
  email: {
    value: emailValue,
    errorMessage: emailErrorMenssage,
  },
  name: {
    value: nameValue,
    errorMenssage: nameErrorMenssage,
  },
  password: {
    value: passwordValue,
    errorMessage: passwordErrorMenssage,
  },
});

const modal = useModal();

async function login({ email, password }) {
  const { data, erros } = await services.auth.login({ email, password });
  if (!erros) {
    window.localStorage.setItem("token", data.token);
    router.push({ name: "Feddbacks" });
    modal.close();
    return;
  }
}

async function handleSubmit() {
  try {
    toast.clear();
    state.isLoading = true;
    const { errors } = await services.auth.register({
      name: state.name.value,
      email: state.email.value,
      password: state.password.value,
    });

    if (!errors) {
      await login({
        email: state.email.value,
        password: state.password.value,
      });
      return;
    }

    if (errors.status === 400) {
      toast.error("Ocorreu um erro ao criar a conta");
    }

    state.isLoading = false;
  } catch (error) {
    state.isLoading = false;
    state.hasErrors = !!error;
    toast.error("Ocorreu um erro ao criar a conta");
  }
}
</script>
