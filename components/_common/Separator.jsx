import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Colors } from 'styles';
import { stylePropType } from 'proptypes';

const Separator = ({ style }) => <View style={[styles.separator, style]} />;

Separator.propTypes = {
  style: stylePropType,
};
Separator.defaultProps = { style: {} };

export default React.memo(Separator);

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    marginVertical: 10,
    height: 1.2,
    backgroundColor: Colors.separator,
  },
});
