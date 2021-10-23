import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import PropTypes from 'prop-types';

import Comment from '../Comment/Comment';

// // todo remove this Data list
// const DATA = [
//   {
//     id: 7,
//     profileName: 'User 1',
//     text: 'FIRST',
//     commentDate: new Date().toDateString(),
//     rating: {
//       id: 4,
//       entityId: 0,
//       upvotes: 100,
//       downvotes: 50,
//       currentUserStatus: 'sad',
//     },
//   },
//   {
//     id: 1,
//     profileName: 'User 1',
//     text: 'FIRST',
//     commentDate: new Date().toDateString(),
//     rating: {
//       id: 4,
//       entityId: 0,
//       upvotes: 100,
//       downvotes: 50,
//       currentUserStatus: 'sad',
//     },
//   },
//   {
//     id: 2,
//     profileName: 'User 2',
//     text: 'FIRST',
//     commentDate: new Date().toDateString(),
//     rating: {
//       id: 4,
//       entityId: 0,
//       upvotes: 100,
//       downvotes: 50,
//       currentUserStatus: 'sad',
//     },
//   },
//   {
//     id: 3,
//     profileName: 'User 3',
//     text: 'FIRST',
//     commentDate: new Date().toDateString(),
//     rating: {
//       id: 4,
//       entityId: 0,
//       upvotes: 100,
//       downvotes: 50,
//       currentUserStatus: 'sad',
//     },
//   },
//   {
//     id: 4,
//     profileName: 'User 4',
//     text: 'FIRST',
//     commentDate: new Date().toDateString(),
//     rating: {
//       id: 4,
//       entityId: 0,
//       upvotes: 100,
//       downvotes: 50,
//       currentUserStatus: 'sad',
//     },
//   },
//   {
//     id: 5,
//     profileName: 'User 5',
//     text: 'I am in a very sad list and I need a somewhat of a big boi comment so this text will be a little bit larger than the others but not by much',
//     commentDate: new Date().toDateString(),
//     rating: {
//       id: 4,
//       entityId: 0,
//       upvotes: 100,
//       downvotes: 50,
//       currentUserStatus: 'sad',
//     },
//   },
//   {
//     id: 6,
//     profileName: 'User 6',
//     text: 'ffs everyone get a life',
//     commentDate: new Date().toDateString(),
//     rating: {
//       id: 4,
//       entityId: 0,
//       upvotes: 100,
//       downvotes: 50,
//       currentUserStatus: 'sad',
//     },
//   },
// ];

function CommentList({commentsData}) {
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
      data={commentsData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

export default CommentList;


CommentList.propTypes = {
  commentsData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    updatedAt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    rating: PropTypes.exact({
      id: PropTypes.number.isRequired,
      upvotes: PropTypes.number.isRequired,
      downvotes: PropTypes.number.isRequired,
      currentUserStatus: PropTypes.string.isRequired,
    }).isRequired,
    author: PropTypes.exact({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      profilePicture: PropTypes.string.isRequired,
    }).isRequired,}).isRequired
  ).isRequired,
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '80%',
    paddingLeft: '9%',
    paddingRight: '5%',
    paddingVertical: 5,
  },
});