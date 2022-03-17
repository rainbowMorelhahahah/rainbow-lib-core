import { ICache } from "..";

export default class LocalStorageImpl<T> implements ICache<T>{

  private storage: Storage | undefined;

  constructor() {
    try {
      if (window) {
        this.storage = window.localStorage;
      }
    } catch (err) {

    }
  }

  getValue(key: string): T {
    let result: any = this.storage?.getItem(key);
    try {
      /**
       * 尝试转换 JSON
       */
      if (result) {
        result = JSON.parse(result);
      }
    } catch (e) {

    }
    return result as T;
  }

  setValue(key: string, value: string | object): boolean {
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    try {
      this.storage?.setItem(key, value);
      return true;
    } catch (e) {
      return false;
    }
  }

  remove(key: string): void {
    this.storage?.removeItem(key);
  }


}