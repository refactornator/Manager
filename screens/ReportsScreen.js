import { StackNavigator } from 'react-navigation';
import React from 'react';

import ReportScreen from './ReportScreen';
import ReportsList from '../components/ReportsList';

const MyReportsScreen = ({ screenProps: props }) => {
  return <ReportsNavigator screenProps={props} />;
};

const ReportsNavigator = StackNavigator({
  ReportsList: {
    screen: ReportsList,
    path: 'reports'
  },
  Report: {
    screen: ReportScreen,
    path: 'report/:name',
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.name
    })
  }
});

export default MyReportsScreen;
