/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/api/softConfig/get": {
    get: {
      parameters: {};
      responses: {
        /** 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["%E8%BD%AF%E4%BB%B6%E4%BF%A1%E6%81%AF"];
          };
        };
      };
    };
  };
  "/api/user/login": {
    post: {
      parameters: {};
      responses: {
        /** 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["%E7%99%BB%E5%BD%95%E8%BF%94%E5%9B%9E%E5%80%BC"];
          };
        };
      };
      requestBody: {
        content: {
          "application/json": {
            code: string;
            password: string;
          };
        };
      };
    };
  };
}

export interface components {
  schemas: {
    "全局响应结果(试用)": {
      /**
       * 业务代码
       * @description 暂定范围 10000~99999
       */
      code?: number;
      /** 信息 */
      msg?: string | null;
      /** 数据 */
      data?: { [key: string]: unknown } | null;
    };
    登录返回值: {
      success: boolean;
      message?: string;
      data?: {
        code: string;
        name: string;
        role: string;
        token: string;
      };
    };
    热度排名: {
      /** 事件名称 */
      keyword: string;
      /**
       * 热度
       * @description long类型数值
       */
      heat: number;
      /**
       * 事件Id
       * @description 功能主键
       */
      id: string;
    }[];
    软件信息: {
      copyRightValue: string;
      softName: string;
      success: boolean;
      useCas: string;
      message: string | null;
    };
    login: {
      code: string;
      password: string;
    };
  };
}

export interface operations {}

export interface external {}
