import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";

const routes = [{ path: "/", component: Login }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
