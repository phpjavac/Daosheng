import { get, post } from "../lib/http";

export default {
  /**
   * 用户登录
   */
  auth: (credentials: any) => post("/pmcp/api/user/login", credentials),
  /**
   * 获取用户信息
   */
  authInfo: (userCodeForm: any) =>
    post("/pmcp/api/user/getByCode", userCodeForm),

  /**
   * 获取班级列表
   */
  getClassList: (queryForm: any) =>
    post("/pmcp/api/userInfo/listClass", queryForm),

  /**
   * 登出
   */
  logOut: () => get("/pmcp/api/user/logout"),
};
