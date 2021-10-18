import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/Login.vue";
import { AppRouterRecordRaw } from "./type";

const routes: AppRouterRecordRaw[] = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      title: Login,
      role: ["admin", "teacher", "student"],
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[],
});

export default router;
