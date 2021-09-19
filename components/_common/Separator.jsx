import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Colors } from 'styles';

const Separator = () => <View style={styles.separator} />;

Separator.propTypes = {};
Separator.defaultProps = {};

export default React.memo(Separator);

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    marginVertical: 10,
    height: 1.2,
    backgroundColor: Colors.separator,
  },
});
