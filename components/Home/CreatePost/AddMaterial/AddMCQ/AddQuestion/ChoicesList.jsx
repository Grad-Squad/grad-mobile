import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Alert, StyleSheet } from 'react-native';
import { LocalizationContext } from 'localization';
import { mcqChoicePropType } from 'proptypes';
import EduText from 'common/EduText';
import SubmittedChoice from './SubmittedChoice';

const ChoicesList = ({ choices, setFormikChoiceField }) => {
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
          .map(({ text, isCorrect }, index) => (
            <SubmittedChoice
              key={text}
              text={text}
              isCorrect={isCorrect}
              setIsCorrect={(newIsCorrect) =>
                setFormikChoiceField(
                  `choices[${index}].isCorrect`,
                  newIsCorrect
                )
              }
              onEditPress={() => Alert.alert('on edit press')}
            />
          ))}
      </>
    )
  );
};

ChoicesList.propTypes = {
  choices: PropTypes.arrayOf(mcqChoicePropType).isRequired,
  setFormikChoiceField: PropTypes.func.isRequired,
};
ChoicesList.defaultProps = {};

export default ChoicesList;

const styles = StyleSheet.create({
  correctQuestionMark: { alignSelf: 'flex-end', marginBottom: 10 },
});
