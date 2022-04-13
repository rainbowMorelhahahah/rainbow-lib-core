import axios, { AxiosRequestConfig, Method } from "axios";
import { HttpInterceptor } from "../interface";
import AxiosClient from "../nettool/axios-client";
import RequestInterceptors from "../observe/request-interceptors";

export default class HttpClient {

  private okHttp: AxiosClient;
  private interceptors: RequestInterceptors;

  public constructor() {
    this.okHttp = new AxiosClient();
    this.interceptors = new RequestInterceptors();
    this.interceptors.getInterceptors().subscribe(interceptors => {
      this.okHttp.getOkHttp().interceptors.request.use(config => {
        let result = config;
        for (const interceptor of interceptors) {
          result = Object.assign(result, interceptor.handleHttpRequst(config))
        }
        return result;
      })

      this.okHttp.getOkHttp().interceptors.response.use(
        response => {
          let result = response;
          for (const interceptor of interceptors) {
            let r = interceptor.hanldHttpResponse(response)
            result = Object.assign(result, r)
          }
          return result;
        },
        err => {
          //已经取消的请求，我们需要把message 调到 response resolve里面进行正常的调用
          if (axios.isCancel(err)) {
            return Promise.resolve(err.message);
          }
          return Promise.reject(err);
        }
      )
    })
  }

  setInterceptors(interceptors: HttpInterceptor): void {
    this.interceptors.setInterceptors(interceptors);
  }

  Get<T>(uri: string, query: any, options: AxiosRequestConfig<any>): Promise<T>;
  Get<T>(uri: string, query: any, options?: AxiosRequestConfig<any>): Promise<T>;
  Get<T>(uri: string, query?: any, options?: AxiosRequestConfig<any>): Promise<T>;
  Get<T>(uri: any, query?: any, options?: any): Promise<T> {
    return this.request('GET', uri, query, options);
  }

  Post<T>(uri: string, data: any, options: AxiosRequestConfig<any>): Promise<T>;
  Post<T>(uri: string, data: any, options?: AxiosRequestConfig<any>): Promise<T>;
  Post<T>(uri: string, data?: any, options?: AxiosRequestConfig<any>): Promise<T>;
  Post<T>(uri: any, data?: any, options?: any): Promise<T> {
    return this.request('POST', uri, data, options);
  }

  Put<T>(uri: string, data: any, options: AxiosRequestConfig<any>): Promise<T>;
  Put<T>(uri: string, data: any, options?: AxiosRequestConfig<any>): Promise<T>;
  Put<T>(uri: string, data?: any, options?: AxiosRequestConfig<any>): Promise<T>;
  Put<T>(uri: string, data?: any, options?: any): Promise<T> {
    return this.request('PUT', uri, data, options);
  }
  
  Delete<T>(uri: string, data: any, options: AxiosRequestConfig<any>): Promise<T>;
  Delete<T>(uri: string, data: any, options?: AxiosRequestConfig<any>): Promise<T>;
  Delete<T>(uri: string, data?: any, options?: AxiosRequestConfig<any>): Promise<T>;
  Delete<T>(uri: any, data?: any, options?: any): Promise<T> {
    return this.request('DELETE', uri, data, options);
  }

  private request(mode: Method, uri: string, body: any, options?: AxiosRequestConfig) {

    const requestBody = ['GET', 'DELETE'].indexOf(mode) === 0 ?
      {
        params: body
      }
      :
      {
        data: body
      }

    const prefix = "";

    uri = uri.startsWith(prefix as string) ? uri : prefix + uri;

    return this.okHttp.getOkHttp().request({
      ...requestBody,
      url: uri,
      method: mode,
      timeout: 60000
    }).then(res => {
      return res.data
    }).catch(err => { console.log(err) })
  }
  
}