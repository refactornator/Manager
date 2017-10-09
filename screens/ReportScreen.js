import { Text } from 'react-native';
import React, { Component } from 'react';
import styled from 'styled-components/native';

export default class ReportScreen extends Component {
  render() {
    const { name } = this.props.navigation.state.params;

    return <Container />;
  }
}

const Container = styled.View`
  flex: 1;
  background-color: #f4f4f4;
`;
