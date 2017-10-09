import { Dimensions, TouchableOpacity } from 'react-native';
import Grid from 'react-native-grid-component';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { Component } from 'react';
import styled from 'styled-components/native';

const { width: windowWidth } = Dimensions.get('window');

export default class ReportsList extends Component {
  state = {
    reports: [{ name: 'William' }, { name: 'Rick' }, { name: 'Morty' }]
  };

  renderItem = (data, i) => {
    const { navigation } = this.props;

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
  };

  render() {
    return (
      <Container>
        <Grid
          style={{ flex: 1 }}
          renderItem={this.renderItem}
          data={this.state.reports}
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
