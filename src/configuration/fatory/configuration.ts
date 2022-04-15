import Configuration from "../configuration";

/**
 * 系统配置类的工厂模式 单列
 */
export default class ConfigurationFatory {
  static instance: Configuration;

  static getInstance() {
    if (!this.instance) {
      this.instance = new Configuration();
    }
    return this.instance;
  }

}