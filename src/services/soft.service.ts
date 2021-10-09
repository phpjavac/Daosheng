import { get } from "../lib/http";

export default {
  /**
   * 获取软件配置信息
   */
  softConfig: () => get("./api/softConfig/get"),
};
