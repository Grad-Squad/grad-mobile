import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Colors, Fonts } from '../../../styles';

const Logo = () => <Text style={styles.text}>Educate</Text>;

export default Logo;

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    color: Colors.accent,
    fontFamily: Fonts.Logo,
  },
});
