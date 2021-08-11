import PropTypes from 'prop-types';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors, Constants, Fonts, Styles } from '../../../../styles';

const Button = ({ text, onPress, transparent, lightText, largeButton }) => (
  <Pressable
    onPress={onPress}
    style={[
      styles.baseButton,
      transparent
        ? styles.transparentButton
        : [Styles.dropShadow, styles.button],
    ]}
    android_ripple={{ color: Colors.androidRipple, borderless: false }}
  >
    <Text
      style={
        lightText
          ? styles.lightText
          : [styles.text, largeButton && styles.largeButton]
      }
    >
      {text}
    </Text>
  </Pressable>
);

export default Button;

const styles = StyleSheet.create({
  baseButton: {
    alignItems: 'center',
  },
  transparentButton: {
    padding: 5,
  },
  button: {
    padding: 6,
    backgroundColor: Colors.white,
    borderRadius: Constants.borderRadius,
  },
  largeButton: { paddingVertical: 7 },
  lightText: {
    fontFamily: 'Lato_300Light',
    fontSize: 17,
  },
  text: {
    fontFamily: Fonts.action,
    fontSize: 20,
    color: Colors.offBlack,
  },
});

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  transparent: PropTypes.bool,
  lightText: PropTypes.bool,
  largeButton: PropTypes.bool,
};

Button.defaultProps = {
  transparent: false,
  lightText: false,
  largeButton: false,
};
