import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("../views/Home/indexHome.vue");
const Feedbacks = () => import("../views/Feedbacks/indexFeedbacks.vue");
const Credencials = () => import("../views/Credencials/indexCredencials.vue");

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/feedbacks",
      name: "Feedbacks",
      component: Feedbacks,
      meta: { hasAuth: true },
    },
    {
      path: "/credencials",
      name: "Credencials",
      component: Credencials,
      meta: { hasAuth: true },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "Home" },
    },
  ],
});

export default router;
