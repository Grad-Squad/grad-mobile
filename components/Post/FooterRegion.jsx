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
      {isPost && <Bookmark postId={postId}/>}
      <Options onEdit={onEdit} onDelete={onDelete} contentProfileId={contentProfileId} />
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
};

FooterRegion.defaultProps = {
  commentCount: 0,
  isPost: false,
  style: {},
};
