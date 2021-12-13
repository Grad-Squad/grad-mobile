import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useAPIGetComments, getCommentsKey } from 'api/endpoints/posts';
import PaginatedFlatList from 'common/PaginatedFlatList';
import CommentSkeleton from 'components/Comment/CommentSkeleton';
import Comment from '../Comment/Comment';

const CommentList = ({ postID, setCommentToEdit }) => (
  <PaginatedFlatList
    contentContainerStyle={styles.container}
    paginatedReactQuery={useAPIGetComments}
    paginatedReactQueryParams={[postID]}
    reactQueryKey={[getCommentsKey, postID]}
    renderItem={({ item }) => {
      const { content, createdAt, author, rating, postId, id } = item;
      return (
        <Comment
          author={author}
          text={content}
          commentDate={createdAt}
          rating={rating}
          commentId={id}
          postId={postId}
          onEdit={() => {
            setCommentToEdit(item);
          }}
        />
      );
    }}
    errorLocalizationKey="Comment/Error: Couldn't Load Comments"
    noItemsLocalizationKey="Comment/No Comments on this post. Be the first to add a comment!"
    hideNothingLeftToShow
    SkeletonComponent={
      <>
        {Array(6)
          .fill()
          .map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <CommentSkeleton key={index + 1} />
          ))}
      </>
    }
  />
);

export default CommentList;

CommentList.propTypes = {
  postID: PropTypes.number.isRequired,
  setCommentToEdit: PropTypes.func.isRequired,
};

CommentList.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '95%',
    paddingLeft: '9%',
    paddingRight: '5%',
    paddingVertical: 10,
  },
});
