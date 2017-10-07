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
    currentIndex: 0,
    notes: []
  };

  render() {
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
              let { currentIndex, inputText } = this.state;
              const newNote = {
                id: currentIndex,
                text: inputText,
                createdAt: Date.now()
              };
              this.setState({
                inputText: '',
                currentIndex: ++currentIndex,
                notes: [newNote].concat(this.state.notes)
              });
            }}
          />
        </View>
        <View style={{ flex: 5 }}>
          <FlatList
            data={this.state.notes}
            keyExtractor={item => item.id}
            renderItem={({ item: note }) => <NoteListItem {...{ note }} />}
          />
        </View>
      </View>
    );
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
