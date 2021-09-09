import React from 'react';
import PropTypes from 'prop-types';
import { Pressable } from 'react-native';
import { Colors } from 'styles';
import Icon from './Icon';

const PressableIcon = ({ onPress, ...rest }) => (
  <Pressable
    onPress={onPress}
    android_ripple={{ color: Colors.androidRipple, borderless: false }}
  >
    <Icon {...rest} />
  </Pressable>
);

PressableIcon.propTypes = { onPress: PropTypes.func.isRequired };
PressableIcon.defaultProps = {};

export default PressableIcon;
