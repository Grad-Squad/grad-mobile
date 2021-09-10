import React from 'react';
import { StyleSheet, Text, ViewPropTypes } from 'react-native';
import { Colors } from 'styles';
import Button from './Button';

const MainActionButton = ({ style, textStyle, ...props }) => (
  <Button
    style={[styles.button, style]}
    textStyle={[styles.text, textStyle]}
    {...props}
  />
);

MainActionButton.propTypes = {
  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
};
MainActionButton.defaultProps = {
  style: {},
  textStyle: {},
};

export default MainActionButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.accent,
  },
  text: {
    color: Colors.white,
  },
});
