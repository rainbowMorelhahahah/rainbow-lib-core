import { cookie, localStoreage } from "../func"

describe("icache function test", () => {
    test("cookie set value", () => {
        const c_cookie = cookie();
        c_cookie.setValue("name", "molei");
        expect(c_cookie.getValue("name")).toBe("molei");
    })


    describe("localStorage set value", () => {
        const c_localStoreage = localStoreage();
        c_localStoreage.setValue("name", "molei")
        expect(c_localStoreage.getValue("name")).toBe("molei")
    })

})