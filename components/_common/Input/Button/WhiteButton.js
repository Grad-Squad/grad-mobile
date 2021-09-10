import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, ViewPropTypes } from 'react-native';

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
  style: ViewPropTypes.style,
  textStyle: ViewPropTypes.style,
};

WhiteButton.defaultProps = {
  smallButton: false,
  textStyle: {},
  style: {},
};
