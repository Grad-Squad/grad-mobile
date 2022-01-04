import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { flashcardAddPropType, stylePropType } from 'proptypes';
import Separator from 'common/Separator';
import EduText from 'common/EduText';
import { useLocalization } from 'localization';
import { Styles } from 'styles';
import SubmittedFlashcard from './SubmittedFlashcard';

const FlashcardsList = ({
  flashcards,
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
        <EduText style={Styles.errorText}>{error}</EduText>
      </View>
    </>
  ) : (
    flashcards.length !== 0 && (
      <>
        <Separator />
        <View style={[contentStyle, styles.FlashcardsList]}>
          <EduText style={styles.questionsNum}>
            {t('AddMaterial/Cards', {
              count: flashcards.length,
              number: flashcards.length,
            })}
          </EduText>

          {flashcards.map((flashcard, index) => (
            <SubmittedFlashcard
              key={flashcard.frontText + flashcard?.frontImage?.file?.fileName}
              flashcard={flashcard}
              onEdit={() => onEdit(index)}
              onDelete={() => onDelete(index)}
            />
          ))}
        </View>
      </>
    )
  );
};

FlashcardsList.propTypes = {
  flashcards: PropTypes.arrayOf(flashcardAddPropType).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  contentStyle: stylePropType,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};
FlashcardsList.defaultProps = {
  contentStyle: {},
  error: false,
};

export default FlashcardsList;

const styles = StyleSheet.create({
  questionsNum: {
    alignSelf: 'flex-end',
  },
  FlashcardsList: { marginBottom: 20 },
});
