import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Application from '../app';
import { ConfigurationFatory } from '@/configuration';
configure({ adapter: new Adapter() })

describe("test Application", () => {

  const App = () => {
    return (
      <>
        this is app run
      </>
    )
  }

  it("this is app run", () => {
    const wrapper = mount(
      Application.run(<App />)
    )

    expect(wrapper.debug()).toMatchSnapshot()
    expect(wrapper.text()).toBe("this is app run")

  })

  it("this is app use fn before", () => {
    Application.use(() => {
      Application.setConfig("test", "Test")
    })

    const wrapper = mount(
      Application.run(<App />)
    )

    expect(wrapper.text()).toBe("this is app run")
    expect(ConfigurationFatory.getInstance().getConfig("test")).toBe("Test")
  })


})