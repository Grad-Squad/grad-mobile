import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  material: {
    marginVertical: 5,
    minHeight: 90,
    width:'100%',
  },
});

function ContentRegion() {
  return (
    <View style={styles.material}>
      <PostContentList/>
    </View>
  );
}

export default ContentRegion;
