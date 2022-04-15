import { ConfigurationFatory } from "@/configuration";
import { ApplicationProps } from "@/di/react/interface";
import React from "react";
import { Application as ApplicationDOM } from '../di'

/**
 * App 启动类
 */
class Application {

  static config = ConfigurationFatory.getInstance();

  static fns: Function[] = [];

  /**
   * 配置项的设置
   * @param key 
   * @param value
   */
  static setConfig(key: string, value: any) {
    this.config.setConfig(key, value);
  }

  /**
   * 用来做应用的初开始操作
   * @param fn 
   */
  static use(fn: Function) {
    this.fns.push(fn);
  }

  static run(children: React.ReactNode) {

    /**
     * 运行前做的事情
     */
    for (const fn of this.fns) {
      fn(this)
    }

    return (
      <ApplicationDOM>
        {children}
      </ApplicationDOM>
    )
  }

}


export default Application;