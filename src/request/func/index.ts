import { app } from "src";
import { IHttpClient } from "../interface";

export function request(): IHttpClient {
    return app().getInstance('request');
}