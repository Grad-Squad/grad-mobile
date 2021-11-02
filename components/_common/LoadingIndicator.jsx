import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native-paper';
import { Colors } from 'styles';
import { StyleSheet } from 'react-native';
import { stylePropType } from 'proptypes';

const LoadingIndicator = ({ fullScreen, style, large, ...props }) => (
  <ActivityIndicator
    color={Colors.accent}
    style={[fullScreen && styles.fullScreen, style]}
    size={large ? 'large' : 'small'}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
);

LoadingIndicator.propTypes = {
  fullScreen: PropTypes.bool,
  style: stylePropType,
  large: PropTypes.bool,
};
LoadingIndicator.defaultProps = {
  fullScreen: false,
  style: {},
  large: false,
};

export default React.memo(LoadingIndicator);

const styles = StyleSheet.create({ fullScreen: { flex: 1 } });
