import React from "react";
import { ThemeProvider } from "react-native-elements";
import { View, StyleSheet } from "react-native";

import TitleRegion from "./post/TitleRegion";
import FooterRegion from "./post/FooterRegion";

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 5,
    width: "86%",
  },
});

function Post(props) {
  return (
    <View style={styles.container}>
      <ThemeProvider>
        <TitleRegion
          text={props.text}
          profileName={props.user}
          postDate={new Date()}
        ></TitleRegion>
        <FooterRegion
          style={styles.container}
          votes={123469}
          comments={4120}
        ></FooterRegion>
      </ThemeProvider>
    </View>
  );
}

export default Post;
