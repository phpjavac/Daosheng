import { AppRouterRecordRaw } from "../type";

const adminRouter: AppRouterRecordRaw[] = [
  {
    path: "/Teacher/classManage",
    name: "classManage",
    component: () => import("../../views/teacher/classManage/classManage.vue"),
    meta: {
      title: "班级管理",
      role: ["admin", "teacher"],
    },
  },
];

export default adminRouter;
