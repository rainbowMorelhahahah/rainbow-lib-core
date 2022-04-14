
export default class Configuration {

  private config: Map<string, any>;

  constructor() {
    this.config = new Map<string, any>();
  }

  setConfig(key: string, value: any) {
    this.config.set(key, value);
  }

  setHttpClient(value: any) {
    this.setConfig("httpClien", value);
  }

  getHttpClient() {
    return this.config.get("httClient");
  }

}
