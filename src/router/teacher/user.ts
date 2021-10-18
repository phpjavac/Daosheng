import { AppRouterRecordRaw } from "../type";

const adminRouter: AppRouterRecordRaw[] = [
  {
    name: "classManage",
    path: "Teacher/classManage",
    component: "classManage",
    meta: {
      title: "班级管理",
      role: ["admin", "teacher"],
    },
  },
];

export default adminRouter;
