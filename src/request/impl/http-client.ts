import axios, { AxiosRequestConfig, Method } from "axios";
import { config } from "src/application/config";
import { CustomResponse, IHttpClient, IHttpInterceptors } from "../interface";
import AxiosClient from "../nettool/axios-client";
import RequestInterceptors from "../observe/request-interceptors";

export default class HttpClient implements IHttpClient {

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

  setInterceptors(interceptors: IHttpInterceptors): void {
    this.interceptors.setInterceptors(interceptors);
  }

  Get(uri: string, query: any, options: AxiosRequestConfig<any>): Promise<CustomResponse>;
  Get(uri: string, query: any, options?: AxiosRequestConfig<any>): Promise<CustomResponse>;
  Get(uri: string, query?: any, options?: AxiosRequestConfig<any>): Promise<CustomResponse>;
  Get(uri: any, query?: any, options?: any): Promise<CustomResponse> {
    return this.request('GET', uri, query, options);
  }
  Post(uri: string, data: any, options: AxiosRequestConfig<any>): Promise<CustomResponse>;
  Post(uri: string, data: any, options?: AxiosRequestConfig<any>): Promise<CustomResponse>;
  Post(uri: string, data?: any, options?: AxiosRequestConfig<any>): Promise<CustomResponse>;
  Post(uri: any, data?: any, options?: any): Promise<CustomResponse> {
    return this.request('POST', uri, data, options);
  }
  Put(uri: string, data: any, options: AxiosRequestConfig<any>): Promise<CustomResponse>;
  Put(uri: string, data: any, options?: AxiosRequestConfig<any>): Promise<CustomResponse>;
  Put(uri: string, data?: any, options?: AxiosRequestConfig<any>): Promise<CustomResponse>;
  Put(uri: string, data?: any, options?: any): Promise<CustomResponse> {
    return this.request('PUT', uri, data, options);
  }
  Delete(uri: string, data: any, options: AxiosRequestConfig<any>): Promise<CustomResponse>;
  Delete(uri: string, data: any, options?: AxiosRequestConfig<any>): Promise<CustomResponse>;
  Delete(uri: string, data?: any, options?: AxiosRequestConfig<any>): Promise<CustomResponse>;
  Delete(uri: any, data?: any, options?: any): Promise<CustomResponse> {
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

    const prefix = config()?.request?.prefix;

    uri = uri.startsWith(prefix as string) ? uri : prefix + uri;

    return this.okHttp.getOkHttp().request({
      ...requestBody,
      url: uri,
      method: mode,
      timeout: config()?.request?.timeout || 60000
    }).then(res => {
      return res.data
    }).catch(err => { console.log(err) })
  }
}