import React from 'react';
import { StyleSheet, Text, ViewPropTypes } from 'react-native';
import { Colors } from 'styles';
import Button from './Button';

const SecondaryActionButton = ({ style, textStyle, ...props }) => (
  <Button
    style={[styles.button, style]}
    textStyle={[styles.text, textStyle]}
    {...props}
  />
);

SecondaryActionButton.propTypes = {
  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
};
SecondaryActionButton.defaultProps = {
  style: {},
  textStyle: {},
};

export default SecondaryActionButton;

const styles = StyleSheet.create({
  button: {
    borderColor: Colors.accent,
    borderWidth: 3
  },
  text: {
    color: Colors.accent,
  },
});
