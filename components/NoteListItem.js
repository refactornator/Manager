import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import timeago from 'timeago.js';

export default ({ note }) => (
  <View style={styles.item}>
    <Text style={styles.timestamp}>{timeago().format(note.createdAt)}</Text>
    <Text style={styles.text}>{note.text}</Text>
  </View>
);

const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 2,
    marginTop: 2,
    borderColor: 'grey',
    borderWidth: 2
  },
  timestamp: {
    marginBottom: 2
  },
  text: {
    fontSize: 20
  }
});
