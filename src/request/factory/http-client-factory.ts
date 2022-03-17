import { config } from "src/application/config";
import { HttpClient } from "../impl";
import AxiosCacheInterceptor from "../interceptors/axios-cache";

export default class HttpClientFactory {
    public static getInstance() {
        const okHttp = new HttpClient()
        okHttp.setInterceptors(new AxiosCacheInterceptor())
        return okHttp;
    }
}