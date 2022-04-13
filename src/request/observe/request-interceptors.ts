import { BehaviorSubject } from 'rxjs';
import { HttpInterceptor } from '../interface';

export default class RequestInterceptors {
  /**
   * 监听拦截器
   */
  private interceptors$: BehaviorSubject<HttpInterceptor[]> = new BehaviorSubject<HttpInterceptor[]>([]);

  public setInterceptors(interceptors: HttpInterceptor) {
    this.interceptors$.next([
      ...this.interceptors$.value,
      interceptors
    ])
  }

  public getInterceptors() {
    return this.interceptors$.asObservable();
  }

}