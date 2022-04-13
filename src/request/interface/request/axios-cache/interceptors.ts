import { AxiosRequestConfig, AxiosResponse } from "axios"

export interface HttpInterceptor {

  handleHttpRequst(config: AxiosRequestConfig): void

  hanldHttpResponse(config: AxiosResponse): void

}