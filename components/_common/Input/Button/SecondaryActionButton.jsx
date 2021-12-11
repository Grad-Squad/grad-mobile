import { stylePropType, TextPropType } from 'proptypes';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'styles';
import Button from './Button';

const SecondaryActionButton = ({ style, textStyle, disabled, ...props }) => (
  <Button
    style={[styles.button, disabled && styles.disabled, style]}
    textStyle={[styles.text, disabled && styles.disabledText, textStyle]}
    {...props}
  />
);

SecondaryActionButton.propTypes = {
  style: stylePropType,
  textStyle: TextPropType,
  disabled: PropTypes.bool,
};
SecondaryActionButton.defaultProps = {
  style: {},
  textStyle: {},
  disabled: false,
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
  disabled: {
    borderColor: '#999',
  },
  disabledText: {
    color: '#999',
  },
});
