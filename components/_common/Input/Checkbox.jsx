import React from 'react';
import PropTypes from 'prop-types';
import { Pressable } from 'react-native';
import pressableAndroidRipple from 'common/pressableAndroidRipple';
import { Icon } from 'common/Icon';
import { stylePropType } from 'proptypes';

const Checkbox = ({ checked, setChecked, style }) => (
  <Pressable
    android_ripple={pressableAndroidRipple}
    onPress={() => setChecked(!checked)}
    style={style}
  >
    <Icon name={checked ? 'check-square' : 'square'} />
  </Pressable>
);

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired,
  style: stylePropType,
};
Checkbox.defaultProps = { style: {} };

export default React.memo(Checkbox);
