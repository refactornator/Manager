import {
  AlertIOS,
  Dimensions,
  LayoutAnimation,
  TouchableOpacity
} from 'react-native';
import Grid from 'react-native-grid-component';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { Component } from 'react';
import realm from 'realm';
import styled from 'styled-components/native';
import uuid from 'uuid';

const { width: windowWidth } = Dimensions.get('window');

export default class ReportsList extends Component {
  addReport = name => {
    const { realm } = this.props.screenProps;

    try {
      realm.write(() => {
        const newReport = realm.create('Report', {
          key: uuid.v1(),
          name
        });
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.forceUpdate();
      });
    } catch (e) {
      console.log('Error on creation', e);
    }
  };

  renderItem = (data, i) => {
    const { navigation } = this.props;

    if (typeof data === 'object') {
      return (
        <TouchableOpacity
          key={i}
          onPress={() => navigation.navigate('Report', data)}
        >
          <Item>
            <Icon name="user" size={44} color="#366ddc" />
            <Name>{data.name}</Name>
          </Item>
        </TouchableOpacity>
      );
    } else if (data === 'add') {
      return (
        <TouchableOpacity
          key={i}
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
  };

  render() {
    const { realm } = this.props.screenProps;
    const reports = realm.objects('Report').sorted('name');
    const data = [...reports, 'add'];

    return (
      <Container>
        <Grid
          style={{ flex: 1 }}
          renderItem={this.renderItem}
          data={data}
          itemsPerRow={2}
        />
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: #f4f4f4;
`;

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
