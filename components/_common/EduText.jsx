import React from 'react';
import PropTypes from 'prop-types';
import { childrenPropType, TextPropType } from 'proptypes';
import { Colors, Fonts } from 'styles';
import { StyleSheet, Text } from 'react-native';

/* eslint-disable react/jsx-props-no-spreading */
const EduText = ({ children, inheritColor, style, ...otherProps }) => (
  <Text
    style={[styles.style, !inheritColor && styles.color, style]}
    {...otherProps}
  >
    {children}
  </Text>
);
export default EduText;

EduText.propTypes = {
  style: TextPropType,
  children: childrenPropType.isRequired,
  inheritColor: PropTypes.bool,
};
EduText.defaultProps = {
  style: {},
  inheritColor: false,
};

const styles = StyleSheet.create({
  style: {
    fontFamily: Fonts.default,
  },
  color: {
    color: Colors.offBlack,
  },
});
