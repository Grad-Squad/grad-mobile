import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native-paper';
import { Colors } from 'styles';
import { StyleSheet } from 'react-native';
import { stylePropType } from 'proptypes';

const LoadingIndicator = ({ fullScreen, style, ...props }) => (
  <ActivityIndicator
    color={Colors.accent}
    style={[styles.fullScreen, style]}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
);

LoadingIndicator.propTypes = {
  fullScreen: PropTypes.bool,
  style: stylePropType,
};
LoadingIndicator.defaultProps = {
  fullScreen: false,
  style: {},
};

export default React.memo(LoadingIndicator);

const styles = StyleSheet.create({ fullScreen: { flex: 1 } });
