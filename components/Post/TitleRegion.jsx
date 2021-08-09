import React from "react";
import { Avatar } from "react-native-elements";
import { View, Text, Image, StyleSheet } from "react-native";
import ContentRegion from "./ContentRegion";

const imageWidth = 70;
const imageOffset = -25;

const styles = StyleSheet.create({
  profileImage: {
    borderRadius: 50,
    width: imageWidth,
    height: 70,

    borderWidth: 0.1,
    borderColor: "black",
  },
  imageContainer: {
    position: "absolute",
    top: -25,
    left: imageOffset,
    padding: 5,
    borderRadius: 50,
    borderTopWidth: 0,
    borderRightWidth: 0.1,
    borderBottomWidth: 0.1,
    borderColor: "rgba(0 ,0 , 0,0.5)",
    backgroundColor: "white",
  },
  outerContainer: {
    justifyContent: "space-between",
    borderRadius: 7,
    //borderWidth: 0.1,
    borderColor: "rgba(0 ,0 , 0,0.5)",
    backgroundColor: "white",
    shadowOpacity: 0.25,
    shadowColor: "#000000",
    shadowRadius: 7,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    elevation: 2,
  },
  titleText: {
    fontWeight: "normal",
    fontSize: 18,
  },

  profileName: {
    marginTop: 5,
    fontSize: 9,
  },
  profileinfoContainer: {
    flexDirection: "row",
    width: "50%",
    marginRight: "auto",
  },

  innerContainer: {
    marginLeft: imageWidth + imageOffset + 15,
  },

  contentContainer: {
    marginTop: 5,
  },
  date: {
    marginLeft: "auto",
    marginRight: 10,
  },
});

function TitleRegion(props) {
  return (
    <View style={styles.outerContainer}>
      <View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.profileImage}
            source={{
              uri: "https://cdn.discordapp.com/attachments/810207976232976446/873648416113192980/unknown.png",
            }}
          ></Image>
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.profileinfoContainer}>
            <Text style={styles.profileName}>{props.profileName}</Text>
          </View>
          <View style={styles.postTitle}>
            <Text style={styles.titleText}>{props.text}</Text>
          </View>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <ContentRegion></ContentRegion>
      </View>
      <Text style={styles.date}>
        {props.postDate.getDay() +
          "/" +
          (props.postDate.getMonth() + 1) +
          "/" +
          props.postDate.getFullYear()}
      </Text>
    </View>
  );
}

export default TitleRegion;
