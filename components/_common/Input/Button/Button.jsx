import pressableAndroidRipple from 'common/pressableAndroidRipple';
import PropTypes from 'prop-types';
import { stylePropType, TextPropType } from 'proptypes';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Constants } from 'styles';

const Button = ({ text, onPress, leftIcon, style, textStyle, ...props }) => (
  <Pressable
    onPress={onPress}
    style={[styles.button, style]}
    android_ripple={pressableAndroidRipple}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
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
  leftIcon: {
    flexBasis: '10%',
    alignItems: 'center',
  },
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
  textStyle: TextPropType,
  style: stylePropType,
};

Button.defaultProps = {
  leftIcon: undefined,
  textStyle: {},
  style: {},
};
