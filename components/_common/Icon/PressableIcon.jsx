import React from 'react';
import PropTypes from 'prop-types';
import { Pressable } from 'react-native';
import pressableAndroidRipple from 'common/pressableAndroidRipple';
import { stylePropType } from 'proptypes';
import Icon from './Icon';

const PressableIcon = ({ onPress, style, ...rest }) => (
  <Pressable
    onPress={onPress}
    android_ripple={pressableAndroidRipple}
    style={style}
  >
    <Icon {...rest} />
  </Pressable>
);

PressableIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: stylePropType,
};
PressableIcon.defaultProps = { style: {} };

export default PressableIcon;
