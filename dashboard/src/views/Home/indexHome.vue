<template>
  <custom-Header @create-account="handleAccountCreate" @login="handleLogin" />
  <contact-Home />
  <footer class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800">feddback © 2023</p>
  </footer>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import CustomHeader from "./CustomHeader.vue";
import ContactHome from "./ContactHome.vue";

const router = useRouter();

onMounted(() => {
  const token = window.localStorage.getItem("token");

  if (token) {
    router.push({ name: "Feedbacks" });
  }
}),
  function handleLogin() { };

function handleAccountCreate() { }
</script>
