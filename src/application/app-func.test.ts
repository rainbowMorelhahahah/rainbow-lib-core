import { app, Application } from "."

describe("application func hooks", () => {
    test("get app", () => {
        expect(app()).toBe(Application.getInstance())
    })
})