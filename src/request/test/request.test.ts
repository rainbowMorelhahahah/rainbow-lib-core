import { request } from ".."

describe("test request", () => {
  test("interceptors request", async () => {
    const okHttp = request()
    let data1 = await okHttp.Get("https://tenapi.cn/yiyan", {
      "format": "text"
    })
    let data2 = await okHttp.Get("https://tenapi.cn/yiyan", {
      "format": "text"
    })
    expect(data1).toBe(data2);
  })
})