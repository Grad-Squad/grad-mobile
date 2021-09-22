import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors } from 'styles';
import { childrenPropType, stylePropType } from 'proptypes';

const Page = ({ children, style }) => (
  <View style={[styles.main, style]}>{children}</View>
);

export default Page;

const styles = StyleSheet.create({
  main: { backgroundColor: Colors.background, flex: 1 },
});

Page.propTypes = {
  children: childrenPropType.isRequired,
  style: stylePropType,
};

Page.defaultProps = {
  style: {},
};
