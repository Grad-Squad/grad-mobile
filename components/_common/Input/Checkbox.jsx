import React from 'react';
import PropTypes from 'prop-types';
import pressableAndroidRipple from 'common/pressableAndroidRipple';
import { PressableIcon } from 'common/Icon';
import { stylePropType } from 'proptypes';

const Checkbox = ({ checked, setChecked, style, pressableProps }) => (
  <PressableIcon
    android_ripple={pressableAndroidRipple}
    onPress={() => setChecked(!checked)}
    style={style}
    name={checked ? 'check-square' : 'square'}
    // eslint-disable-next-line react/jsx-props-no-spreading
    pressableProps={pressableProps}
  />
);

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired,
  style: stylePropType,
  // eslint-disable-next-line react/forbid-prop-types
  pressableProps: PropTypes.object,
};
Checkbox.defaultProps = { style: {}, pressableProps: {} };

export default React.memo(Checkbox);
