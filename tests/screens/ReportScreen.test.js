import React from 'react';

import { shallow } from 'enzyme';

import ReportScreen from '../../screens/ReportScreen';

const report = {
  key: 1,
  name: 'William'
};

const navigation = { state: { params: report } };

it("renders the report's screen", () => {
  const render = shallow(<ReportScreen {...{ navigation }} />);
  expect(render).toMatchSnapshot();
});
