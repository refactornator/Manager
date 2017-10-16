import React from 'react';

import { shallow } from 'enzyme';
import sinon from 'sinon';

import Realm from '../mocks/realmMock';
import ReportsListItem from '../../components/ReportsListItem';
import schema from '../../schema';

const realm = new Realm(schema);
const data = [{ key: 1, name: 'William' }];
realm.prepareData('Report', data);

const navigation = { navigate: () => {} };

describe('report list item', () => {
  let render;
  beforeEach(() => {
    render = shallow(
      <ReportsListItem {...{ navigation, realm, data: data[0] }} />
    );
  });

  it('renders', () => {
    expect(render).toMatchSnapshot();
  });

  describe('when pressed', () => {
    it("navigates to the report's screen", () => {
      navigation.navigate = sinon.spy();

      const item = render.find('TouchableOpacity');
      expect(item.length).toBe(1);

      item.simulate('press');
      expect(navigation.navigate.calledWith('Report', data[0])).toBe(true);

      navigation.navigate = () => {};
    });
  });
});

describe('add report list item', () => {
  let render;
  beforeEach(() => {
    render = shallow(
      <ReportsListItem {...{ navigation, realm, data: 'add' }} />
    );
  });

  it('renders', () => {
    expect(render).toMatchSnapshot();
  });

  describe('when pressed', () => {
    it('opens the alert dialog', () => {
      expect(render.find('TouchableOpacity').length).toBe(1);
    });
  });
});
