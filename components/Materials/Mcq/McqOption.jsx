import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import EduText from 'common/EduText';
import { Colors, Constants } from 'styles';

const LETTER_A_CODE = 65;
const McqOption = ({ option, index, disabled, isAnswer }) => {
  const [chosen, setChosen] = useState(false);
  const onPressOption = () => {
    if (!disabled) {
      setChosen((state) => !state);
    }
  };

  const BorderedText = ({ text, style }) => (
    <EduText
      style={[
        styles.text,
        chosen && styles.chosen,
        disabled && chosen && isAnswer && styles.correct,
        disabled && chosen && !isAnswer && styles.wrong,
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
        style={styles.letter}
      />
      <View style={styles.separator} />
      <BorderedText text={option} style={styles.answer} />
    </Pressable>
  );
};

McqOption.propTypes = {
  option: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  isAnswer: PropTypes.bool.isRequired,
};

McqOption.defaultProps = {};

export default McqOption;

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
    borderColor: Colors.materialGood,
  },
  wrong: {
    borderColor: Colors.materialWrong,
  },
});
