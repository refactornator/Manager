import { FlatList } from 'react-native';
import React from 'react';

import NoteListItem from './NoteListItem';

export default ({ notes, deleteHandler }) => (
  <FlatList
    data={notes}
    renderItem={({ item: note }) => (
      <NoteListItem {...{ note, deleteHandler }} />
    )}
  />
);
