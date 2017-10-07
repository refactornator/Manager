import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList
} from 'react-native';
import timeago from 'timeago.js';
import Realm from 'realm';
import uuid from 'uuid';

class NoteListItem extends Component {
  render() {
    const { note } = this.props;

    return (
      <View style={listItemStyles.item}>
        <Text style={listItemStyles.timestamp}>
          {timeago().format(note.createdAt)}
        </Text>
        <Text style={listItemStyles.text}>{note.text}</Text>
      </View>
    );
  }
}

const listItemStyles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 2,
    marginTop: 2,
    borderColor: 'grey',
    borderWidth: 2
  },
  timestamp: {
    marginBottom: 2
  },
  text: {
    fontSize: 20
  }
});

export default class App extends Component {
  state = {
    inputText: '',
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
      const notes = realm.objects('Note').sorted('createdAt', true);

      return (
        <View style={styles.container}>
          <View style={styles.inputWrapper}>
            <TextInput
              editable={true}
              multiline={true}
              style={styles.noteInput}
              placeholder="Make a note..."
              onChangeText={inputText => this.setState({ inputText })}
              value={this.state.inputText}
            />
            <Button
              title="Save"
              onPress={() => {
                let { realm, inputText } = this.state;

                try {
                  realm.write(() => {
                    const newNote = realm.create('Note', {
                      key: uuid.v1(),
                      text: inputText,
                      createdAt: new Date()
                    });

                    this.setState({
                      inputText: ''
                    });
                  });
                } catch (e) {
                  console.log('Error on creation', e);
                }
              }}
            />
          </View>
          <View style={{ flex: 5 }}>
            <FlatList
              data={notes}
              renderItem={({ item: note }) => <NoteListItem {...{ note }} />}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text>Loading...</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  inputWrapper: {
    flex: 2,
    padding: 2,
    marginTop: 30,
    marginLeft: 2,
    marginRight: 2,
    borderColor: 'powderblue',
    borderWidth: 2
  },
  noteInput: {
    flex: 1,
    fontSize: 20
  },
  saveButton: {}
});
