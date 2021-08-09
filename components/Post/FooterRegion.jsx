import React from "react";
import { Card } from "react-native-elements";
import { View, Text, Image, StyleSheet } from "react-native";

import { Icon } from "react-native-elements";

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
    paddingTop: 10,
    paddingHorizontal: 10,
    borderRadius: 7,
    backgroundColor: "lightgrey",
    zIndex: -1,
    top: -10,
    //borderWidth: 0.1,
    borderColor: "rgba(0 ,0 , 0,0.5)",
  },
  VotesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  CommentsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  BookmarkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  OptionsContainer: {
    alignItems: "center",
  },
});

function FooterRegion(props) {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.VotesContainer}>
        <Icon name="arrow-up-bold-outline" type="material-community" />
        <Text>{props.votes}</Text>
        <Icon name="arrow-down-bold-outline" type="material-community" />
      </View>
      <View style={styles.CommentsContainer}>
        <Icon name="comment-outline" type="material-community" />
        <Text>{props.comments}</Text>
      </View>
      <View style={styles.BookmarkContainer}>
        <Icon name="bookmark" type="feather" />
        <Text>save</Text>
      </View>
      <View style={styles.OptionsContainer}>
        <Icon name="options" type="simple-line-icon" />
      </View>
    </View>
  );
}

export default FooterRegion;
