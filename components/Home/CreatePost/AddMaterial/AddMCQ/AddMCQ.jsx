import React, { useContext, useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import EduText from 'common/EduText';
import Page from 'common/Page/Page';
import { LocalizationContext } from 'localization';
import * as yup from 'yup';
import { requiredError } from 'validation';
import { useFormik } from 'formik';
import { TransparentTextInputFormik } from 'common/Input';
import AddQuestion from './AddQuestion';
import QuestionsList from './QuestionsList';

const AddMCQ = () => {
  const { t } = useContext(LocalizationContext);
  const [currentlyEditingQuestion, setCurrentlyEditingQuestion] =
    useState(undefined);

  const formik = useFormik({
    initialValues: {
      title: '',
      questions: [],
    },
    onSubmit: ({ title }) => {
      Alert.alert(`main formik: ${title}`);
    },
    validationSchema: yup.object().shape({
      title: yup
        .string()
        .trim()
        .max(100, t('TextInput/max char error'))
        .required(requiredError(t)),
    }),
  });

  const deleteQuestion = (i) => {
    formik.values.questions.splice(i, 1);
    formik.setFieldValue('questions', formik.values.questions);
  };

  return (
    <Page>
      <EduText>INSERT HEADER HERE</EduText>
      <TransparentTextInputFormik
        title={t('AddMaterial/MCQ/Exercise Title')}
        formik={formik}
        formikKey="title"
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        <AddQuestion
          addQuestion={(question) => {
            formik.values.questions.push(question);
            return formik.setFieldValue('questions', formik.values.questions);
          }}
          questions={formik.values.questions}
          contentStyle={styles.content}
          currentlyEditingQuestion={currentlyEditingQuestion}
        />
        <QuestionsList
          questions={formik.values.questions}
          contentStyle={styles.content}
          onEdit={(i) => {
            setCurrentlyEditingQuestion(formik.values.questions[i]);
            deleteQuestion(i);
          }}
          onDelete={deleteQuestion}
        />
      </ScrollView>
    </Page>
  );
};

AddMCQ.propTypes = {};
AddMCQ.defaultProps = {};

export default AddMCQ;

const styles = StyleSheet.create({
  content: { width: '95%', alignSelf: 'center' },
});
