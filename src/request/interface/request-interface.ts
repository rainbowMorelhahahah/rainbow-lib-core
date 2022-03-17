import { AxiosRequestConfig } from "axios";
import { IHttpInterceptors } from ".";

export interface CustomResponse {
    readonly code: number;
    data: any;
}
export interface IHttpClient {

    Get(uri: string, query: any, options: AxiosRequestConfig): Promise<CustomResponse>
    Get(uri: string, query: any, options?: AxiosRequestConfig): Promise<CustomResponse>
    Get(uri: string, query?: any, options?: AxiosRequestConfig): Promise<CustomResponse>

    Post(uri: string, data: any, options: AxiosRequestConfig): Promise<CustomResponse>
    Post(uri: string, data: any, options?: AxiosRequestConfig): Promise<CustomResponse>
    Post(uri: string, data?: any, options?: AxiosRequestConfig): Promise<CustomResponse>

    Put(uri: string, data: any, options: AxiosRequestConfig): Promise<CustomResponse>
    Put(uri: string, data: any, options?: AxiosRequestConfig): Promise<CustomResponse>
    Put(uri: string, data?: any, options?: AxiosRequestConfig): Promise<CustomResponse>

    Delete(uri: string, data: any, options: AxiosRequestConfig): Promise<CustomResponse>
    Delete(uri: string, data: any, options?: AxiosRequestConfig): Promise<CustomResponse>
    Delete(uri: string, data?: any, options?: AxiosRequestConfig): Promise<CustomResponse>
    
    setInterceptors(interceptors: IHttpInterceptors): void

}