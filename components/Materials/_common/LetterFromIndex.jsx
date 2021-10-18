import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import EduText from 'common/EduText';
import { LocalizationContext } from 'localization';

const LETTER_A_CODE = 65;
const ARABIC_LETTERS = 'أبجدهوزحطيكلمنسعفصقرشتثخذوضظغ';
const LetterFromIndex = ({ index, hasTrailingComma }) => {
  const { language } = useContext(LocalizationContext);

  if (language.substr(0, 2) === 'ar') {
    return (
      <EduText inheritColor style={styles.container}>
        {`${ARABIC_LETTERS[index]} ${hasTrailingComma ? ', ' : ''}`}
      </EduText>
    );
  }
  return (
    <EduText inheritColor>
      {`${String.fromCharCode(LETTER_A_CODE + index)} ${
        hasTrailingComma ? ', ' : ''
      }`}
    </EduText>
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 12,
    textAlignVertical: 'center',
    fontFamily: 'KawkabMono_700Bold',
  },
});

LetterFromIndex.propTypes = {
  index: PropTypes.number.isRequired,
  hasTrailingComma: PropTypes.bool,
};
LetterFromIndex.defaultProps = {
  hasTrailingComma: false,
};

export default LetterFromIndex;
