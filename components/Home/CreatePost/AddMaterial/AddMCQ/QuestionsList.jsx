import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { mcqQuestionAddPropType, stylePropType } from 'proptypes';
import Separator from 'common/Separator';
import EduText from 'common/EduText';
import { useLocalization } from 'localization';
import { Colors } from 'styles';
import SubmittedQuestion from './SubmittedQuestion';

const QuestionsList = ({
  questions,
  contentStyle,
  onEdit,
  error,
  onDelete,
}) => {
  const { t } = useLocalization();

  return error ? (
    <>
      <Separator />
      <View style={contentStyle}>
        <EduText style={styles.error}>{error}</EduText>
      </View>
    </>
  ) : (
    questions.length !== 0 && (
      <>
        <Separator />
        <View style={[contentStyle, styles.questionsList]}>
          <EduText style={styles.questionsNum}>
            {t('AddMaterial/Questions', {
              count: questions.length,
              number: questions.length,
            })}
          </EduText>

          {questions.map(({ question, choices }, index) => (
            <SubmittedQuestion
              key={question}
              question={question}
              numOfMCQ={choices.length}
              onEdit={() => onEdit(index)}
              onDelete={() => onDelete(index)}
            />
          ))}
        </View>
      </>
    )
  );
};

QuestionsList.propTypes = {
  questions: PropTypes.arrayOf(mcqQuestionAddPropType).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  contentStyle: stylePropType,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};
QuestionsList.defaultProps = {
  contentStyle: {},
  error: false,
};

export default QuestionsList;

const styles = StyleSheet.create({
  questionsNum: {
    alignSelf: 'flex-end',
  },
  questionsList: { marginBottom: 20 },
  error: {
    color: Colors.error,
  },
});
