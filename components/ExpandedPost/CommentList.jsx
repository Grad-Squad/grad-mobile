import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useAPIGetComments, getCommentsKey } from 'api/endpoints/posts';
import PaginatedFlatList from 'common/PaginatedFlatList';
import Comment from '../Comment/Comment';

const CommentList = ({ postID }) => (
  <PaginatedFlatList
    contentContainerStyle={styles.container}
    paginatedReactQuery={useAPIGetComments}
    paginatedReactQueryParams={[postID]}
    reactQueryKey={[getCommentsKey, postID]}
    renderItem={({ item: { content, createdAt, author, rating } }) => (
      <Comment
        profileName={author.name}
        text={content}
        commentDate={createdAt}
        voteCount={rating.upvotes - rating.downvotes}
        profileId={author.id}
      />
    )}
    errorLocalizationKey="Comment/Error: Couldn't Load Comments"
    noItemsLocalizationKey="Comment/No Comments on this post. Be the first to add a comment!"
    hideNothingLeftToShow
  />
);

export default CommentList;

CommentList.propTypes = {
  postID: PropTypes.number.isRequired,
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
