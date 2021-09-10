import { stylePropType, TextPropType } from 'proptypes';
import React from 'react';
import { StyleSheet } from 'react-native';
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
  style: stylePropType,
  textStyle: TextPropType,
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
