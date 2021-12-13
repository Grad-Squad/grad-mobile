import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Dimensions, StyleSheet, View } from 'react-native';
import { useLocalization } from 'localization';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { maxCharError, requiredError } from 'validation';
import { TextInputFormik } from 'common/Input';
import { SecondaryActionButton, TransparentButton } from 'common/Input/Button';
import Separator from 'common/Separator';
import EduText from 'common/EduText';
import { Styles } from 'styles';
import { mcqQuestionAddPropType, stylePropType } from 'proptypes';
import ImageSelector from 'common/ImageSelector';
import fileUploadTypes from 'constants/fileUploadTypes';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import ChoicesList from './ChoicesList';
import QuestionImagePreview from './QuestionImagePreview';

const MaxNumberOfChoices = 26;
const MaxNumberOfQuestions = 1000;

const AddQuestion = ({
  addQuestion,
  contentStyle,
  questions,
  currentlyEditingQuestion,
  // incrementNumAddedImages,
  setDirty,
}) => {
  const { t } = useLocalization();
  const [image, setImage] = useState({});
  const [prevImage, setPrevImage] = useState({});

  const currentQuestionFormik = useFormik({
    initialValues: {
      question: '',
      // questionImage: {},
      choices: [],
    },
    onSubmit: (values) => {
      // currentQuestionFormik.setFieldValue('questionImage', image);
      addQuestion({ ...values, questionImage: image });
      if (currentlyEditingQuestion) {
        if (image.clientId !== null) {
          // todo delete image from s3 using key = prevImage.file.fileName
        }
      }
      currentQuestionFormik.resetForm({
        values: { question: '', choices: [] },
      });
      setImage({});
      setPrevImage({});
      currentChoiceFormik.resetForm();
    },
    validationSchema: yup.object().shape({
      question: yup
        .string()
        .trim()
        .max(400, t('TextInput/max char error', { max: 400 }))
        .test(
          'not already in questions',
          t('AddMaterial/MCQ/errors/(question already exists)'),
          (value) => questions.findIndex((item) => item.question === value)
        )
        .required(requiredError(t)),
      choices: yup
        .array()
        .min(1, t('AddMaterial/MCQ/errors/add at least one choice'))
        .test(
          'at least one choice should be an answer',
          t('AddMaterial/MCQ/errors/At least one choice should be correct'),
          (choices) => choices.findIndex((item) => item.isCorrect) !== -1
        )
        .required(requiredError(t)),
    }),
  });
  const currentChoiceFormik = useFormik({
    initialValues: {
      currentChoice: '',
    },
    onSubmit: ({ currentChoice }) => {
      currentQuestionFormik.values.choices.push({
        text: currentChoice,
        isCorrect: false,
      });
      currentQuestionFormik.setFieldValue(
        'choices',
        currentQuestionFormik.values.choices
      );
      currentChoiceFormik.resetForm();
    },
    validationSchema: yup.object().shape({
      currentChoice: yup
        .string()
        .trim()
        .test(
          'required if no other choices exist',
          requiredError(t),
          (value) => value || currentQuestionFormik.values.choices.length > 0
        )
        .test(
          'not already in choices',
          t('AddMaterial/MCQ/errors/(choice already exists)'),
          (value) =>
            currentQuestionFormik.values.choices.findIndex(
              (item) => item.text === value
            ) === -1
        )
        .max(400, maxCharError(t, 400)),
    }),
  });

  useEffect(() => {
    if (currentlyEditingQuestion) {
      currentQuestionFormik.setFieldValue(
        'question',
        currentlyEditingQuestion.question
      );
      currentQuestionFormik.setFieldValue(
        'choices',
        currentlyEditingQuestion.choices
      );
      if (currentlyEditingQuestion?.questionImage) {
        currentQuestionFormik.setFieldValue(
          'questionImage',
          currentlyEditingQuestion.questionImage
        );

        const { key, uri } = currentlyEditingQuestion.questionImage;
        setImage({
          file: { fileName: key, uri },
          clientId: null,
          fileType: fileUploadTypes.IMAGE,
        });
        setPrevImage({
          file: { fileName: key, uri },
          clientId: null,
          fileType: fileUploadTypes.IMAGE,
        });
      }

      currentChoiceFormik.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentlyEditingQuestion]);

  useEffect(() => {
    setDirty(currentQuestionFormik.dirty || currentChoiceFormik.dirty);
  }, [currentQuestionFormik.dirty, currentChoiceFormik.dirty, setDirty]);

  const canAddChoices =
    currentQuestionFormik.values.choices.length < MaxNumberOfChoices;
  const canAddQuestions = questions.length < MaxNumberOfQuestions;

  return (
    <>
      <View style={contentStyle}>
        <TextInputFormik
          formik={currentQuestionFormik}
          formikKey="question"
          title={t('AddMaterial/MCQ/Question')}
          multiline
          subtitle={
            canAddQuestions
              ? ''
              : t('AddMaterial/MCQ/errors/(maximum number of choices reached)')
          }
          TextInputProps={{
            editable: canAddQuestions,
          }}
          textInputRightComponent={
            <View style={styles.textInputRightComponent}>
              <ImageSelector
                setImage={(imgData) => {
                  setImage({
                    file: imgData,
                    clientId: uuidv4(),
                    fileType: fileUploadTypes.IMAGE,
                  });
                }}
                pressableProps={{
                  disabled: !canAddQuestions,
                }}
              />
            </View>
          }
          style={[styles.textInputGap, !canAddQuestions && styles.disabled]}
        />

        {!!image?.file?.fileName && (
          <QuestionImagePreview
            image={image}
            onDeletePress={() => {
              if (!currentlyEditingQuestion) {
                setImage({});
              }
            }}
          />
        )}
        <TextInputFormik
          formik={currentChoiceFormik}
          formikKey="currentChoice"
          title={t('AddMaterial/MCQ/Choice')}
          subtitle={
            canAddChoices
              ? ''
              : t('AddMaterial/MCQ/errors/(maximum number of choices reached)')
          }
          TextInputProps={{
            editable: canAddChoices && canAddQuestions,
          }}
          multiline
          textInputRightComponent={
            <TransparentButton
              text={t('AddMaterial/Add')}
              onPress={currentChoiceFormik.handleSubmit}
              style={styles.textInputRightComponent}
              disabled={!(canAddChoices && canAddQuestions)}
            />
          }
          style={[
            styles.textInputGap,
            !(canAddChoices && canAddQuestions) && styles.disabled,
          ]}
        />
      </View>
      <Separator />
      <View style={contentStyle}>
        {currentQuestionFormik.touched.choices &&
          currentQuestionFormik.errors.choices && (
            <EduText style={Styles.errorText}>
              {currentQuestionFormik.errors.choices}
            </EduText>
          )}

        <ChoicesList
          choices={currentQuestionFormik.values.choices}
          setFormikChoiceField={currentQuestionFormik.setFieldValue}
          onEditPress={(i) => {
            if (currentChoiceFormik.values.currentChoice) {
              Alert.alert('You will lose the text already in choice');
              return;
            }

            currentChoiceFormik.setFieldValue(
              'currentChoice',
              currentQuestionFormik.values.choices[i].text
            );

            currentQuestionFormik.values.choices.splice(i, 1);
            currentQuestionFormik.setFieldValue(
              'choices',
              currentQuestionFormik.values.choices
            );
          }}
        />
        <SecondaryActionButton
          text={t('AddMaterial/Add Question')}
          onPress={() => {
            console.log('sdfs');
            currentQuestionFormik.handleSubmit();
          }}
          style={[
            styles.addQuestion,
            !canAddQuestions && styles.disabled,
            questions.length === 0 && styles.emptyQuestions,
          ]}
          disabled={!canAddQuestions}
        />
      </View>
    </>
  );
};

AddQuestion.propTypes = {
  addQuestion: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(mcqQuestionAddPropType).isRequired,
  contentStyle: stylePropType,
  currentlyEditingQuestion: mcqQuestionAddPropType,
  setDirty: PropTypes.func.isRequired,
  // incrementNumAddedImages: PropTypes.func.isRequired,
};
AddQuestion.defaultProps = {
  contentStyle: {},
  currentlyEditingQuestion: undefined,
};

export default AddQuestion;

export const styles = StyleSheet.create({
  textInputGap: {
    marginTop: 10,
  },
  textInputRightComponent: { flexBasis: '18%', alignItems: 'center' },

  addQuestion: {
    width: 180,
    alignSelf: 'flex-end',
  },
  disabled: { opacity: 0.8 },
  emptyQuestions: {
    marginBottom: Dimensions.get('window').height * 0.1,
  },
});
