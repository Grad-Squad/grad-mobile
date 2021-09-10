import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Colors, Typography } from 'styles';
import { childrenPropType } from 'proptypes';

const RegularText = ({ children, style, ...props }) => (
  <Text style={[styles.text, style]} {...props}>
    {children}
  </Text>
);

RegularText.propTypes = {
  children: childrenPropType.isRequired,
  style: Text.propTypes.style,
};
RegularText.defaultProps = {
  style: {},
};

export default RegularText;

const styles = StyleSheet.create({
  text: {
    fontFamily: Typography.defaultFont,
    color: Colors.black,
  },
});
