import { ICache } from "..";
import jsCookie from 'js-cookie';

export default class CookieImpl<T> implements ICache<T> {

    getValue(key: string): T {
        let result: any;
        result = jsCookie.get(key);
        return result as T;
    }

    setValue(key: string, value: string | object): boolean {
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        const result = jsCookie.set(key, value);
        return result ? true : false
    }

    remove(key: string): void {
        jsCookie.remove(key);
    }
}