import { HttpClientConfig } from "./interface/http-client";

export default class Configuration {

  private config: Map<string, any>;

  constructor() {
    this.config = new Map<string, any>();
  }

  setConfig(key: string, value: any) {
    this.config.set(key, value);
  }

  setHttpClient(value: HttpClientConfig) {
    this.setConfig("httpClien", {
      ...this.getHttpClient(),
      ...value
    });
  }

  getHttpClient(): HttpClientConfig {
    return this.config.get("httClient");
  }

}
