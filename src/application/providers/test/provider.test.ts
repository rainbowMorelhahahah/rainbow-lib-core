import { provider } from ".."

class TestService {
    public name: string = "rex";
}

describe("ArtisanServiceProvider test", () => {
    test("ioc", () => {
        provider().add(TestService)
        
        expect(provider().get(TestService).name).toBe("rex")
    })
})