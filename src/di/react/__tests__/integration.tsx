
import { mount, configure } from 'enzyme';
import { Fragment } from 'react';
import { di } from '../consumer';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { DiProvider, withDi } from '../provider';
import { injectable } from '../utils';

configure({ adapter: new Adapter() })

const Wrapper = ({ children }: any) => children;
const Text = () => 'original';

const Label = () => {
  const [_Wrapper, _Text] = di([Wrapper, Text], Label)
  return (
    <_Wrapper>
      <_Text />
    </_Wrapper>
  )
}

const Input = () => {
  const [_Text] = di([Text], Input);
  
  return (
    <_Text />
  )
}

const TextDi = injectable(Text, () => 'replacement');
const WrapperDi = injectable(Wrapper, ({ children }: any) => children);

describe('Integration', () => {
  it('should return real dependencies if provider less', () => {
    const wrapper = mount(
      <Fragment>
        <Label />
      </Fragment>
    )
    expect(wrapper.debug()).toMatchSnapshot()
  })

  it('should override all dependencies of same type', () => {
    const wrapper = mount(
      <DiProvider use={[TextDi]}>
        <Label />
      </DiProvider>
    )

    expect(wrapper.debug()).toMatchSnapshot()
  })

  it('should allow override composition', () => {
    const wrapper = mount(
      <DiProvider use={[WrapperDi]}>
        <DiProvider use={[TextDi]}>
          <Label />
        </DiProvider>
      </DiProvider>
    )
    expect(wrapper.debug()).toMatchSnapshot();
  })

  it('should only override dependencies of specified target', () => {
    const wrapper = mount(
      <DiProvider use={[WrapperDi]}>
        <DiProvider target={Label} use={[TextDi]}>
          <Label />
        </DiProvider>
      </DiProvider>
    );

    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should get closest dependency if multiple providers using same type', () => {
    const TextDi2 = injectable(Text, () => 'closest injectable');
    const WrappedInput = withDi(Input, [TextDi2]);
    const wrapper = mount(
      <DiProvider use={[TextDi]}>
        <Label />
        <WrappedInput />
      </DiProvider>
    );

    expect(wrapper.debug()).toMatchSnapshot();
  });

})