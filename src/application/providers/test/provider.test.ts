import { provider } from ".."

interface ITestService {
    name: string
}

class TestService implements ITestService {
    public name: string = "rex";
}


describe("ArtisanServiceProvider test", () => {
    test("ioc", () => {
        provider().add(TestService)

        expect(provider().get(TestService).name).toBe("rex")
    })
})