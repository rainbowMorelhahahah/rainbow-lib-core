import axios, { AxiosInstance } from "axios";
import Application from "src/application/application-class";
import { AppConfig, config, RequestConfig } from "src/application/config";


export default class AxiosClient {

  private okHttp: AxiosInstance;
  private requsetConfig: RequestConfig | undefined;


  public constructor() {
    this.requsetConfig = AppConfig.getInstance()?.request;
    this.okHttp = axios.create({
      responseType: 'json'
    })
  }

  public getOkHttp(): AxiosInstance {
    return this.okHttp;
  }

}