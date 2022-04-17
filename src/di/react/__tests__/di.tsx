import 'reflect-metadata';
import { mount, configure, shallow } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { injectable } from 'inversify';
import Application from '@/app/app';
import { container } from '@/di/container';
import { renderHook } from '@testing-library/react-hooks';
import { useInject } from '@/hooks/useInject';


configure({ adapter: new Adapter() });


interface TestSerivce {
  name(): string
}

@injectable()
class TestSerivceImpl implements TestSerivce {
  name(): string {
    return 'rex';
  }
}


const App = () => {

  const [service] = useInject<TestSerivceImpl>('testSerivce');

  return (
    <>
      {service?.name}
      <InjectableComp />
    </>
  )
}

const InjectableComp = () => {
  container.bind<TestSerivce>('testSerivce').to(TestSerivceImpl);
  return (
    <></>
  );
}

describe("test the di", () => {

  it("di decp", () => {

    const wrapper = shallow(
      Application.run(<App />)
    )
    /**
     * 模拟App 异步加载 Inject 获取hooks的操作
     */
    setTimeout(() => {
      const { result } = renderHook(() => useInject<TestSerivce>('testService'))
      const [service] = result.current;
      expect(service?.name).toBe('rex')
    }, 100)
  })
})