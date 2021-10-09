import { post } from "../lib/http";

export default {
  /**
   * 用户登录
   */
  auth: (credentials: any) => post("./api/user/login", credentials),
};
