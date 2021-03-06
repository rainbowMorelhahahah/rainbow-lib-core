/**
 * axios 请求的配置
 * @param timeout 网络请求的过期时间,默认时间为10s 单位毫秒
 * @param cacheTimeout  0的时候不开启缓存时间，单位为毫秒
 */
export interface HttpClientConfig {
  timeout?: number
  cacheTimeout?: number
}