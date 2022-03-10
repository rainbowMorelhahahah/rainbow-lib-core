import { app } from "."
import Application from "./application-class"

describe("application func hooks", () => {
    test("get app", () => {
        expect(app()).toBe(Application.getInstance())
    })
})