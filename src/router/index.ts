import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";

const routes = [
  { path: "/", component: Login },
  {
    path: "/home",
    component: () => import("../views/home/layout.vue"),
    children: [
      {
        path: "",
        component: () => import("../views/home/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
