import PropTypes from 'prop-types';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

const TransparentButton = ({ text, onPress }) => (
  <Pressable onPress={onPress} style={styles.button}>
    <Text style={styles.text}>{text}</Text>
  </Pressable>
);

export default TransparentButton;

const styles = StyleSheet.create({
  button: {
    padding: 5,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Lato_300Light',
    fontSize: 17,
  },
});

TransparentButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};
