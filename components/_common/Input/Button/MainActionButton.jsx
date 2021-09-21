import { stylePropType, TextPropType } from 'proptypes';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'styles';
import Button from './Button';

const MainActionButton = ({ style, disabled, textStyle, ...props }) => (
  <Button
    style={[styles.button, disabled && styles.disabledButton, style]}
    textStyle={[styles.text, textStyle]}
    disabled={disabled}
    {...props}
  />
);

MainActionButton.propTypes = {
  style: stylePropType,
  textStyle: TextPropType,
  disabled: PropTypes.bool,
};
MainActionButton.defaultProps = {
  style: {},
  textStyle: {},
  disabled: false,
};

export default MainActionButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.accent,
    margin: 3,
  },
  text: {
    color: Colors.white,
  },

  disabledButton: {
    // opacity: 0.3,
    backgroundColor: '#999',
  },
});
