import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';
import { Colors, Constants } from 'styles';

const LETTER_A_CODE = 65;
const McqOption = ({ option, index, disabled, isAnswer, onPress, chosen }) => {
  const isChosen = disabled && chosen;
  const isAnswerAndDisabled = disabled && isAnswer;
  const isAnsweredWrong = isChosen && !isAnswer;
  const ignoredChoice = disabled && !isAnswer && !chosen;

  const borderedTextStyles = [
    styles.text,
    chosen && styles.chosen,

    isAnswerAndDisabled && styles.correct,
    isAnsweredWrong && styles.wrong,
    ignoredChoice && styles.opacity,
  ];

  return (
    <Pressable style={[styles.container]} onPress={onPress}>
      <EduText
        style={[
          ...borderedTextStyles,
          styles.letter,
          isChosen && styles.chosenDone,
        ]}
      >
        {String.fromCharCode(LETTER_A_CODE + index)}
      </EduText>
      <View style={styles.separator} />
      <EduText
        text={option}
        style={[
          ...borderedTextStyles,
          styles.answer,
          isAnswerAndDisabled && chosen && styles.fillGood,
          isAnsweredWrong && styles.fillWrong,
          // isAnswerAndDisabled && !chosen && styles.test,
        ]}
      >
        {option}
      </EduText>
    </Pressable>
  );
};

McqOption.propTypes = {
  option: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  isAnswer: PropTypes.bool.isRequired,
  chosen: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default McqOption;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.foreground,
    marginBottom: Constants.commonMargin * 0.6,
    flexDirection: 'row',
    borderRadius: Constants.borderRadius,
  },
  text: {
    paddingHorizontal: Constants.commonMargin * 0.8,
    paddingVertical: Constants.commonMargin * 0.6,
    fontSize: 18,
    borderRadius: Constants.borderRadius,
    borderWidth: 3,
    borderColor: Colors.foreground,
  },
  separator: {
    backgroundColor: Colors.background,
    width: 4,
  },
  letter: {
    borderRightWidth: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  answer: {
    flex: 1,
    borderLeftWidth: 0,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  chosen: {
    borderColor: Colors.accent,
  },
  correct: {
    // flex: 1,
    borderColor: Colors.materialGood,
  },
  // test: {
  //   flex: 0.3,
  //   borderWidth: 2,
  //   borderRadius: 2,
  //   borderBottomLeftRadius: 2,
  //   borderTopLeftRadius: 2,
  //   borderLeftWidth: 0,
  //   borderColor: Colors.materialGood,
  //   borderStyle: 'dashed',
  // },
  wrong: {
    borderColor: Colors.materialWrong,
  },
  opacity: {
    opacity: 0.6,
    backgroundColor: '#CCCCCC',
    borderColor: '#CCCCCC',
  },

  chosenDone: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
    borderWidth: 0,
    marginHorizontal: 2,
    color: 'white',
  },

  fillGood: {
    backgroundColor: '#d4f7d5',
    // color: 'white',
  },

  fillWrong: {
    backgroundColor: '#f6d5d5',
    // color: 'white',
  },
});
