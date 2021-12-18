import React from 'react';
import PropTypes from 'prop-types';
import pressableAndroidRipple from 'common/pressableAndroidRipple';
import { PressableIcon } from 'common/Icon';
import { stylePropType } from 'proptypes';
import { IconNames } from 'common/Icon/Icon';

const Checkbox = ({ checked, setChecked, style, pressableProps, disabled }) => (
  <PressableIcon
    android_ripple={pressableAndroidRipple}
    onPress={() => setChecked(!checked)}
    style={style}
    name={checked ? IconNames.checkbox : IconNames.square}
    // eslint-disable-next-line react/jsx-props-no-spreading
    pressableProps={pressableProps}
    disabled={disabled}
  />
);

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired,
  style: stylePropType,
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  pressableProps: PropTypes.object,
};
Checkbox.defaultProps = { style: {}, pressableProps: {}, disabled: false };

export default React.memo(Checkbox);
