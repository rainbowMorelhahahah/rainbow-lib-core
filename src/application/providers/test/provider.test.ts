import { BehaviorSubject, Observable } from "rxjs";
import { provider } from ".."
import Provider from "../provider";

interface ITestService {
  name: string
  getName(): Observable<string>
}

class TestService extends Provider implements ITestService {
  public name: string = "rex";
  getName(): Observable<string> {
    return new BehaviorSubject<string>(this.name).asObservable();
  }
}


describe("ArtisanServiceProvider test", () => {
  test("ioc", () => {
    provider().add<ITestService>('ITestService', TestService)

    expect(provider().get<ITestService>('ITestService').name).toBe("rex")

    let service = provider().get<ITestService>('noHereClass')
    console.log(service.getName())
    service.getName().subscribe(name => {
      console.log(name)
    })


  })
})