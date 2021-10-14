import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import EduText from 'components/_common/EduText';
import { Colors, Constants } from 'styles';
import { LocalizationContext } from 'localization';
import LetterFromIndex from '../_common/LetterFromIndex';

const AnswerFeedbackText = ({ selectedIndices, answerIndices }) => {
  const { t } = useContext(LocalizationContext);

  return (
    <>
      <EduText style={{ paddingHorizontal: Constants.commonMargin }}>
        {t('Mcq/selectedAnswers')}
        <EduText style={styles.selectedText}>
          {selectedIndices.map((letterIndex, index) => (
            <LetterFromIndex
              key={letterIndex}
              index={letterIndex}
              hasTrailingComma={index < selectedIndices.length - 1}
            />
          ))}
        </EduText>
      </EduText>

      <EduText style={{ paddingHorizontal: Constants.commonMargin }}>
        {t('Mcq/correctAnswers')}
        <EduText style={styles.correctText}>
          {answerIndices.map((letterIndex, index) => (
            <LetterFromIndex
              key={letterIndex}
              index={letterIndex}
              hasTrailingComma={index < answerIndices.length - 1}
            />
          ))}
        </EduText>
      </EduText>
    </>
  );
};

AnswerFeedbackText.propTypes = {
  selectedIndices: PropTypes.arrayOf(PropTypes.number).isRequired,
  answerIndices: PropTypes.arrayOf(PropTypes.number).isRequired,
};
AnswerFeedbackText.defaultProps = {};

export default AnswerFeedbackText;

const styles = StyleSheet.create({
  correctText: {
    color: Colors.materialGood,
  },
  selectedText: {
    color: Colors.accent,
  },
});
