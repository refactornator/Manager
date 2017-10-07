import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default class App extends Component {
  state = {
    text: ''
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
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
          <Button title="Save" onPress={() => {}} />
        </View>
        <View style={{ flex: 5 }} />
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
