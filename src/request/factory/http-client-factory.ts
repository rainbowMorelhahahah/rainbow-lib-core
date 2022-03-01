import { HttpClient } from "../impl";

export default class HttpClientFactory {
    public getInstance() {
        const okHttp = new HttpClient()
    }
}