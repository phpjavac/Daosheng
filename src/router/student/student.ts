import { AppRouterRecordRaw } from "../type";

const studentRouter: AppRouterRecordRaw[] = [
  {
    name: "classManage",
    path: "Teacher/classManage",
    component: "classManage",
    meta: {
      title: "班级管理",
      role: ["student"],
    },
  },
];

export default studentRouter;
