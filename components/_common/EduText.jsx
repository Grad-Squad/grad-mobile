import React from 'react';
import { childrenPropType } from 'proptypes';
import { Colors, Fonts } from 'styles';
import { StyleSheet, Text } from 'react-native';

/* eslint-disable react/jsx-props-no-spreading */
const EduText = ({ children, style, ...otherProps }) => (
  <Text style={[styles.style, style]} {...otherProps}>
    {children}
  </Text>
);
export default EduText;

EduText.propTypes = {
  style: Text.propTypes.style,
  children: childrenPropType.isRequired,
};
EduText.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  style: {
    fontFamily: Fonts.default,
    color: Colors.offBlack,
  },
});
