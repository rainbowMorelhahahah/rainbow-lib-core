import { app } from "src/application/app-func";
import { IHttpClient } from "../interface";

export function request(): IHttpClient {
  return app().getInstance('request');
}