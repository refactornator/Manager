import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { Component } from 'react';
import Realm from 'realm';

import Loading from './components/Loading';
import NotesScreen from './screens/NotesScreen';
import ReportsScreen from './screens/ReportsScreen';

const MyNotesScreen = ({ screenProps: { realm } }) => {
  return <NotesScreen realm={realm} />;
};

const HomeTabNavigator = TabNavigator(
  {
    Notes: {
      screen: MyNotesScreen,
      path: '/notes',
      navigationOptions: {
        tabBarLabel: 'Notes',
        tabBarIcon: ({ focused, tintColor }) => {
          return (
            <Icon
              name={focused ? 'sticky-note' : 'sticky-note-o'}
              size={26}
              style={{ color: tintColor }}
            />
          );
        }
      }
    },
    Reports: {
      screen: ReportsScreen,
      path: '/reports',
      navigationOptions: {
        tabBarLabel: 'Reports',
        tabBarIcon: ({ tintColor }) => {
          return <Icon name="users" size={26} color={tintColor} />;
        }
      }
    }
  },
  {
    animationEnabled: true,
    swipeEnabled: true
  }
);

export default class App extends Component {
  state = {
    realm: null
  };

  componentWillMount() {
    Realm.open({
      schema: [
        {
          name: 'Note',
          primaryKey: 'key',
          properties: { key: 'string', text: 'string', createdAt: 'date' }
        },
        {
          name: 'Report',
          primaryKey: 'key',
          properties: { key: 'string', name: 'string' }
        }
      ]
    }).then(realm => {
      this.setState({ realm });
    });
  }

  render() {
    const { realm } = this.state;

    if (realm) {
      return <HomeTabNavigator screenProps={{ realm }} />;
    } else {
      return <Loading />;
    }
  }
}
