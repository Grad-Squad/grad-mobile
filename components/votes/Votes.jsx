import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Icon } from "react-native-elements";
import { HIT_SLOP_OBJECT, FORMAT_NUMBER } from "../../constants/Constants";

const styles = StyleSheet.create({
  VotesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrow: {
    padding: 2,
  },
  button: {
    flexDirection: "row",
  },
});

export default function Votes({ votes }) {
  const [vote, setVote] = useState(votes);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownVoted, setIsDownVoted] = useState(false);

  const upVoteHandler = () => {
    let offset = 0;
    if (isUpvoted) {
      offset -= 1;
    } else if (isDownVoted) {
      offset += 2;
    } else {
      offset += 1;
    }
    setVote(vote + offset);
    setIsUpvoted(!isUpvoted);
    setIsDownVoted(false);
  };
  const downVoteHandler = () => {
    let offset = 0;
    if (isUpvoted) {
      offset -= 2;
    } else if (isDownVoted) {
      offset += 1;
    } else {
      offset -= 1;
    }
    setVote(vote + offset);
    setIsDownVoted(!isDownVoted);
    setIsUpvoted(false);
  };

  return (
    <View style={styles.VotesContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={upVoteHandler}
        hitSlop={HIT_SLOP_OBJECT}
      >
        <View style={styles.arrow}>
          {isUpvoted ? (
            <Icon name="arrow-up-bold" type="material-community" />
          ) : (
            <Icon name="arrow-up-bold-outline" type="material-community" />
          )}
        </View>
      </TouchableOpacity>
      <Text>{FORMAT_NUMBER(vote)}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={downVoteHandler}
        hitSlop={HIT_SLOP_OBJECT}
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
