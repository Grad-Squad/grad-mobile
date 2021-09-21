import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import EduText from 'common/EduText';
import { LocalizationContext } from 'localization';

const LETTER_A_CODE = 65;
const ARABIC_LETTERS = 'أبجدهوزحطيكلمنسعفصقرشتثخذوضظغ';
const LetterFromIndex = ({ index }) => {
  const { language } = useContext(LocalizationContext);

  if (language.substr(0, 2) === 'ar') {
    return <EduText>{ARABIC_LETTERS[index]}</EduText>;
  }
  return <EduText>{String.fromCharCode(LETTER_A_CODE + index)}</EduText>;
};

LetterFromIndex.propTypes = {
  index: PropTypes.number.isRequired,
};
LetterFromIndex.defaultProps = {};

export default LetterFromIndex;
