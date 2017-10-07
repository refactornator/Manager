import { Button, StyleSheet, TextInput, View } from 'react-native';
import React, { Component } from 'react';

export default class NoteInput extends Component {
  state = {
    text: ''
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          editable={true}
          multiline={true}
          style={styles.input}
          placeholder="Make a note..."
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <Button
          title="Save"
          onPress={() => {
            const { text } = this.state;
            this.props.saveHandler(text);
            this.setState({
              text: ''
            });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    padding: 2,
    marginTop: 30,
    marginLeft: 2,
    marginRight: 2,
    borderColor: 'powderblue',
    borderWidth: 2
  },
  input: {
    flex: 1,
    fontSize: 20
  }
});
