import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';

import { Colors } from '../../styles';
import Votes from '../Votes/Votes';
import Options from './Options/Options';
import CommentButton from '../Comment/CommentButton';
import Bookmark from './Bookmark/Bookmark';
import {
  downvoteComment,
  downvotePost,
  unvoteComment,
  unvotePost,
  upvoteComment,
  upvotePost,
} from '../../api/ratings';

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingTop: 10,
    paddingHorizontal: 10,
    borderRadius: 7,
    backgroundColor: Colors.cardFooter,
    zIndex: -1,
    top: -10,
    borderColor: 'rgba(0 ,0 , 0,0.5)',
    shadowOpacity: 0.25,
    shadowColor: '#000000',
    shadowRadius: 7,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    elevation: 1,
  },
});

function FooterRegion({ rating, commentCount, isPost }) {
  const { upvotes = 0, downvotes = 0, entityId, id } = rating;
  const voteCount = upvotes - downvotes;

  let votingFunctions;
  if (isPost) {
    votingFunctions = {
      upvoteFunction: () => upvotePost(entityId, id),
      downvoteFunction: () => downvotePost(entityId, id),
      unvoteFunction: () => unvotePost(entityId, id),
    };
  } else {
    votingFunctions = {
      upvoteFunction: () => upvoteComment(entityId, id),
      downvoteFunction: () => downvoteComment(entityId, id),
      unvoteFunction: () => unvoteComment(entityId, id),
    };
  }

  return (
    <View style={styles.outerContainer}>
      <Votes voteCount={voteCount} votingFunctions={votingFunctions} />
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
