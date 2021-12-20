import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useLocalization } from 'localization';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { maxCharError } from 'validation';
import { TextInputFormik } from 'common/Input';
import { SecondaryActionButton } from 'common/Input/Button';
import Separator from 'common/Separator';
import EduText from 'common/EduText';
import { Constants, Styles } from 'styles';
import { flashcardAddPropType, stylePropType } from 'proptypes';
import ImageSelector from 'common/ImageSelector';
import fileUploadTypes from 'constants/fileUploadTypes';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { addToDeletedUris } from 'globalStore/createPostSlice';
import { useDispatch } from 'react-redux';
// todo
import QuestionImagePreview from '../AddMCQ/AddQuestion/QuestionImagePreview';

const MaxNumberOfFlashcards = 1000;
const isObjectEmpty = (ob) => Object.keys(ob).length === 0;

const AddFlashcard = ({
  AddFlashcardToCollection,
  contentStyle,
  flashcards,
  currentlyEditingFlashcard,
  setDirty,
}) => {
  const { t } = useLocalization();
  const dispatch = useDispatch();

  const currentFlashcardFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      frontText: currentlyEditingFlashcard?.frontText ?? '',
      backText: currentlyEditingFlashcard?.backText ?? '',
      frontImage: currentlyEditingFlashcard?.frontImage ?? {},
      backImage: currentlyEditingFlashcard?.backImage ?? {},
    },
    onSubmit: (values) => {
      const newFlashcard = {
        frontText: values.frontText,
        backText: values.backText,
        prevFrontImageUri: currentlyEditingFlashcard?.prevFrontImageUri,
        prevBackImageUri: currentlyEditingFlashcard?.prevBackImageUri,
      };
      if (!isObjectEmpty(values.frontImage)) {
        newFlashcard.frontImage = values.frontImage;
      }
      if (!isObjectEmpty(values.backImage)) {
        newFlashcard.backImage = values.backImage;
      }

      AddFlashcardToCollection(newFlashcard);
      if (currentlyEditingFlashcard) {
        const isFrontImageReplacedOrRemoved =
          isObjectEmpty(values.frontImage) ||
          values.frontImage.clientId !== null;
        if (
          isFrontImageReplacedOrRemoved &&
          currentlyEditingFlashcard?.prevFrontImageUri
        ) {
          dispatch(
            addToDeletedUris(currentlyEditingFlashcard?.prevFrontImageUri?.key)
          );
        }

        const isBackImageReplacedOrRemoved =
          isObjectEmpty(values.backImage) || values.backImage.clientId !== null;
        if (
          isBackImageReplacedOrRemoved &&
          currentlyEditingFlashcard?.prevBackImageUri
        ) {
          dispatch(
            addToDeletedUris(currentlyEditingFlashcard?.prevBackImageUri?.key)
          );
        }
      }
      currentFlashcardFormik.resetForm({
        values: {
          frontText: '',
          backText: '',
          frontImage: {},
          backImage: {},
        },
      });
    },
    validationSchema: yup.object().shape(
      {
        frontText: yup
          .string()
          .trim()
          .max(400, maxCharError(t, 400))
          .when('frontImage', {
            is: (frontImage) => !frontImage || isObjectEmpty(frontImage),
            then: yup
              .string()
              .required(
                t('InputValidationError/field required. add text or an image')
              ),
          }),
        frontImage: yup.object().shape({}),
        backText: yup
          .string()
          .trim()
          .max(400, maxCharError(t, 400))
          .when('backImage', {
            is: (backImage) => !backImage || isObjectEmpty(backImage),
            then: yup
              .string()
              .required(
                t('InputValidationError/field required. add text or an image')
              ),
          }),
        backImage: yup.object().shape({}),
        // todo hambaca
      },
      [
        ['frontText', 'frontImage'],
        ['backText', 'backImage'],
      ]
    ),
  });

  useEffect(() => {
    setDirty(currentFlashcardFormik.dirty);
  }, [currentFlashcardFormik.dirty, setDirty]);

  const canAddFlashcards = flashcards.length < MaxNumberOfFlashcards;

  return (
    <>
      <View style={contentStyle}>
        <TextInputFormik
          formik={currentFlashcardFormik}
          formikKey="frontText"
          title={t('AddMaterial/Flashcards/Front')}
          multiline
          subtitle={
            canAddFlashcards
              ? ''
              : t(
                  'AddMaterial/Flashcard/errors/(maximum number of flashcards reached)'
                )
          }
          TextInputProps={{
            editable: canAddFlashcards,
          }}
          textInputRightComponent={
            <View style={styles.textInputRightComponent}>
              <ImageSelector
                setImage={(imgData) => {
                  currentFlashcardFormik.setFieldValue('frontImage', {
                    file: imgData,
                    clientId: uuidv4(),
                    fileType: fileUploadTypes.IMAGE,
                  });
                }}
                pressableProps={{
                  disabled: !canAddFlashcards,
                }}
              />
            </View>
          }
          style={[styles.textInputGap, !canAddFlashcards && styles.disabled]}
        />

        {!!currentFlashcardFormik.values.frontImage?.file && (
          <QuestionImagePreview
            image={currentFlashcardFormik.values.frontImage}
            onDeletePress={() => {
              currentFlashcardFormik.setFieldValue('frontImage', {});
            }}
          />
        )}
        <TextInputFormik
          formik={currentFlashcardFormik}
          formikKey="backText"
          title={t('AddMaterial/Flashcards/Back')}
          multiline
          subtitle={
            canAddFlashcards
              ? ''
              : t('AddMaterial/MCQ/errors/(maximum number of choices reached)')
          }
          TextInputProps={{
            editable: canAddFlashcards,
          }}
          textInputRightComponent={
            <View style={styles.textInputRightComponent}>
              <ImageSelector
                setImage={(imgData) => {
                  currentFlashcardFormik.setFieldValue('backImage', {
                    file: imgData,
                    clientId: uuidv4(),
                    fileType: fileUploadTypes.IMAGE,
                  });
                }}
                pressableProps={{
                  disabled: !canAddFlashcards,
                }}
              />
            </View>
          }
          style={[styles.textInputGap, !canAddFlashcards && styles.disabled]}
        />

        {!!currentFlashcardFormik.values.backImage?.file && (
          <QuestionImagePreview
            image={currentFlashcardFormik.values.backImage}
            onDeletePress={() => {
              currentFlashcardFormik.setFieldValue('backImage', {});
            }}
          />
        )}
      </View>
      <Separator />
      <View style={contentStyle}>
        {currentFlashcardFormik.touched.choices &&
          currentFlashcardFormik.errors.choices && (
            <EduText style={Styles.errorText}>
              {currentFlashcardFormik.errors.choices}
            </EduText>
          )}

        <SecondaryActionButton
          text={t('AddMaterial/Add Flashcard')}
          onPress={() => {
            currentFlashcardFormik.handleSubmit();
          }}
          style={[
            styles.AddFlashcard,
            !canAddFlashcards && styles.disabled,
            flashcards.length === 0 && styles.emptyFlashcards,
          ]}
          disabled={!canAddFlashcards}
        />
      </View>
    </>
  );
};

AddFlashcard.propTypes = {
  AddFlashcardToCollection: PropTypes.func.isRequired,
  flashcards: PropTypes.arrayOf(flashcardAddPropType).isRequired,
  contentStyle: stylePropType,
  currentlyEditingFlashcard: flashcardAddPropType,
  setDirty: PropTypes.func.isRequired,
};
AddFlashcard.defaultProps = {
  contentStyle: {},
  currentlyEditingFlashcard: undefined,
};

export default AddFlashcard;

export const styles = StyleSheet.create({
  textInputGap: {
    marginTop: 10,
  },
  textInputRightComponent: {
    flexBasis: '18%',
    alignItems: 'center',
    marginLeft: Constants.commonMargin / 2,
  },

  AddFlashcard: {
    width: 180,
    alignSelf: 'flex-end',
  },
  disabled: { opacity: 0.8 },
  emptyFlashcards: {
    marginBottom: Dimensions.get('window').height * 0.1,
  },
});
