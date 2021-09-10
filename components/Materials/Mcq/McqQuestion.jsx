import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';
import McqOption from './McqOption';

const McqQuestion = ({ question, questionIndex }) => {
  const { id, title, options, answerIndices } = question;
  const optionsJSX = options.map((option, index) => (
    <McqOption
      key={option}
      option={option}
      index={index}
      isAnswer={answerIndices.includes(index)}
    />
  ));
  return (
    <View>
      <EduText style={styles.title}>
        Q{questionIndex}: {title}
      </EduText>
      {optionsJSX}
    </View>
  );
};

McqQuestion.propTypes = {
  question: PropTypes.exact({
    id: PropTypes.number,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    answerIndices: PropTypes.arrayOf(PropTypes.number).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  questionIndex: PropTypes.number.isRequired,
};
McqQuestion.defaultProps = {};

export default McqQuestion;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
});
