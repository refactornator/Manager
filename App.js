import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import Realm from 'realm';
import uuid from 'uuid';

import Loading from './components/Loading';
import NoteInput from './components/NoteInput';
import NoteList from './components/NoteList';

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

  saveNote = text => {
    const { realm } = this.state;

    try {
      realm.write(() => {
        const newNote = realm.create('Note', {
          key: uuid.v1(),
          text,
          createdAt: new Date()
        });
        this.forceUpdate();
      });
    } catch (e) {
      console.log('Error on creation', e);
    }
  };

  render() {
    const { realm } = this.state;
    if (realm) {
      const notes = realm.objects('Note').sorted('createdAt', true);

      return (
        <View style={styles.container}>
          <NoteInput saveHandler={this.saveNote} />
          <View style={styles.noteList}>
            <NoteList notes={notes} />
          </View>
        </View>
      );
    } else {
      return <Loading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  noteList: {
    flex: 5
  }
});
