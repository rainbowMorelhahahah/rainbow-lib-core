/**
 * http 客户端的默认配置项目
 */
class RequestConfig {

  /**
   * 请求的超时时间
   */
  public timeout: number;

  /**
   * 重复请求的默认超时时间,开启后在这个cache时间内发出的Http 请求将是缓存数据。
   */
  public cacheTimeOut: number;

  constructor(data: any) {
    this.timeout = data.timeout || 60;
    this.cacheTimeOut = data.cacheTimeOut || 0;
  }

}

export default RequestConfig;