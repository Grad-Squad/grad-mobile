import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';

const McqOption = ({ option }) => {
  return (
    <View>
      <EduText>{option}</EduText>
    </View>
  );
};

McqOption.propTypes = {};
McqOption.defaultProps = {};

export default McqOption;

const styles = StyleSheet.create({});
