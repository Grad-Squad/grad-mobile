import React from 'react';
import PropTypes from 'prop-types';
import { Pressable } from 'react-native';
import pressableAndroidRipple from 'common/pressableAndroidRipple';
import { stylePropType } from 'proptypes';
import Icon from './Icon';

const PressableIcon = ({ onPress, style, pressableProps, ...rest }) => (
  <Pressable
    onPress={onPress}
    android_ripple={pressableAndroidRipple}
    style={style}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...pressableProps}
  >
    <Icon {...rest} />
  </Pressable>
);

PressableIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: stylePropType,
  // eslint-disable-next-line react/forbid-prop-types
  pressableProps: PropTypes.object,
};
PressableIcon.defaultProps = {
  style: {},
  pressableProps: {},
};

export default PressableIcon;
