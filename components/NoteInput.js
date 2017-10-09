import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { Component } from 'react';
import styled from 'styled-components/native';

export default class NoteInput extends Component {
  state = {
    text: '',
    expanded: false
  };

  cancel = () => {
    this.refs.input.root.blur();
    this.props.loseFocusHandler();
    this.setState({ expanded: false });
  };

  save = () => {
    const { text } = this.state;
    this.props.saveHandler(text);
    this.setState({
      text: '',
      expanded: false
    });
    this.refs.input.root.blur();
    this.props.loseFocusHandler();
  };

  onFocus = () => {
    this.props.onFocusHandler();
    this.setState({ expanded: true });
  };

  onBlur = () => {
    this.props.loseFocusHandler();
    this.setState({ expanded: false });
  };

  render() {
    const { text, expanded } = this.state;
    const disableSave = text.length < 1;

    return (
      <Container expanded={expanded}>
        {expanded && (
          <Header>
            <Instructions>Create a new note</Instructions>
            <ButtonWrapper>
              <TouchableOpacity disabled={disableSave} onPress={this.save}>
                <Icon name="check-circle-o" size={44} color="#008774" />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.cancel}>
                <Icon name="times-circle-o" size={44} color="#3D434F" />
              </TouchableOpacity>
            </ButtonWrapper>
          </Header>
        )}
        <Input
          ref={'input'}
          editable={true}
          multiline={true}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          placeholder={expanded ? '' : 'Create a new note'}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
      </Container>
    );
  }
}

const Container = styled.View`
  ${props => (props.expanded ? 'flex: 1' : 'height: 80px')};
  padding: 2px;
  margin-left: 10px;
  margin-right: 10px;
`;

const Header = styled.View`
  height: 50px;
  margin-top: 10px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const Instructions = styled.Text`
  color: #ced1d6;
  font-size: 30px;
  font-weight: bold;
`;

const ButtonWrapper = styled.View`
  width: 90px
  flex-direction: row;
  justify-content: space-around;
`;

const Input = styled.TextInput`
  flex: 1;
  padding: 7px;
  font-size: 16px;
  border-color: #007aff;
  border-width: 2px;
  shadow-offset: 1px 1px;
  shadow-color: #d4d4d5;
  shadow-opacity: 1;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: white;
`;
