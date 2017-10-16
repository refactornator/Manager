import { Dimensions } from 'react-native';
import Grid from 'react-native-grid-component';
import React, { Component } from 'react';
import styled from 'styled-components/native';

import ReportsListItem from './ReportsListItem';

const { width: windowWidth } = Dimensions.get('window');

export default class ReportsList extends Component {
  renderItem = (data, index) => {
    const { navigation } = this.props;
    const { realm } = this.props.screenProps;

    return <ReportsListItem key={index} {...{ navigation, realm, data }} />;
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
