import React from 'react';
import PropTypes from 'prop-types';
import pressableAndroidRipple from 'common/pressableAndroidRipple';
import { PressableIcon } from 'common/Icon';
import { stylePropType } from 'proptypes';

const Checkbox = ({ checked, setChecked, style }) => (
  <PressableIcon
    android_ripple={pressableAndroidRipple}
    onPress={() => setChecked(!checked)}
    style={style}
    name={checked ? 'check-square' : 'square'}
  />
);

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired,
  style: stylePropType,
};
Checkbox.defaultProps = { style: {} };

export default React.memo(Checkbox);
