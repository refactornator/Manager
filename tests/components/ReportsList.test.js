import React from 'react';

import { shallow } from 'enzyme';

import Realm from '../mocks/realmMock';
import ReportsList from '../../components/ReportsList';
import ReportsListItem from '../../components/ReportsListItem';
import schema from '../../schema';

const realm = new Realm(schema);
const data = [{ key: 1, name: 'William' }];
realm.prepareData('Report', data);

const props = {
  navigation: { navigate: () => {} },
  screenProps: { realm }
};

it('renders a list of reports', () => {
  const render = shallow(<ReportsList {...props} />);
  expect(render).toMatchSnapshot();
});

xit('has a renderItem function for each item', () => {
  const render = shallow(<ReportsList {...props} />);

  const index = 0;
  const onAddReport = render.instance().forceUpdate.bind(render.instance());
  const expected = render.instance().renderItem(data[index], index);
  const received = (
    <ReportsListItem
      key={index}
      realm={realm}
      data={data[index]}
      navigation={props.navigation}
      onAddReport={onAddReport}
    />
  );

  expect(expected).toBe(received);
});
