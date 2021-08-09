import React from "react";
import { ThemeProvider, Card, Tile } from "react-native-elements";
import { View, Text, Dimensions, StyleSheet } from "react-native";

import TitleRegion from "./Post/TitleRegion";
import FooterRegion from "./Post/FooterRegion";

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: "86%",
  },
});

function Post(props) {
  return (
    <View style={styles.container}>
      <ThemeProvider>
        <TitleRegion
          text={props.text}
          profileName={"Jim Hopper"}
          postDate={new Date()}
        ></TitleRegion>
        <FooterRegion
          style={styles.container}
          votes="123.4k"
          comments="4k"
        ></FooterRegion>
      </ThemeProvider>
    </View>
  );
}

export default Post;
