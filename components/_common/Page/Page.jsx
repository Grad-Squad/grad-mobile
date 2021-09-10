import React from 'react';
import { StyleSheet, ViewPropTypes } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from 'styles';
import { childrenPropType } from 'proptypes';

const Page = ({ children, style }) => (
  <SafeAreaView style={[styles.main, style]}>{children}</SafeAreaView>
);

export default Page;

const styles = StyleSheet.create({
  main: { backgroundColor: Colors.background, flex: 1 },
});

Page.propTypes = {
  children: childrenPropType.isRequired,
  style: ViewPropTypes.style,
};

Page.defaultProps = {
  style: {},
};
