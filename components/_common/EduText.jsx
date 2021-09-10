import React from 'react';
import PropTypes from 'prop-types';
import { Colors, Fonts } from 'styles';
import { StyleSheet, Text, ViewPropTypes } from 'react-native';

/* eslint-disable react/jsx-props-no-spreading */
const EduText = ({ children, style, ...otherProps }) => (
  <Text style={[styles.style, style]} {...otherProps}>
    {children}
  </Text>
);
export default EduText;

EduText.propTypes = {
  style: ViewPropTypes.style,
  children: PropTypes.string.isRequired,
};
EduText.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  style: {
    fontFamily: Fonts.default,
    color: Colors.offBlack,
  },
});
