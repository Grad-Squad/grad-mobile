import React from 'react';
import { View, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';

import { Styles } from '../../styles';
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
    height: 50,
    paddingTop: 10,
    paddingHorizontal: 10,
    borderRadius: 7,
    top: -10,
  },
});

function FooterRegion({ rating, commentCount, isPost }) {
  const { upvotes = 0, downvotes = 0, entityId, id } = rating;
  const voteCount = upvotes - downvotes;

  return (
    <View style={styles.outerContainer}>
      {isPost ?
      (<PostVotes voteCount={voteCount} postId={entityId} id={id} />):(
      <CommentVotes voteCount={voteCount} commentId={entityId} id={id}/>)}
      {isPost && <CommentButton count={commentCount} />}
      {isPost && <Bookmark />}
      <Options />
    </View>
  );
}

export default FooterRegion;

FooterRegion.propTypes = {
  rating: PropTypes.exact({
    entityId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    upvotes: PropTypes.number.isRequired,
    downvotes: PropTypes.number.isRequired,
    currentUserStatus: PropTypes.string.isRequired,
  }).isRequired,
  commentCount: PropTypes.number,
  isPost: PropTypes.bool,
};

FooterRegion.defaultProps = {
  commentCount: 0,
  isPost: false,
};
