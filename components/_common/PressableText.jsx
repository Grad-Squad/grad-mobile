import React from 'react';
import { Pressable } from 'react-native';
import PropTypes from 'prop-types';
import { childrenPropType } from 'proptypes';
import EduText from './EduText';
import pressableAndroidRipple from './pressableAndroidRipple';

const PressableText = ({ children, onPress, pressableProps, ...props }) => (
  <Pressable
    android_ripple={pressableAndroidRipple}
    onPress={onPress}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...pressableProps}
  >
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <EduText {...props}>{children}</EduText>
  </Pressable>
);

PressableText.propTypes = {
  children: childrenPropType.isRequired,
  onPress: PropTypes.func.isRequired,
  pressableProps: PropTypes.any,
};
PressableText.defaultProps = { pressableProps: {} };

export default PressableText;
