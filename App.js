import React, { Component } from 'react';
import Realm from 'realm';

import Loading from './components/Loading';
import NoteScreen from './screens/NoteScreen';

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
        }
      ]
    }).then(realm => {
      this.setState({ realm });
    });
  }

  render() {
    const { realm } = this.state;

    if (realm) {
      return <NoteScreen realm={realm} />;
    } else {
      return <Loading />;
    }
  }
}
