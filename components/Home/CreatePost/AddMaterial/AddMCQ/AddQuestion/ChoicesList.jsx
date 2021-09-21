import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { LocalizationContext } from 'localization';
import { mcqChoicePropType } from 'proptypes';
import EduText from 'common/EduText';
import SubmittedChoice from './SubmittedChoice';

const ChoicesList = ({ choices, setFormikChoiceField, onEditPress }) => {
  const { t } = useContext(LocalizationContext);
  return (
    choices.length !== 0 && (
      <>
        <EduText style={styles.correctQuestionMark}>
          {t('AddMaterial/MCQ/Correct?')}
        </EduText>
        {choices
          .slice()
          .reverse()
          .map(({ text, isCorrect }, index) => {
            const correctOrderIndex = choices.length - index - 1;
            return (
              <SubmittedChoice
                key={text}
                text={text}
                isCorrect={isCorrect}
                setIsCorrect={(newIsCorrect) =>
                  setFormikChoiceField(
                    `choices[${correctOrderIndex}].isCorrect`,
                    newIsCorrect
                  )
                }
                onEditPress={() => onEditPress(correctOrderIndex)}
              />
            );
          })}
      </>
    )
  );
};

ChoicesList.propTypes = {
  choices: PropTypes.arrayOf(mcqChoicePropType).isRequired,
  setFormikChoiceField: PropTypes.func.isRequired,
  onEditPress: PropTypes.func.isRequired,
};
ChoicesList.defaultProps = {};

export default ChoicesList;

const styles = StyleSheet.create({
  correctQuestionMark: { alignSelf: 'flex-end', marginBottom: 10 },
});
