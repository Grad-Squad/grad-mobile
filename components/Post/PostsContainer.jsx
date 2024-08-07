import React from 'react';
import { StyleSheet } from 'react-native';
import PaginatedFlatList from 'common/PaginatedFlatList';
import PropTypes from 'prop-types';
import { stringOrNumberPropType } from 'proptypes';
import Post from './Post';
import PostSkeleton from './PostSkeleton';

const PostsContainer = ({
  reactQueryKey,
  paginatedReactQuery,
  onScroll,
  ListEmptyComponent,
  ...PaginatedFlatListParams
}) => (
  <PaginatedFlatList
    contentContainerStyle={styles.feedList}
    paginatedReactQuery={paginatedReactQuery}
    reactQueryKey={reactQueryKey}
    onScroll={onScroll && onScroll}
    ListEmptyComponent={ListEmptyComponent}
    renderItem={
      ({
        item: {
          title,
          author,
          rating,
          createdAt,
          id,
          commentCount,
          materials,
          subject,
          wasEdited,
        },
      }) => (
        // Animated.createAnimatedComponent(
        <Post
          title={title}
          author={author}
          rating={rating}
          createdAt={createdAt}
          id={id}
          style={styles.post}
          commentCount={commentCount}
          materials={materials}
          subject={subject}
          wasEdited={wasEdited}
        />
      )
      // )
    }
    errorLocalizationKey="Feed/Error:Couldn't load posts"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...PaginatedFlatListParams}
    SkeletonComponent={
      <>
        {Array(4)
          .fill()
          .map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <PostSkeleton key={index + 1} />
          ))}
      </>
    }
  />
);

PostsContainer.propTypes = {
  paginatedReactQuery: PropTypes.func.isRequired,
  reactQueryKey: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(stringOrNumberPropType).isRequired,
  ]).isRequired,
  onScroll: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]),
  ListEmptyComponent: PropTypes.element,
};
PostsContainer.defaultProps = {
  onScroll: undefined,
  ListEmptyComponent: null,
};

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
