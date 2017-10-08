import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { Component } from 'react';

export default class NoteInput extends Component {
  state = {
    text: '',
    showHeader: false
  };

  cancel = () => {
    this.refs.input.blur();
    this.props.loseFocusHandler();
    this.setState({ showHeader: false });
  };

  save = () => {
    const { text } = this.state;
    this.props.saveHandler(text);
    this.setState({
      text: '',
      showHeader: false
    });
    this.refs.input.blur();
    this.props.loseFocusHandler();
  };

  onFocus = () => {
    this.props.onFocusHandler();
    this.setState({ showHeader: true });
  };

  onBlur = () => {
    this.props.loseFocusHandler();
    this.setState({ showHeader: false });
  };

  render() {
    const { text, showHeader } = this.state;
    const disableSave = text.length < 1;
    return (
      <View style={styles.container}>
        {showHeader && (
          <View style={styles.header}>
            <Text style={styles.instructions}>Create a new note</Text>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity disabled={disableSave} onPress={this.save}>
                <Icon name="check-circle-o" size={44} color="#008774" />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.cancel}>
                <Icon name="times-circle-o" size={44} color="#900" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <TextInput
          ref={'input'}
          editable={true}
          multiline={true}
          style={styles.input}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10
  },
  header: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  instructions: {
    color: '#CED1D6',
    fontSize: 30,
    fontWeight: 'bold'
  },
  buttonWrapper: {
    width: 90,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  input: {
    flex: 1,
    padding: 7,
    fontSize: 36,
    borderColor: '#00AE9E',
    borderWidth: 2,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#D4D4D5',
    shadowOpacity: 1,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10
  }
});
