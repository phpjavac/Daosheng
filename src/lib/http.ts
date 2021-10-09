import { message as toast } from "ant-design-vue";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Canceler,
} from "axios";
import { isEmpty } from "lodash";
import { stringify } from "qs";
import environment from "./env";
import { getAccessToken } from "./storage";

/**
 * 取消请求
 */
const { CancelToken } = axios;
const cancels: Canceler[] = [];
const cancelAllRequest = (message?: string) => {
  cancels.forEach((cancel) => cancel(message));
};

// eslint-disable-next-line no-unused-vars
const requests: Array<(token: string) => void> = [];
/**
 * 超时判断
 */
const isTimeoutError = (error: AxiosError) =>
  error.code === "ECONNABORTED" && error.message.includes("timeout");

/**
 * 设置全局参数
 */
axios.defaults.timeout = 300000;
axios.defaults.baseURL = environment.server;
axios.defaults.withCredentials = false;

/**
 * 创建实例
 */
const http = axios.create();

const cancelRequestConfig: AxiosRequestConfig = {
  cancelToken: new CancelToken((cancel) => {
    cancels.push(cancel);
  }),
};

/**
 * Get
 */
const getRequestConfig: AxiosRequestConfig = {
  ...cancelRequestConfig,
};

const get = <R = any, P = any>(
  url: string,
  data?: P,
  config: AxiosRequestConfig = getRequestConfig,
): Promise<R> => {
  config.params = data;
  return http.get(url, config);
};

/**
 * Post
 */
const postRequestConfig: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  transformRequest: (data: any, headers: any) => {
    console.log("transformRequest...");
    console.log(headers);
    console.log(stringify(data));
    return stringify(data);
  },
  ...cancelRequestConfig,
};

const post = <R = any, P = any>(
  url: string,
  data?: P,
  config: AxiosRequestConfig = postRequestConfig,
): Promise<R> => http.post(url, data || {}, config);

/**
 * Post Json
 */
const postJsonRequestConfig: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: (data: any) => JSON.stringify(data),
  ...cancelRequestConfig,
};

const postJson = <R = any, P = any>(
  url: string,
  data?: P,
  config: AxiosRequestConfig = postJsonRequestConfig,
): Promise<R> => http.post(url, data || {}, config);

/**
 * Post FormBody
 */
const postFormRequestConfig: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  ...cancelRequestConfig,
};

const postForm = <R = any, P = any>(
  url: string,
  data?: P,
  config: AxiosRequestConfig = postFormRequestConfig,
): Promise<R> => http.post(url, data || {}, config);

/**
 * Post Multipart
 */
const postMultipartRequestConfig: AxiosRequestConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
  ...cancelRequestConfig,
};

const postMultipart = <R = any, P = any>(
  url: string,
  data?: P,
  config: AxiosRequestConfig = postMultipartRequestConfig,
): Promise<R> => http.post(url, data || {}, config);

/**
 * Authorization
 */
const setupAuthorizationInterceptor = () => {
  http.interceptors.request.use(async (config: AxiosRequestConfig) => {
    const token = getAccessToken();
    console.log(`token - ${token}`);
    if (isEmpty(token)) {
      config.headers.common.token = null;
    } else {
      config.headers.common.token = `Bearer ${token}`;
    }
    console.log(`Authorization ${config.headers.common.Authorization}`);
    return config;
  });
};

/**
 * Response
 */
const setupResponseInterceptor = () => {
  http.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.status === 200 && !response.data.success) {
        toast.info(response.data.message);
      }
      return response.data;
    },
    (error: AxiosError) => {
      if (error.response) {
        const response = error.response as AxiosResponse;
        switch (response.status) {
          case 404:
            toast.info("接口不存在");
            break;
          case 401:
            toast.info("登陆信息过期");
            break;
          case 503:
            toast.info("请稍后再试");
            break;
          default:
            break;
        }
      } else if (isTimeoutError(error)) {
        toast.info("网络连接超时");
      } else {
        toast.info("网络好像出了点问题,请稍后再试");
      }
      return Promise.reject(error);
    },
  );
};

/**
 * 默认设置
 */
const setupHttp = () => {
  setupAuthorizationInterceptor();
  setupResponseInterceptor();
};

export default http;

export { axios, isTimeoutError, get, post, postForm, postJson, postMultipart };

export {
  getRequestConfig,
  postRequestConfig,
  postFormRequestConfig,
  postJsonRequestConfig,
  postMultipartRequestConfig,
};

export { setupHttp, setupAuthorizationInterceptor, setupResponseInterceptor };

export { cancelAllRequest, cancels, CancelToken };
