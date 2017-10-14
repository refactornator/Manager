import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import styled from 'styled-components/native';
import timeago from 'timeago.js';

export default ({ note, editHandler, deleteHandler }) => (
  <View style={styles.item}>
    <Header>
      <Timestamp>{timeago().format(note.createdAt)}</Timestamp>
      <TouchableOpacity onPress={deleteHandler.bind(null, note.key)}>
        <Icon name="times" size={14} color="#CED1D6" />
      </TouchableOpacity>
    </Header>
    <TouchableOpacity onPress={editHandler.bind(null, note.key)}>
      <NoteText style={styles.text}>{note.text}</NoteText>
    </TouchableOpacity>
  </View>
);

const Header = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const Timestamp = styled.Text`
  font-size: 10px;
  margin-bottom: 4px;
`;

const NoteText = styled.Text`
  font-size: 16px;
  margin-bottom: 4px;
`;

// For some reason making this a styled componentWillMount
// results in the item getting "smushed" when the note list
// is rerendered from a delete. Seems like a bug
const styles = StyleSheet.create({
  item: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 6,
    marginBottom: 6,
    backgroundColor: 'white',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#0E2451',
    shadowOpacity: 0.2,
    borderRadius: 10
  }
});
