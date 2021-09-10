import { stylePropType, TextPropType } from 'proptypes';
import React from 'react';
import { StyleSheet } from 'react-native';
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
  style: stylePropType,
  textStyle: TextPropType,
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
