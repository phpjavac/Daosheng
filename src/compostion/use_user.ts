import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { UserService } from "../services/index";
import { components } from "../types/petstore";

const UseUser = () => {
  const router = useRouter();
  /** 用户登录 */
  const login = async (credentials: components["schemas"]["login"]) => {
    const res = await UserService.auth(credentials);
    if (res.success) {
      message.success("登录成功");
      router.replace("/home");
    }
    return res;
  };
  return {
    login,
  };
};
export default UseUser;
