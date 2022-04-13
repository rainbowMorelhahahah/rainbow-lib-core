import { GetTimeNowUnxi } from "@/func";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpInterceptor } from "../interface";

export default class AxiosCacheInterceptor implements HttpInterceptor {

  private cache: Map<string | undefined, any> = new Map<string, any>();

  private capacity: number = 20;

  handleHttpRequst(config: AxiosRequestConfig): AxiosRequestConfig {
    //只对GET请求进行缓存
    if (config.method !== 'GET'.toLocaleLowerCase()) { return config }

    const Token = axios.CancelToken;
    let source = Token.source();
    config.cancelToken = source.token;
    const cahceKey = `${config.url}${JSON.stringify(config.params)}`;
    let data = this.cache.get(cahceKey);

    const CACHETIMEOUT = 60000;
    if (data && GetTimeNowUnxi() - data.expire < Number(CACHETIMEOUT)) {
      source.cancel(data);
    }
    return config;
  }

  hanldHttpResponse(response: AxiosResponse<any, any>): AxiosResponse {
    let data = {
      expire: GetTimeNowUnxi(),
      data: response.data
    }
    if (response.config !== undefined) {
      //如果是缓存不做处理
      const cahceKey = `${response.config.url}${JSON.stringify(response.config.params)}`;
      if (this.cache.size >= this.capacity) {
        // 缓存超过最大值，则移除最近没有使用的
        this.cache.delete(this.cache.keys().next().value)
      }
      this.cache.set(cahceKey, data);
    }
    return response;
  }

}