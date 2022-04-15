import { HttpClientConfig } from "./interface/http-client";

/**
 * 系统配置类管理
 */
export default class Configuration {

  private config: Map<string, any>;

  constructor() {
    this.config = new Map<string, any>();
  }

  getConfig(key: string) {
    return this.config.get(key);
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
