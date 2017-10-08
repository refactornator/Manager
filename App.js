import { LayoutAnimation } from 'react-native';
import React, { Component } from 'react';
import Realm from 'realm';
import styled from 'styled-components/native';
import uuid from 'uuid';

import Loading from './components/Loading';
import NoteInput from './components/NoteInput';
import NoteList from './components/NoteList';

export default class App extends Component {
  state = {
    expandedInput: false,
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
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.forceUpdate();
      });
    } catch (e) {
      console.log('Error on creation', e);
    }
  };

  deleteNote = key => {
    const { realm } = this.state;
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
    const { realm, expandedInput } = this.state;

    if (realm) {
      const notes = realm.objects('Note').sorted('createdAt', true);

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
    } else {
      return <Loading />;
    }
  }
}

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #f4f4f4;
`;

const NoteListWrapper = styled.View`
  flex: 5;
`;
