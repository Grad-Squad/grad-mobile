import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import EduText from 'components/_common/EduText';
import { Constants } from 'styles';

const LETTER_A_CODE = 65;
const AnswerFeedbackText = ({ selectedIndices, answerIndices }) => (
  <>
    (
    <EduText style={{ paddingHorizontal: Constants.commonMargin }}>
      Selected answer(s):{' '}
      <EduText style={styles.selectedText}>
        {selectedIndices
          .map((index) => String.fromCharCode(LETTER_A_CODE + index))
          .join(', ')}
      </EduText>
    </EduText>
    ) (
    <EduText style={{ paddingHorizontal: Constants.commonMargin }}>
      The correct answer(s):{' '}
      <EduText style={styles.correctText}>
        {answerIndices
          .map((index) => String.fromCharCode(LETTER_A_CODE + index))
          .join(', ')}
      </EduText>
    </EduText>
    )
  </>
);

AnswerFeedbackText.propTypes = {
  selectedIndices: PropTypes.arrayOf(PropTypes.number).isRequired,
  answerIndices: PropTypes.arrayOf(PropTypes.number).isRequired,
};
AnswerFeedbackText.defaultProps = {};

export default AnswerFeedbackText;

const styles = StyleSheet.create({});
