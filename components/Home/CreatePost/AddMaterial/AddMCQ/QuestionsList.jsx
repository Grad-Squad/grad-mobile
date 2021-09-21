import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { mcqQuestionPropType, stylePropType } from 'proptypes';
import Separator from 'common/Separator';
import EduText from 'common/EduText';
import { LocalizationContext } from 'localization';
import SubmittedQuestion from './SubmittedQuestion';

const QuestionsList = ({ questions, contentStyle, onEdit, onDelete }) => {
  const { t } = useContext(LocalizationContext);
  return (
    questions.length !== 0 && (
      <>
        <Separator />
        <View style={[contentStyle, styles.questionsList]}>
          <EduText style={styles.questionsNum}>
            {questions.length} {t('AddMaterial/Questions')}
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
  questions: PropTypes.arrayOf(mcqQuestionPropType).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  contentStyle: stylePropType,
};
QuestionsList.defaultProps = {
  contentStyle: {},
};

export default QuestionsList;

const styles = StyleSheet.create({
  questionsNum: {
    alignSelf: 'flex-end',
  },
  questionsList: { marginBottom: 20 },
});
