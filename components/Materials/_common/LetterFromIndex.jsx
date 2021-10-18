import React from 'react';
import PropTypes from 'prop-types';
import EduText from 'common/EduText';
import { useLocalization } from 'localization';

const LETTER_A_CODE = 65;
const ARABIC_LETTERS = 'أبجدهوزحطيكلمنسعفصقرشتثخذوضظغ';
const LetterFromIndex = ({ index, hasTrailingComma }) => {
  const { language } = useLocalization();

  if (language.substr(0, 2) === 'ar') {
    return (
      <EduText inheritColor>
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

LetterFromIndex.propTypes = {
  index: PropTypes.number.isRequired,
  hasTrailingComma: PropTypes.bool,
};
LetterFromIndex.defaultProps = {
  hasTrailingComma: false,
};

export default LetterFromIndex;
