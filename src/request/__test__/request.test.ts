import { ConfigurationFatory } from "@/configuration"
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
    expect(data1).not.toBe(data2);
  })


  test("test gloab config props", async () => {

    ConfigurationFatory.getInstance().setHttpClient({
      cacheTimeout: 60000
    })

    const okHttp = request()
    let data1 = await okHttp.Get("https://tenapi.cn/yiyan", {
      "format": "text"
    })
    let data2 = await okHttp.Get("https://tenapi.cn/yiyan", {
      "format": "text"
    })
    expect(data1).not.toBe(data2);
  })

})