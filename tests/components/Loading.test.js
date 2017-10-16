import React from 'react';

import { shallow } from 'enzyme';

import Loading from '../../components/Loading';

it('renders a simple loading message', () => {
  const render = shallow(<Loading />);
  expect(render).toMatchSnapshot();
});
