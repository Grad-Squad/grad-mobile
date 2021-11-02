import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';

import { Icon } from 'react-native-elements';
import {
  UPVOTE_HIT_SLOP_OBJECT,
  DOWNVOTE_HIT_SLOP_OBJECT,
  CurrentUserStatus,
} from 'constants';
import { formatNumber } from 'utility';
import EduText from 'common/EduText';
import { currentUserStatusPropType } from 'proptypes';
import {
  useAPIDownvotePost,
  useAPIUnvotePost,
  useAPIUpvotePost,
} from '../../api/endpoints/ratings';

function PostVotes({ voteCount, postId, id, currentUserStatus }) {
  const [vote, setVote] = useState(voteCount);
  const [isUpVoted, setIsUpVoted] = useState(
    currentUserStatus === CurrentUserStatus.upvoted
  );
  const [isDownVoted, setIsDownVoted] = useState(
    currentUserStatus === CurrentUserStatus.downVoted
  );

  const onErrorCallback = (
    error,
    { isPrevUpvoted, isPrevDownvoted, offset },
    context
  ) => {
    // An error happened!
    // todo show pop up thingy
    setVote((currentVote) => currentVote - offset);
    setIsUpVoted(isPrevUpvoted);
    setIsDownVoted(isPrevDownvoted);
  };

  const upvoteMutation = useAPIUpvotePost({
    onError: onErrorCallback,
  });
  const downvoteMutation = useAPIDownvotePost({
    onError: onErrorCallback,
  });
  const unvoteMutation = useAPIUnvotePost({
    onError: onErrorCallback,
  });

  useEffect(() => {
    setVote(voteCount);
  }, [voteCount]);

  const passCurrentState = (offset) => ({
    postId,
    ratingId: id,
    offset,
    isPrevUpvoted: isUpVoted,
    isPrevDownvoted: isDownVoted,
  });
  const upVoteHandler = () => {
    let offset = 0;
    if (isUpVoted) {
      offset = -1;
      unvoteMutation.mutate(passCurrentState(offset));
    } else if (isDownVoted) {
      offset = 2;
      upvoteMutation.mutate(passCurrentState(offset));
    } else {
      offset = 1;
      upvoteMutation.mutate(passCurrentState(offset));
    }
    setVote((currentVote) => currentVote + offset);
    setIsUpVoted((currentState) => !currentState);
    setIsDownVoted(false);
  };

  const downVoteHandler = () => {
    let offset = 0;
    if (isUpVoted) {
      offset = -2;
      downvoteMutation.mutate(passCurrentState(offset));
    } else if (isDownVoted) {
      offset = 1;
      unvoteMutation.mutate(passCurrentState(offset));
    } else {
      offset = -1;
      downvoteMutation.mutate(passCurrentState(offset));
    }
    setVote((currentVote) => currentVote + offset);
    setIsDownVoted((currentState) => !currentState);
    setIsUpVoted(false);
  };

  return (
    <View style={styles.VotesContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={upVoteHandler}
        hitSlop={UPVOTE_HIT_SLOP_OBJECT}
      >
        <View style={styles.arrow}>
          {isUpVoted ? (
            <Icon name="arrow-up-bold" type="material-community" />
          ) : (
            <Icon name="arrow-up-bold-outline" type="material-community" />
          )}
        </View>
      </TouchableOpacity>
      <EduText>{formatNumber(vote)}</EduText>
      <TouchableOpacity
        style={styles.button}
        onPress={downVoteHandler}
        hitSlop={DOWNVOTE_HIT_SLOP_OBJECT}
      >
        <View style={styles.arrow}>
          {isDownVoted ? (
            <Icon name="arrow-down-bold" type="material-community" />
          ) : (
            <Icon name="arrow-down-bold-outline" type="material-community" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

PostVotes.propTypes = {
  voteCount: PropTypes.number.isRequired,
  postId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  currentUserStatus: currentUserStatusPropType.isRequired,
};

export default PostVotes;

const styles = StyleSheet.create({
  VotesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    top: -2,
  },
  arrow: {
    padding: 2,
  },
  button: {
    flexDirection: 'row',
  },
});
