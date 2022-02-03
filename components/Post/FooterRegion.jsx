import React from 'react';
import { View, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';

import { ratingPropType, stylePropType } from 'proptypes';
import { Styles } from 'styles';
import PostVotes from '../Votes/PostVotes';
import CommentVotes from '../Votes/CommentVotes';
import Options from './Options/Options';
import CommentButton from '../Comment/CommentButton';
import Bookmark from './Bookmark/Bookmark';
import BookmarkRemove from './Bookmark/BookmarkRemove';

const styles = StyleSheet.create({
  outerContainer: {
    ...Styles.cardFooter,
    elevation: 1,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 15,
    paddingVertical: 8,

    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,

    top: -2,
  },
});

function FooterRegion({
  rating,
  postId,
  commentCount,
  isPost,
  onEdit,
  onDelete,
  contentProfileId,
  style,
  bookmarkId,
  inRootBookmark,
}) {
  const { upvotes = 0, downvotes = 0, id, currentUserStatus } = rating;
  const voteCount = upvotes - downvotes;

  return (
    <View style={[styles.outerContainer, style]}>
      {isPost ? (
        <PostVotes
          voteCount={voteCount}
          postId={postId}
          id={id}
          currentUserStatus={currentUserStatus}
        />
      ) : (
        <CommentVotes
          voteCount={voteCount}
          commentId={postId}
          id={id}
          currentUserStatus={currentUserStatus}
        />
      )}
      {isPost && <CommentButton count={commentCount} />}
      {isPost &&
        (bookmarkId === undefined ? (
          <Bookmark postId={postId} />
        ) : (
          <BookmarkRemove
            postId={postId}
            bookmarkId={bookmarkId}
            inRootBookmark={inRootBookmark}
          />
        ))}
      <Options
        onEdit={onEdit}
        onDelete={onDelete}
        contentProfileId={contentProfileId}
        postId={postId}
        bookmarkId={bookmarkId}
      />
    </View>
  );
}

export default React.memo(FooterRegion);

FooterRegion.propTypes = {
  rating: ratingPropType.isRequired,
  postId: PropTypes.number.isRequired,
  commentCount: PropTypes.number,
  isPost: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  contentProfileId: PropTypes.number.isRequired,
  style: stylePropType,
  bookmarkId: PropTypes.number,
  inRootBookmark: PropTypes.bool,
};

FooterRegion.defaultProps = {
  commentCount: 0,
  isPost: false,
  style: {},
  bookmarkId: undefined,
  inRootBookmark: undefined,
};
