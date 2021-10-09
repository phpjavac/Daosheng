import { isEqual } from "lodash";

export interface Environment {
  /**
   * 环境名称
   */
  mode: string;
  /**
   * 是否是生产模式
   */
  production: boolean;
  /**
   * 应用名称
   */
  title: string;
  /**
   * 服务器地址
   */
  server: string;
  /**
   * 服务器地址
   */
  webSocketServer: string;
  /**
   * Mock
   */
  mock: {
    enabled: boolean;
  };
}

/**
 * 环境配置
 */
const env: Environment = {
  mode: import.meta.env.MODE ?? "development",
  production: isEqual(import.meta.env.NODE_HOME, "production"),
  title: (import.meta.env.VITE_APP_TITLE as string) ?? "Application",
  server: (import.meta.env.VITE_APP_SERVER as string) ?? "",
  webSocketServer: (import.meta.env.VITE_APP_WEB_SOCKET_SERVER as string) ?? "",
  mock: {
    enabled: isEqual(import.meta.env.VITE_APP_MOCK_ENABLED, "true"),
  },
};

export default env;
