import Configuration from "../configuration";

export default class ConfigurationFatory {
  static instance: Configuration;

  static getInstance() {
    if (!this.instance) {
      this.instance = new Configuration();
    }
    return this.instance;
  }

}