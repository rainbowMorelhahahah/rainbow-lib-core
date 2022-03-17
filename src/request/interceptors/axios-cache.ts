import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { GetTimeNowUnxi } from "src/func";
import { IHttpInterceptors } from "..";
import { config as AppConfig } from 'src/application/config';
import MD5 from 'crypto-js/md5';

export default class AxiosCacheInterceptor implements IHttpInterceptors {

  private cache: Map<string | undefined, any> = new Map<string, any>();

  private capacity: number = 20;

  handleHttpRequst(config: AxiosRequestConfig): AxiosRequestConfig {
    //只对GET请求进行缓存
    if (config.method !== 'GET'.toLocaleLowerCase()) { return config }

    const Token = axios.CancelToken;
    let source = Token.source();
    config.cancelToken = source.token;
    const cahceKey = `${config.url}${JSON.stringify(config.params)}`;
    let data = this.cache.get(MD5(cahceKey).toString());

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
      const cahceKey = `${response.config.url}${JSON.stringify(response.config.params)}`;
      if (this.cache.size >= this.capacity) {
        // 缓存超过最大值，则移除最近没有使用的
        this.cache.delete(this.cache.keys().next().value)
      }
      this.cache.set(MD5(cahceKey).toString(), data);
    }
    return response;
  }

}