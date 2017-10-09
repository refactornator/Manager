import { StackNavigator } from 'react-navigation';

import ReportsList from '../components/ReportsList';
import ReportScreen from './ReportScreen';

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

export default ReportsNavigator;
