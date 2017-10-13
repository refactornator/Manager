import { LayoutAnimation } from 'react-native';
import React, { Component } from 'react';
import styled from 'styled-components/native';
import uuid from 'uuid';

import NoteInput from '../components/NoteInput';
import NoteList from '../components/NoteList';

export default class NotesScreen extends Component {
  state = {
    expandedInput: false
  };

  saveNote = text => {
    const { realm } = this.props;

    try {
      realm.write(() => {
        const newNote = realm.create('Note', {
          key: uuid.v1(),
          text,
          createdAt: new Date()
        });
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.forceUpdate();
      });
    } catch (e) {
      console.log('Error on creation', e);
    }
  };

  deleteNote = key => {
    const { realm } = this.props;

    try {
      realm.write(() => {
        realm.delete(realm.objectForPrimaryKey('Note', key));
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.forceUpdate();
      });
    } catch (e) {
      console.log('Error on creation', e);
    }
  };

  expandInput = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({ expandedInput: true });
  };

  retractInput = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({ expandedInput: false });
  };

  render() {
    const { realm } = this.props;
    const { expandedInput } = this.state;
    const notes = realm
      .objects('Note')
      .filtered(`report == null`)
      .sorted('createdAt', true);

    return (
      <Container behavior="padding">
        <NoteInput
          saveHandler={this.saveNote}
          onFocusHandler={this.expandInput}
          loseFocusHandler={this.retractInput}
        />
        {!expandedInput && (
          <NoteListWrapper>
            <NoteList notes={notes} deleteHandler={this.deleteNote} />
          </NoteListWrapper>
        )}
      </Container>
    );
  }
}

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  margin-top: 22px;
  background-color: #f4f4f4;
`;

const NoteListWrapper = styled.View`
  flex: 5;
`;
