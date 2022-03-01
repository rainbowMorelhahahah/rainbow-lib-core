import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface IHttpInterceptors {

    handleHttpRequst(config: AxiosRequestConfig): void

    hanldHttpResponse(config: AxiosResponse): void

    
}