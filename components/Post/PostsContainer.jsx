import React from 'react';
import { StyleSheet } from 'react-native';
import PaginatedFlatList from 'common/PaginatedFlatList';
import PropTypes from 'prop-types';
import { stringOrNumberPropType } from 'proptypes';
import Post from './Post';

const PostsContainer = ({ reactQueryKey, paginatedReactQuery }) => (
  <PaginatedFlatList
    contentContainerStyle={styles.feedList}
    paginatedReactQuery={paginatedReactQuery}
    reactQueryKey={reactQueryKey}
    renderItem={({
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
    )}
    errorLocalizationKey="Feed/Error:Couldn't load posts"
  />
);

PostsContainer.propTypes = {
  paginatedReactQuery: PropTypes.func.isRequired,
  reactQueryKey: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(stringOrNumberPropType).isRequired,
  ]).isRequired,
};
PostsContainer.defaultProps = {};

export default PostsContainer;

const styles = StyleSheet.create({
  feedList: {
    paddingVertical: 30,
  },
  post: {
    width: '90%',
    alignSelf: 'center',
  },
});
