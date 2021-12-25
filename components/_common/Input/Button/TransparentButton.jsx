import { stylePropType, TextPropType } from 'proptypes';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'styles';
import Button from './Button';

const TransparentButton = ({ style, textStyle, disabled, ...props }) => (
  <Button
    style={[styles.transparentButton, disabled && styles.disabled, style]}
    textStyle={[styles.text, disabled && styles.disabledText, textStyle]}
    disabled={disabled}
    {...props}
  />
);

TransparentButton.propTypes = {
  style: stylePropType,
  textStyle: TextPropType,
  disabled: PropTypes.bool,
};
TransparentButton.defaultProps = {
  style: {},
  textStyle: {},
  disabled: false,
};

export default TransparentButton;

const styles = StyleSheet.create({
  transparentButton: {},
  text: {
    color: Colors.accent,
  },
  disabledText: {
    color: '#999',
  },
});
