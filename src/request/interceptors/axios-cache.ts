import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { GetTimeNowUnxi } from "src/func";
import { IHttpInterceptors } from "..";
import { config as AppConfig } from 'src/application/config'

export default class AxiosCacheInterceptor implements IHttpInterceptors {

  private cache: Map<string | undefined, any> = new Map<string, any>();

  handleHttpRequst(config: AxiosRequestConfig): AxiosRequestConfig {
    const Token = axios.CancelToken;
    let source = Token.source();
    config.cancelToken = source.token;
    let data = this.cache.get(config.url);
    const CACHETIMEOUT = AppConfig()?.request?.cacheTimeOut || 60000;
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
      this.cache.set(`${response.config.url}`, data);
    }
    return response;
  }

}