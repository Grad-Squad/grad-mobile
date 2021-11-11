import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { childrenPropType } from 'proptypes';

const SlidableHOC = ({ canSlide, onBad, onGood, children }) => {
  return <View style={styles.wrapper}>{children}</View>;
};

SlidableHOC.propTypes = {
  onGood: PropTypes.func.isRequired,
  onBad: PropTypes.func.isRequired,
  canSlide: PropTypes.bool.isRequired,
  children: childrenPropType.isRequired,
};
SlidableHOC.defaultProps = {};

export default SlidableHOC;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
