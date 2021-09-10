import React from 'react';
import { StyleSheet, Text, ViewPropTypes } from 'react-native';
import { Colors } from 'styles';
import Button from './Button';

const TransparentButton = ({ style, textStyle, ...props }) => (
  <Button
    style={[styles.transparentButton, style]}
    textStyle={[styles.text, textStyle]}
    {...props}
  />
);

TransparentButton.propTypes = {
  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
};
TransparentButton.defaultProps = {
  style: {},
  textStyle: {},
};

export default TransparentButton;

const styles = StyleSheet.create({
  transparentButton: {},
  text: {
    color: Colors.accent,
  },
});
