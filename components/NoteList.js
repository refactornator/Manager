import { FlatList } from 'react-native';
import React, { Component } from 'react';

import NoteListItem from './NoteListItem';

export default class NoteList extends Component {
  renderItem = ({ item: note }) => {
    const { editHandler, deleteHandler } = this.props;
    return <NoteListItem {...{ note, editHandler, deleteHandler }} />;
  };

  render() {
    const { notes } = this.props;
    return <FlatList data={notes} renderItem={this.renderItem} />;
  }
}
