import PropTypes from 'prop-types';
import { Text, ViewPropTypes } from 'react-native';

export const childrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);
export const navigationPropType = PropTypes.shape({
  navigate: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
});
export const stylePropType = ViewPropTypes.style;
export const TextPropType = Text.propTypes.style;
