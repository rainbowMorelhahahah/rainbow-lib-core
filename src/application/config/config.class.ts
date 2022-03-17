import RequestConfig from "./request.class";

class AppConfig {
  private static _instance: AppConfig;

  public static getInstance() {
    if (!this._instance) {
      this._instance = new AppConfig()
    }
    return this._instance;
  }

  private _request: RequestConfig | undefined;

  public setConfig(data: any) {
    this._request = new RequestConfig(data.request);
  }

  public get request(): RequestConfig | undefined {
    return this._request;
  }

  public set request(data: any) {
    this._request = new RequestConfig(data);
  }

}

export default AppConfig;