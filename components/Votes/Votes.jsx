import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useMutation } from 'react-query';

import PropTypes from 'prop-types';

import { Icon } from 'react-native-elements';
import { UPVOTE_HIT_SLOP_OBJECT, DOWNVOTE_HIT_SLOP_OBJECT } from 'constants';
import { formatNumber } from 'utility';
import EduText from 'common/EduText';

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

function Votes({ voteCount, votingFunctions }) {
  const { upvoteFunction, downvoteFunction, unvoteFunction } = votingFunctions;
  const [vote, setVote] = useState(voteCount);
  const [isUpVoted, setIsUpVoted] = useState(false);
  const [isDownVoted, setIsDownVoted] = useState(false);

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
    console.log(`rolling back optimistic update`);
  };

  const upvoteMutation = useMutation(upvoteFunction, {
    onError: onErrorCallback,
  });
  const downvoteMutation = useMutation(downvoteFunction, {
    onError: onErrorCallback,
  });
  const unvoteMutation = useMutation(unvoteFunction, {
    onError: onErrorCallback,
  });

  useEffect(() => {
    setVote(voteCount);
  }, [voteCount]);

  const passCurrentState = (offset) => ({
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

Votes.propTypes = {
  voteCount: PropTypes.number.isRequired,
  votingFunctions: PropTypes.exact({
    upvoteFunction: PropTypes.func.isRequired,
    downvoteFunction: PropTypes.func.isRequired,
    unvoteFunction: PropTypes.func.isRequired,
  }).isRequired,
};

export default Votes;
