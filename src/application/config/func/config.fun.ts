import AppConfig from "../config.class";

export function config(): AppConfig | undefined {
  return AppConfig.getInstance();
}