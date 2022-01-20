import Post from 'components/Post/Post';
import { postPropType } from 'proptypes';
import React from 'react';
import { StyleSheet } from 'react-native';

const BookmarksPostWrapper = ({
  item: { title, author, rating, createdAt, id, commentCount, materials },
}) => (
  <Post
    title={title}
    author={author}
    rating={rating}
    createdAt={createdAt}
    id={id}
    style={styles.post}
    commentCount={commentCount}
    materials={materials}
  />
);

BookmarksPostWrapper.propTypes = {
  item: postPropType.isRequired,
};

const styles = StyleSheet.create({
  post: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default BookmarksPostWrapper;
