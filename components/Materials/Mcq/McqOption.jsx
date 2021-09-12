import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import EduText from 'common/EduText';
import { Colors, Constants } from 'styles';

const LETTER_A_CODE = 65;
const McqOption = ({
  option,
  index,
  disabled,
  isAnswer,
  handleChoiceSelection,
  handleChoiceUnSelection,
  hasOneAnswer,
  selectedChoiceIndex,
}) => {
  const [chosen, setChosen] = useState(false);
  useEffect(() => {
    if (hasOneAnswer) {
      setChosen(selectedChoiceIndex === index);
    }
  }, [selectedChoiceIndex, hasOneAnswer]);
  const onPressOption = () => {
    if (!disabled) {
      if (!chosen) {
        handleChoiceSelection(index);
      } else {
        handleChoiceUnSelection(index);
      }
      setChosen((state) => !state);
    }
  };

  const isChosen = disabled && chosen;
  const isAnswerAndDisabled = disabled && isAnswer;
  const isAnsweredWrong = isChosen && !isAnswer;
  const ignoredChoice = disabled && !isAnswer && !chosen;

  const BorderedText = ({ text, style }) => (
    <EduText
      style={[
        styles.text,
        chosen && styles.chosen,

        isAnswerAndDisabled && styles.correct,
        // isAnswerAndDisabled && styles.fillGood,
        // isAnswerAndDisabled && chosen && styles.correct,
        isAnsweredWrong && styles.wrong,
        ignoredChoice && styles.opacity,

        style,
      ]}
    >
      {text}
    </EduText>
  );

  BorderedText.propTypes = {
    text: PropTypes.string.isRequired,
    style: Text.propTypes.style.isRequired,
  };

  return (
    <Pressable style={[styles.container]} onPress={onPressOption}>
      <BorderedText
        text={String.fromCharCode(LETTER_A_CODE + index)}
        style={[styles.letter, isChosen && styles.chosenDone]}
      />
      <View style={styles.separator} />
      <BorderedText
        text={option}
        style={[
          styles.answer,
          isAnswerAndDisabled && chosen && styles.fillGood,
          isAnsweredWrong && styles.fillWrong,
          // isAnswerAndDisabled && !chosen && styles.test,
        ]}
      />
    </Pressable>
  );
};

McqOption.propTypes = {
  option: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  isAnswer: PropTypes.bool.isRequired,
  handleChoiceSelection: PropTypes.func.isRequired,
  handleChoiceUnSelection: PropTypes.func.isRequired,
  hasOneAnswer: PropTypes.bool.isRequired,
  selectedChoiceIndex: PropTypes.number,
};

McqOption.defaultProps = {
  selectedChoiceIndex: -1,
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
