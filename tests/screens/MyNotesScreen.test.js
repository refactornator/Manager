import React from 'react';

import { shallow } from 'enzyme';

import MyNotesScreen from '../../screens/MyNotesScreen';

it("renders the manager's notes screen", () => {
  const render = shallow(<MyNotesScreen />);
  expect(render).toMatchSnapshot();
});
