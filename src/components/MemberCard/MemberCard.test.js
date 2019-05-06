import React from 'react';
import { shallow, mount } from 'enzyme';
// import { MemoryRouter } from 'react-router-dom';
import { Button } from './Button';

// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faTrashAlt, faPencilAlt, faSyncAlt, faFutbol, faTrophy, faCoins } from '@fortawesome/free-solid-svg-icons';
// library.add(faTrashAlt, faPencilAlt, faSyncAlt, faFutbol, faTrophy, faCoins);

describe('// TODO: Add tests!', () => {
  it('works as intented', () => {
		const x = 1;
		
    expect(x).toEqual(1);
  });

  // it('render the correct amount of tab elements', () => {
  //   const props = {
  //     activeTab: '/account',
  //     tabs: [
  //       { name: 'My Clubs', url: '/clubs', icon: 'coins' },
  //       { name: 'My Tournaments', url: '/tournaments', icon: 'futbol' },
  //       { name: 'My Account', url: '/account', icon: 'pencil-alt' },
  //     ],
  //   };

  //   const wrapper = shallow(<Menubar {...props} />);
  //   const tabs = wrapper.find('.tab');

  //   expect(tabs.length).toBe(props.tabs.length);
  // });

  // it('call the correct route when a tab is clicked', () => {
  //   const props = {
  //     activeTab: '/account',
  //     tabs: [
  //       { name: 'My Clubs', url: '/clubs', icon: 'coins' },
  //       { name: 'My Tournaments', url: '/tournaments', icon: 'futbol' },
  //       { name: 'My Account', url: '/account', icon: 'pencil-alt' },
  //     ],
  //     history: { push: jest.fn() },
  //   };

  //   const wrapper = mount(
  //     <MemoryRouter>
  //       <Menubar {...props} />
  //     </MemoryRouter>
  //   );
  //   const tab = wrapper.find('.tab').at(1);

  //   tab.simulate('click');

  //   expect(props.history.push.mock.calls[0]).toEqual(['/clubs']);
  // });
});
