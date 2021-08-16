import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';

import { Icon } from 'react-native-elements';
import {
  UPVOTE_HIT_SLOP_OBJECT,
  DOWNVOTE_HIT_SLOP_OBJECT,
} from '../../constants';
import { formatNumber } from '../../utility';

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

function Votes({ voteCount }) {
  const [vote, setVote] = useState(voteCount);
  const [IsUpVoted, setIsUpVoted] = useState(false);
  const [isDownVoted, setIsDownVoted] = useState(false);

  const upVoteHandler = () => {
    let offset = 0;
    if (IsUpVoted) {
      offset -= 1;
    } else if (isDownVoted) {
      offset += 2;
    } else {
      offset += 1;
    }
    setVote(vote + offset);
    setIsUpVoted(!IsUpVoted);
    setIsDownVoted(false);
  };
  const downVoteHandler = () => {
    let offset = 0;
    if (IsUpVoted) {
      offset -= 2;
    } else if (isDownVoted) {
      offset += 1;
    } else {
      offset -= 1;
    }
    setVote(vote + offset);
    setIsDownVoted(!isDownVoted);
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
          {IsUpVoted ? (
            <Icon name="arrow-up-bold" type="material-community" />
          ) : (
            <Icon name="arrow-up-bold-outline" type="material-community" />
          )}
        </View>
      </TouchableOpacity>
      <Text>{formatNumber(vote)}</Text>
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
};

export default Votes;
