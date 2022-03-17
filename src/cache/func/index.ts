
import { app } from "src";
import { ICache } from "..";

export function cookie<T>(): ICache<T> | undefined {
  if (app !== undefined) {
    return app().getInstance('cookie');
  }
}

export function localStoreage<T>(): ICache<T> | undefined {
  if (app !== undefined) {
    return app().getInstance('localStoreage');
  }
}