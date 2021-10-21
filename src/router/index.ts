import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { message } from "ant-design-vue";
import Login from "../views/Login.vue";
import Layout from "../views/layout.vue"
import { AppRouterRecordRaw ,APPRouteMeta, RoleType} from "./type";
import studentRoute from "./student"
import adminRouter from "./teacher";

const routes: AppRouterRecordRaw[] = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
      role: ["admin", "teacher", "student"],
    },
  },
  {
    path:"/Teacher",
    name:"Teacher",
    meta:{
      title: "教室端",
      role:["admin","teacher"]
    },
    component:Layout,
    children:adminRouter,
    redirect: { path:"/Teacher/classManage" }
  },
  {
    path:"/Student",
    name:"Student",
    meta:{
      title: "Student",
      role:["student"]
    },
    children:studentRoute
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes as unknown as RouteRecordRaw[],
});



const whiteList = ["/"]; // 路由白名单：不需要登录也可以进入

router.beforeEach((to,from,next) => {

  const role = sessionStorage.getItem("role") || ""

  if(!role) {
    if(whiteList.includes(to.path)) {
      next()
    }else {
      message.error("用户未登陆")
      next({path:"/"})
    }
  } else if(role && !(to.meta as APPRouteMeta).role.includes(role as RoleType)) {
      switch(role){
        case("admin"):
          next({path:"/Teacher/classManage"})
          break;
        case("teacher"):
          next({path:"/Teacher/classManage"})
          break;
        case("student"):
          next({path:"/"})
          break;
        default:
          break;
      }
    } else {
      next()
    }
})
export default router;
