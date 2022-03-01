import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { GetTimeNowUnxi } from "src/func";
import { IHttpInterceptors } from "..";

export default class AxiosCacheInterceptor implements IHttpInterceptors {

    private cache: Map<string | undefined, any> = new Map<string, any>();

    handleHttpRequst(config: AxiosRequestConfig): AxiosRequestConfig {
        const Token = axios.CancelToken;
        let source = Token.source();
        config.cancelToken = source.token;
        let data = this.cache.get(config.url);
        if (data && GetTimeNowUnxi() - data.expire < 60000) {
            source.cancel(data);
        }
        return config;
    }

    hanldHttpResponse(response: AxiosResponse<any, any>): AxiosResponse {
        let data = {
            expire: GetTimeNowUnxi(),
            data: response.data
        }
        this.cache.set(`${response.config.url}`, data);
        return response;
    }

}