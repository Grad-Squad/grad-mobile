import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';
import { Colors, Constants } from 'styles';
import LetterFromIndex from '../_common/LetterFromIndex';
import { useContext } from 'react';
import { LocalizationContext } from 'localization';

const McqOption = ({ option, index, disabled, isAnswer, onPress, chosen }) => {
  const isChosen = disabled && chosen;
  const isAnswerAndDisabled = disabled && isAnswer;
  const isAnsweredWrong = isChosen && !isAnswer;
  const ignoredChoice = disabled && !isAnswer && !chosen;

  const { isRTL } = useContext(LocalizationContext);

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
          isRTL ? styles.letterRTL : styles.letter,
          isChosen && styles.chosenDone,
          isAnswerAndDisabled &&
            !chosen &&
            (isRTL ? styles.letterNotChosenRTL : styles.letterNotChosen),
        ]}
      >
        <LetterFromIndex index={index} />
      </EduText>
      <View style={styles.separator} />
      <EduText
        text={option}
        style={[
          ...borderedTextStyles,
          isRTL ? styles.answerRTL : styles.answer,
          isAnswerAndDisabled &&
            !chosen &&
            (isRTL ? styles.answerNotChosenRTL : styles.answerNotChosen),
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

const answerNotChosenStyle = {
  backgroundColor: Colors.materialLightGood,
  borderStyle: 'dashed',
};

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
  letterRTL: {
    borderLeftWidth: 0,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  answer: {
    flex: 1,
    borderLeftWidth: 0,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  answerRTL: {
    flex: 1,
    borderRightWidth: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  chosen: {
    borderColor: Colors.accent,
  },
  correct: {
    borderColor: Colors.materialGood,
  },
  letterNotChosen: {
    ...answerNotChosenStyle,
    borderRightWidth: 3,
    marginLeft: -3.5,
    left: 3.5,
  },
  letterNotChosenRTL: {
    ...answerNotChosenStyle,
    borderLeftWidth: 3,
    marginRight: -3.5,
    // right: 3.5,
  },
  answerNotChosen: {
    ...answerNotChosenStyle,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 3,
    borderTopLeftRadius: 3,
    left: -3.5,
    marginRight: -3.5,
    zIndex: -1,
  },
  answerNotChosenRTL: {
    ...answerNotChosenStyle,
    borderRightWidth: 3,
    borderBottomRightRadius: 3,
    borderTopRightRadius: 3,
    // right: -3.5,
    marginLeft: -3.5,
    zIndex: -1,
  },
  wrong: {
    borderColor: Colors.materialWrong,
  },
  opacity: {
    opacity: 0.6,
    backgroundColor: Colors.cgrey,
    borderColor: Colors.cgrey,
  },
  chosenDone: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
    borderWidth: 0,
    marginHorizontal: 2,
    color: Colors.white,
  },
  fillGood: {
    backgroundColor: Colors.materialLightGood,
  },
  fillWrong: {
    backgroundColor: Colors.materialLightWrong,
  },
});
