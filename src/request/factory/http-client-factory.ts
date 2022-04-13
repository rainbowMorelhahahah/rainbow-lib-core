import { HttpClient } from "../impl";
import AxiosCacheInterceptor from "../interceptors/axios-cache";

export default class HttpClientFactory {
  static http: HttpClient;

  public static getInstance() {
    if (!this.http) {
      this.http = new HttpClient()
      this.http.setInterceptors(new AxiosCacheInterceptor())
    }
    return this.http;
  }
  
}