import React from "react";
import { Card } from "react-native-elements";
import { View, Text, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  material: {
    marginVertical: 5,
    marginHorizontal: 10,
    minHeight: 90,
    borderWidth: 1,
    backgroundColor: "#86B3DD",
    borderRadius: 7,
  },

  date: {
    marginLeft: "auto",
    marginRight: 10,
  },
});

function ContentRegion(props) {
  return (
    <View width="100%">
      <View style={styles.material}></View>
    </View>
  );
}

export default ContentRegion;
