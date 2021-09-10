import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';

const McqQuestion = ({ question }) => {
  const { id, title, options, answers } = question;
  let optionsJSX = options.map((option) => (
    <EduText key={option}>{option}</EduText>
  ));
  return (
    <View>
      <EduText>{title}</EduText>
      {optionsJSX}
    </View>
  );
};

McqQuestion.propTypes = {};
McqQuestion.defaultProps = {};

export default McqQuestion;

const styles = StyleSheet.create({});
