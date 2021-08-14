import React from 'react';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import { Colors, Fonts } from '../../../styles';
import MemoBoundingCircle from './BoundingCircle';

const Logo = ({ style, hasBoundingCircle }) => (
  <View style={[styles.wrapper, style]}>
    <MemoBoundingCircle
      style={hasBoundingCircle && styles.boundingCircle}
      color={Colors.background}
    />
    <Text style={styles.text}>Educate</Text>
  </View>
);

export default Logo;

const styles = StyleSheet.create({
  wrapper: { alignSelf: 'center', zIndex: 10 },
  boundingCircle: {
    width: 100,
    height: 100,
    position: 'absolute',
    zIndex: -1,
    bottom: 0,
    alignSelf: 'center',
  },
  text: {
    fontSize: 32,
    color: Colors.accent,
    fontFamily: Fonts.Logo,
  },
});

Logo.propTypes = {
  hasBoundingCircle: PropTypes.bool,
  style: ViewPropTypes.style,
};
Logo.defaultProps = {
  hasBoundingCircle: false,
  style: {},
};
