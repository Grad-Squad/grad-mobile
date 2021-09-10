import PropTypes from 'prop-types';
import { stylePropType } from 'proptypes';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Colors, Fonts, Styles } from 'styles';

import Button from './Button';

const WhiteButton = ({ smallButton, style, textStyle, ...props }) => (
  <Button
    style={[
      styles.baseButton,
      Styles.dropShadow,
      styles.button,
      !smallButton && styles.largeButton,
      style,
    ]}
    textStyle={[styles.text, !smallButton && styles.largeText, textStyle]}
    {...props}
  />
);

export default WhiteButton;

const styles = StyleSheet.create({
  baseButton: {
    width: '100%',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: Colors.white,
  },
  largeButton: { paddingVertical: 9 },
  text: {
    fontFamily: Fonts.action,
    fontSize: 20,
    flexBasis: '78%',
    textAlign: 'center',
  },
  largeText: { fontSize: 24 },
});

WhiteButton.propTypes = {
  smallButton: PropTypes.bool,
  style: stylePropType,
  textStyle: stylePropType,
};

WhiteButton.defaultProps = {
  smallButton: false,
  textStyle: {},
  style: {},
};
