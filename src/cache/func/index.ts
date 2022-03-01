
import { app } from "src";
import { ICache } from "..";

export function cookie<T>(): ICache<T> {
    return app().getInstance('cookie');
}

export function localStoreage<T>(): ICache<T> {
    return app().getInstance('localStoreage');
}