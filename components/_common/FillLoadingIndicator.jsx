import React from 'react';
import { StyleSheet, View } from 'react-native';
import LoadingIndicator from './LoadingIndicator';

const FillLoadingIndicator = () => (
  <View style={styles.wrapper}>
    <LoadingIndicator large />
  </View>
);

export default FillLoadingIndicator;

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    elevation: 1000,
  },
});
