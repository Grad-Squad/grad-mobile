import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, StyleSheet, View } from 'react-native';
import { LocalizationContext } from 'localization';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { requiredError } from 'validation';
import { TextInputFormik } from 'common/Input';
import PressableText from 'common/PressableText';
import { SecondaryActionButton, TransparentButton } from 'common/Input/Button';
import Separator from 'common/Separator';
import EduText from 'common/EduText';
import { Colors } from 'styles';
import { mcqQuestionPropType, stylePropType } from 'proptypes';
import ImageSelector from 'common/ImageSelector';
import ChoicesList from './ChoicesList';

const MaxNumberOfChoices = 26;
const MaxNumberOfQuestions = 1000;

const AddQuestion = ({
  addQuestion,
  contentStyle,
  questions,
  currentlyEditingQuestion,
}) => {
  const { t } = useContext(LocalizationContext);
  const [image, setImage] = useState({});
  const currentQuestionFormik = useFormik({
    initialValues: {
      question: '',
      choices: [],
    },
    onSubmit: (values) => {
      addQuestion(values);
      currentQuestionFormik.resetForm({
        values: { question: '', choices: [] },
      });
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
        .max(400, t('TextInput/max char error', { max: 400 })),
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
      currentChoiceFormik.resetForm();
    }
  }, [currentlyEditingQuestion]);

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
                setImage={setImage}
                pressableProps={{
                  disabled: !canAddQuestions,
                }}
              />
            </View>
          }
          style={[styles.textInputGap, !canAddQuestions && styles.disabled]}
        />
        {!!image.fileName && (
          <PressableText
            onPress={() => Alert.alert('Image name click')}
            pressableProps={{
              style: [styles.uploadedFileName, styles.textInputGap],
            }}
          >
            {t('AddMaterial/image name: ')}
            {image.fileName}
          </PressableText>
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
            <EduText style={styles.choicesError}>
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
          onPress={currentQuestionFormik.handleSubmit}
          style={[styles.addQuestion, !canAddQuestions && styles.disabled]}
          disabled={!canAddQuestions}
        />
      </View>
    </>
  );
};

AddQuestion.propTypes = {
  addQuestion: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(mcqQuestionPropType).isRequired,
  contentStyle: stylePropType,
  currentlyEditingQuestion: mcqQuestionPropType,
};
AddQuestion.defaultProps = {
  contentStyle: {},
  currentlyEditingQuestion: undefined,
};

export default AddQuestion;

const styles = StyleSheet.create({
  textInputGap: {
    marginTop: 10,
  },
  textInputRightComponent: { flexBasis: '18%', alignItems: 'center' },
  uploadedFileName: {
    borderBottomColor: Colors.accent,
    borderBottomWidth: 1,

    marginTop: 4,

    alignSelf: 'flex-start',
  },
  addQuestion: {
    width: 180,
    alignSelf: 'flex-end',
  },
  choicesError: {
    color: Colors.error,
  },
  disabled: { opacity: 0.8 },
});
