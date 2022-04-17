import 'reflect-metadata';
import { mount, configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Application } from "../utils";
import { injectable } from 'inversify';
import { container } from '@/di/container';
import { useInject } from '@/hooks/useInject';

configure({ adapter: new Adapter() })

interface PrivateTest {
  send: () => string | undefined
  setValue: (value: string) => void
}

@injectable()
class SendHello implements PrivateTest {

  private value: string | undefined;

  send() {
    return this.value || 'hello'
  }

  setValue(value: string) {
    this.value = value
  }

}

container.bind<PrivateTest>('sendHello').to(SendHello)

const App = () => {

  const [sendHello] = useInject<PrivateTest>('sendHello')

  return (
    <>
      {sendHello?.send()}
    </>
  );
}

const AppModify = () => {

  const [sendHello] = useInject<PrivateTest>('sendHello')
  sendHello?.setValue("rex")

  return (
    <>
      {sendHello?.send()}
    </>
  );
}

describe("test the application", () => {
  it("it application DiProvider", () => {
    const wrapper = mount(
      <Application>
        <App />
      </Application>
    )

    expect(wrapper.text()).toBe("hello")
  })

  it("it service Modify the properties", () => {
    const wrapper = mount(
      <Application>
        <AppModify />
      </Application>
    )

    expect(wrapper.text()).toBe("rex")
  })

})