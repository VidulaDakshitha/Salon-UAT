import React from 'react';
import ReactDOM from 'react-dom';
import Staff from './Staff';
import { mount } from 'enzyme'

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Staff />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('toggle click without crashing', () => {
    const wrapper = mount(<Staff />);
    for (let pane=0; pane<4; pane++) {
      for( let tabId=1; tabId<4; tabId++) {
        let Tab = wrapper.find('.nav-tabs .nav-item .nav-link').at((3*pane)+tabId-1);
        Tab.simulate('click');
        expect(wrapper.state().activeTab[pane]).toEqual((tabId).toString());
      }
    }
    wrapper.unmount()
  });