import axios, { AxiosInstance } from "axios";

export default class AxiosClient {

    private okHttp: AxiosInstance;

    public constructor() {
        this.okHttp = axios.create({
            timeout: 60000,
            responseType: 'json'
        })
    }

    public getOkHttp(): AxiosInstance {
        return this.okHttp;
    }

}