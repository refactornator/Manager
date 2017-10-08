import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import timeago from 'timeago.js';

export default ({ note, deleteHandler }) => (
  <View style={styles.item}>
    <View style={styles.header}>
      <Text style={styles.timestamp}>{timeago().format(note.createdAt)}</Text>
      <TouchableOpacity onPress={deleteHandler.bind(null, note.key)}>
        <Icon name="times" size={14} color="#CED1D6" />
      </TouchableOpacity>
    </View>
    <Text style={styles.text}>{note.text}</Text>
  </View>
);

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
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  timestamp: {
    fontSize: 10,
    marginBottom: 4
  },
  text: {
    fontSize: 20,
    marginBottom: 4
  }
});
