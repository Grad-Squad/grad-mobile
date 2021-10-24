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

export const mcqChoicePropType = PropTypes.exact({
  text: PropTypes.string.isRequired,
  isCorrect: PropTypes.bool.isRequired,
});
export const mcqQuestionPropType = PropTypes.exact({
  question: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(mcqChoicePropType.isRequired).isRequired,
});
export const contextMenuItemsPropType = PropTypes.arrayOf(
  PropTypes.oneOfType([
    PropTypes.exact({
      titleKey: PropTypes.string.isRequired,
      onPress: PropTypes.func.isRequired,
      iconName: PropTypes.string.isRequired,
    }).isRequired,
    PropTypes.exact({
      divider: PropTypes.bool.isRequired,
      key: PropTypes.string.isRequired,
    }).isRequired,
  ])
);
export const routeParamPropType = (paramsPropTypes) =>
  PropTypes.shape({
    params: paramsPropTypes,
  });
