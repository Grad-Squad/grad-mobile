import pressableAndroidRipple from 'common/pressableAndroidRipple';
import PropTypes from 'prop-types';
import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewPropTypes } from 'react-native';

import { Colors, Constants, Fonts, Styles } from 'styles';

const Button = ({
  text,
  onPress,
  transparent,
  lightText,
  smallButton,
  leftIcon,
  style,
  textStyle,
  underline,
}) => (
  <Pressable
    onPress={onPress}
    style={[
      styles.baseButton,
      transparent
        ? styles.transparentButton
        : [Styles.dropShadow, styles.button],
      !(smallButton || transparent) && styles.largeButton,
      style,
    ]}
    android_ripple={pressableAndroidRipple}
  >
    {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
    <Text
      style={[
        lightText
          ? styles.lightText
          : [styles.text, !(smallButton || transparent) && styles.largeText],
        underline && styles.underLineButtonText,
        textStyle,
      ]}
    >
      {text}
    </Text>
  </Pressable>
);

export default Button;

const styles = StyleSheet.create({
  baseButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  transparentButton: {
    padding: 5,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: Colors.white,
    borderRadius: Constants.borderRadius,
  },
  largeButton: { paddingVertical: 9 },
  leftIcon: { marginRight: 10 },
  lightText: {
    fontFamily: 'Lato_300Light',
    fontSize: 17,
  },
  underLineButtonText: {
    textDecorationLine: 'underline',
  },
  text: {
    fontFamily: Fonts.action,
    fontSize: 20,
    color: Colors.offBlack,
    flexBasis: '78%',
    textAlign: 'center',
  },
  largeText: { fontSize: 24 },
});

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  transparent: PropTypes.bool,
  underline: PropTypes.bool,
  lightText: PropTypes.bool,
  smallButton: PropTypes.bool,
  leftIcon: PropTypes.node,
  style: ViewPropTypes.style,
  textStyle: ViewPropTypes.style,
};

Button.defaultProps = {
  transparent: false,
  underline: false,
  lightText: false,
  smallButton: false,
  leftIcon: undefined,
  textStyle: {},
  style: {},
};
