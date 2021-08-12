import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Icon } from "react-native-elements";
import { HIT_SLOP_OBJECT, FORMAT_NUMBER } from "../../constants/Constants";

const styles = StyleSheet.create({
  CommentsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
  },
});

export default function Comments({ comments }) {
  const onPress = () => {
    console.log("COMMENT");
  };

  return (
    <View style={styles.CommentsContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        hitSlop={HIT_SLOP_OBJECT}
      >
        <View>
          <Icon name="comment-outline" type="material-community" />
        </View>
        <Text>{FORMAT_NUMBER(comments)}</Text>
      </TouchableOpacity>
    </View>
  );
}
