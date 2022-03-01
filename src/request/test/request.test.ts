import HttpClientFactory from "../factory/http-client-factory"

describe("test request", () => {
    test("interceptors request", () => {
        const okHttp = HttpClientFactory.getInstance()
        console.log(okHttp)
    })
})