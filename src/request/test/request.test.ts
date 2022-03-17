import { app } from "src/application"
import { config } from "src/application/config"
import { request } from ".."

describe("test request", () => {
  config()
  app()
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

  test("request config test", async () => {
    const TConfig = {
      request: {
        timeout: 7000
      }
    };
    app().setAppConfig(TConfig);
    const okHttp = request()
    let data1 = await okHttp.Get("https://tenapi.cn/yiyan/?format=text")
    let data2 = await okHttp.Get("https://tenapi.cn/yiyan/?format=text")
    expect(data1).toBe(data2);
  })
})