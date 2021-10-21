import { AppRouterRecordRaw } from "../type";

const studentRouter: AppRouterRecordRaw[] = [
  {
    name: "/studentmanage",
    path: "classManage",
    meta: {
      title: "班级管理",
      role: ["student"],
    },
  },
];

export default studentRouter;
