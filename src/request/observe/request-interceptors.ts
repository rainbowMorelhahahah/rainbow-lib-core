import { BehaviorSubject } from 'rxjs';
import { IHttpInterceptors } from '..';

export default class RequestInterceptors {
    /**
     * 监听拦截器
     */
    private interceptors$: BehaviorSubject<IHttpInterceptors[]> = new BehaviorSubject<IHttpInterceptors[]>([]);

    public setInterceptors(interceptors: IHttpInterceptors) {
        this.interceptors$.next([
            ...this.interceptors$.value,
            interceptors
        ])
    }

    public getInterceptors() {
        return this.interceptors$.asObservable();
    }

}