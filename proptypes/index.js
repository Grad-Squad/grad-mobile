import PropTypes from 'prop-types';

export const childrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);
export const navigationPropType = PropTypes.shape({
  navigate: PropTypes.func.isRequired,
});
