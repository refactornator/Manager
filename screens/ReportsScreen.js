import { StackNavigator } from 'react-navigation';
import React from 'react';

import ReportScreen from './ReportScreen';
import ReportsList from '../components/ReportsList';

const ReportsNavigator = StackNavigator({
  ReportsList: {
    screen: ReportsList,
    path: 'reports',
    navigationOptions: ({ navigation }) => ({
      title: 'Reports'
    })
  },
  Report: {
    screen: ReportScreen,
    path: 'report/:name',
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.name,
      tabBarVisible: false
    })
  }
});

export default ReportsNavigator;
