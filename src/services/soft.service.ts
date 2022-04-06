import { get } from "../lib/http";
import { components } from "../types/petstore";

export default {
  /**
   * 获取软件配置信息
   */
  softConfig: () =>
    get<components["schemas"]["软件信息"]>("./api/softConfig/get"),
};
