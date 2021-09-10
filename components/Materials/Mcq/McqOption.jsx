import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';
import { Colors, Constants } from 'styles';

const LETTER_A_CODE = 65;
const McqOption = ({ option, index }) => {
  const [chosen, setChosen] = useState(false);
  const onPressOption = () => {
    setChosen((state) => !state);
  };
  return (
    <Pressable style={[styles.container]} onPress={onPressOption}>
      <EduText style={[styles.text, styles.letter, chosen && styles.chosen]}>
        {String.fromCharCode(LETTER_A_CODE + index)}
      </EduText>
      <View style={styles.separator} />
      <EduText style={[styles.text, styles.answer, chosen && styles.chosen]}>
        {option}
      </EduText>
    </Pressable>
  );
};

McqOption.propTypes = {
  option: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
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
});
