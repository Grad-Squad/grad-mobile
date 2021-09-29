import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import Comment from '../Comment/Comment';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '80%',
    paddingLeft: '9%',
    paddingRight: '5%',
    paddingVertical: 5,
  },
});

// todo remove this Data list
const DATA = [
  {
    id: 0,
    profileName: 'User 1',
    text: 'FIRST',
    commentDate: new Date().toDateString(),
    voteCount: 69,
  },
  {
    id: 1,
    profileName: 'User 1',
    text: 'FIRST',
    commentDate: new Date().toDateString(),
    voteCount: 2,
  },
  {
    id: 2,
    profileName: 'User 2',
    text: 'FIRST',
    commentDate: new Date().toDateString(),
    voteCount: 23,
  },
  {
    id: 3,
    profileName: 'User 3',
    text: 'FIRST',
    commentDate: new Date().toDateString(),
    voteCount: 46,
  },
  {
    id: 4,
    profileName: 'User 4',
    text: 'FIRST',
    commentDate: new Date().toDateString(),
    voteCount: 69,
  },
  {
    id: 5,
    profileName: 'User 5',
    text: 'I am in a very sad list and I need a somewhat of a big boi comment so this text will be a little bit larger than the others but not by much',
    commentDate: new Date().toDateString(),
    voteCount: 69,
  },
  {
    id: 6,
    profileName: 'User 6',
    text: 'ffs everyone get a life',
    commentDate: new Date().toDateString(),
    voteCount: 69,
  },
];

function CommentList() {
  const renderItem = ({ item }) => (
    <Comment
      profileName={item.profileName}
      text={item.text}
      commentDate={item.commentDate}
      voteCount={item.voteCount}
    />
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

export default CommentList;
