import { stylePropType, TextPropType } from 'proptypes';
import React from 'react';
import { StyleSheet } from 'react-native';
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
  style: stylePropType,
  textStyle: TextPropType,
};
SecondaryActionButton.defaultProps = {
  style: {},
  textStyle: {},
};

export default SecondaryActionButton;

const styles = StyleSheet.create({
  button: {
    borderColor: Colors.accent,
    borderWidth: 2,
  },
  text: {
    color: Colors.accent,
  },
});
