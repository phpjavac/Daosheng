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

/** 路由守卫 */

const whiteList = ["/"]; // 白名单

// router.beforeEach((to, from, next) => {
//   const { role, code } = sessionStorage.getItem("role") as unknown as Record<
//     Role,
//     string
//   >;

//   if (!role || !code) {
//     if (whiteList.includes(to.path)) {
//       next();
//       return;
//     }
//     next({ path: "/" });
//   } else if (
//     to.meta.role === null ||
//     (to.meta.role && !(to.meta.role as string[]).includes(role))
//   ) {
//     switch (role) {
//       case "admin":
//         next({ path: "admin" });
//         break;
//       case "teacher":
//         next({ path: "/teacher" });
//         break;
//       default:
//         break;
//     }
//   } else {
//     next();
//   }
// });

export default router;
