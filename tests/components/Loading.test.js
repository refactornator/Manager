import React from 'react';
import renderer from 'react-test-renderer';

import Loading from '../../components/Loading';

it('renders a simple loading message', () => {
  const rendered = renderer.create(<Loading />).toJSON();
  expect(rendered).toMatchSnapshot();
});
