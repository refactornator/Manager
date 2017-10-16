import {
  AlertIOS,
  Dimensions,
  LayoutAnimation,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { Component } from 'react';
import styled from 'styled-components/native';
import uuid from 'uuid';

const { width: windowWidth } = Dimensions.get('window');

export default class ReportsListItem extends Component {
  addReport = name => {
    const { realm } = this.props;

    try {
      realm.write(() => {
        const newReport = realm.create('Report', {
          key: uuid.v1(),
          name
        });
      });
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    } catch (e) {
      console.log('Error on creation', e);
    }
  };

  render() {
    const { navigation, realm, data } = this.props;

    if (typeof data === 'object') {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('Report', data)}>
          <Item>
            <Icon name="user" size={44} color="#366ddc" />
            <Name>{data.name}</Name>
          </Item>
        </TouchableOpacity>
      );
    } else if (data === 'add') {
      return (
        <TouchableOpacity
          onPress={() => {
            AlertIOS.prompt('Enter Name', null, this.addReport, 'plain-text');
          }}
        >
          <Item>
            <Icon name="plus-circle" size={44} color="#366ddc" />
            <Name>Add Report</Name>
          </Item>
        </TouchableOpacity>
      );
    }
  }
}

const Item = styled.View`
  flex: 1;
  width: ${windowWidth / 2}px;
  height: ${windowWidth / 2}px;
  align-items: center;
  justify-content: center;
`;

const Name = styled.Text`
  color: #366ddc;
  margin-top: 6px;
  font-size: 20px;
`;
