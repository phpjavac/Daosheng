import { post } from "../lib/http";
import { components } from "../types/petstore";

export default {
  /**
   * 用户登录
   */
  auth: (credentials: components["schemas"]["login"]) =>
    post<components["schemas"]["登录返回值"]>("./api/user/login", credentials),
};
