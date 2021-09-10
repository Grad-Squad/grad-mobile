import pressableAndroidRipple from 'common/pressableAndroidRipple';
import PropTypes from 'prop-types';
import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewPropTypes } from 'react-native';

import { Colors, Constants } from 'styles';

const Button = ({ text, onPress, leftIcon, style, textStyle }) => (
  <Pressable
    onPress={onPress}
    style={[styles.button, style]}
    android_ripple={pressableAndroidRipple}
  >
    {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
    <Text style={[styles.text, textStyle]}>{text}</Text>
  </Pressable>
);

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 7,
    paddingHorizontal: 8,

    borderRadius: Constants.borderRadius,

    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leftIcon: { marginRight: 10 },
  text: {
    fontSize: 22,
    color: Colors.offBlack,
    fontFamily: 'Lato_400Regular',
  },
});

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  leftIcon: PropTypes.node,
  textStyle: Text.propTypes.style,
  style: ViewPropTypes.style,
};

Button.defaultProps = {
  leftIcon: undefined,
  textStyle: {},
  style: {},
};