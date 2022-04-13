import { AxiosRequestConfig } from "axios";
import { HttpClientFactory } from "../factory";
import { HttpClient } from "../impl";

export function request(): HttpClient {
  return HttpClientFactory.getInstance();
}

/**
 * 对 request 调用的封装
 * @param uri url 地址
 * @param options 通用的请求参数
 * 必须存在的参数
 * method 请求方式 GET POST DELETE PUT
 * params 和服务端进行通信的参数
 * 其他 AxiosRequestConfig 的配置项目
 * @returns 
 */
export function requestFun<T>(uri: string, options: AxiosRequestConfig): Promise<T> {
  const { params, method } = options;
  delete options.params
  delete options.method
  switch (method) {
    case "GET":
      return request().Get(uri, params, options) as unknown as Promise<T>
    case "POST":
      return request().Post(uri, params, options) as unknown as Promise<T>
    case "DELETE":
      return request().Delete(uri, params, options) as unknown as Promise<T>
    default:
      return request().Put(uri, params, options) as unknown as Promise<T>
  }
}