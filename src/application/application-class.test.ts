import { app } from "./app-func"
import Application from "./application-class"

describe("Application", () => {
  app()
  test("new application", () => {
    expect(Application.getInstance()).toBe(Application.getInstance())
  })

  test("set instance", () => {
    expect(Application.getInstance().setInstance("app", Application.getInstance()))
  })

  test("get instance", () => {
    const time = new Date()
    Application.getInstance().setInstance("time", time)
    expect(Application.getInstance().getInstance("time")).toBe(time)
  })
})