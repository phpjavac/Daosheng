import { message, Modal } from "ant-design-vue";
import axios from "axios";
import { Request } from "zcomposition";

Request.setOption({
  baseURL: " http://mock.aiisx.com/mock/613aecc79943494ddfa40ef4/Daosheng",
});
const { CancelToken } = axios;
const source = CancelToken.source();
Request.setResponse(
  (response) => {
    // 对响应数据做点什么
    response.config.cancelToken = source.token;
    if (response.data.success) {
      return response;
    }
    if (response.data.success === undefined) {
      // 修复部分接口不符合返回格式规范，导致无法获取response
      return response;
    }

    if (response.data.tokenValidateError) {
      source.cancel(response.data.message);
      Modal.error({
        // title: "错误",
        content: response.data.message,
        onOk() {
          sessionStorage.clear();
          window.location.href = "/";
        },
      });
    } else if (!response.data.success) {
      // 提示一下 接口的抛错信息
      message.error(response.data.message);
    }
    return Promise.reject(response.data.message);
  },
  (error) => {
    message.error(error.message);
    return Promise.reject(error);
  },
);
