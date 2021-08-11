import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Icon } from "react-native-elements";

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    paddingTop: 10,
    paddingHorizontal: 10,
    borderRadius: 7,
    backgroundColor: "#e9e9e9",
    zIndex: -1,
    top: -10,
    //borderWidth: 0.1,
    borderColor: "rgba(0 ,0 , 0,0.5)",
    shadowOpacity: 0.25,
    shadowColor: "#000000",
    shadowRadius: 7,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    elevation: 1,
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
  arrow: {
    padding: 2,
  },
  button: {
    flexDirection: "row",
  },
});
const hitSlopObject = { top: 16, bottom: 16, left: 16, right: 16 };

const onPress = () => console.log("Hi");

function FooterRegion(props) {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.VotesContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
          hitSlop={hitSlopObject}
        >
          <View style={styles.arrow}>
            <Icon name="arrow-up-bold-outline" type="material-community" />
          </View>
        </TouchableOpacity>
        <Text>{props.votes}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
          hitSlop={hitSlopObject}
        >
          <View style={styles.arrow}>
            <Icon name="arrow-down-bold-outline" type="material-community" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.CommentsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
          hitSlop={hitSlopObject}
        >
          <View>
            <Icon name="comment-outline" type="material-community" />
          </View>
          <Text>{props.comments}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.BookmarkContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
          hitSlop={hitSlopObject}
        >
          <Icon name="bookmark" type="feather" />
          <Text>save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.OptionsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
          hitSlop={hitSlopObject}
        >
          <Icon name="options" type="simple-line-icon" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default FooterRegion;
