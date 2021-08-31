import { MockMethod } from "vite-plugin-mock";
import mock from "mockjs";
export default [
  /**
   * 练习
   * @return { name -> 练习名称  }
   */
  {
    url: "/api/practice/getPractice",
    method: "get",
    response: ({}) => {
      return {
        success: true,
        message: null,
        data: {
          id: "@uid",
          practiceType: "专项练习",
          userId: "@guid",
          name: "@cname",
          createTime: "@datetime",
          courseId: "@guid",
          complete: false,
        },
      };
    },
  },
] as MockMethod[];
