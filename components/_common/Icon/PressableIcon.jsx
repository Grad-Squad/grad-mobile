import React from 'react';
import PropTypes from 'prop-types';
import { Pressable } from 'react-native';
import pressableAndroidRipple from 'common/pressableAndroidRipple';
import Icon from './Icon';

const PressableIcon = ({ onPress, ...rest }) => (
  <Pressable onPress={onPress} android_ripple={pressableAndroidRipple}>
    <Icon {...rest} />
  </Pressable>
);

PressableIcon.propTypes = { onPress: PropTypes.func.isRequired };
PressableIcon.defaultProps = {};

export default PressableIcon;
