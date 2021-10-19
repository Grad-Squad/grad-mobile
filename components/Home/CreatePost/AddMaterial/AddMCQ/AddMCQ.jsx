import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import Page from 'common/Page/Page';
import { useLocalization } from 'localization';
import * as yup from 'yup';
import { requiredError } from 'validation';
import { useFormik } from 'formik';
import { TransparentTextInputFormik } from 'common/Input';
import MaterialCreateHeader from 'common/MaterialHeader/MaterialCreateHeader';
import { navigationPropType, routeParamPropType } from 'proptypes';
import PropTypes from 'prop-types';
import ReducerActions from 'globalStore/ReducerActions';
import { useStore } from 'globalStore/GlobalStore';
import { deepCopy } from 'utility';
import AddQuestion from './AddQuestion';
import QuestionsList from './QuestionsList';

const AddMCQ = ({ navigation, route }) => {
  const editIndex = route?.params?.index;

  const { t } = useLocalization();
  const [currentlyEditingQuestion, setCurrentlyEditingQuestion] =
    useState(undefined);

  const [state, dispatch] = useStore();

  const editMCQ = state.createPost.materialList[editIndex];

  const formik = useFormik({
    initialValues: {
      title: editMCQ?.title ?? '',
      questions: editMCQ?.questions ? deepCopy(editMCQ?.questions) : [], // Deep Clone
    },
    onSubmit: (mcq) => {
      if (editIndex === undefined) {
        dispatch({ type: ReducerActions.addMCQ, payload: mcq });
      } else {
        dispatch({
          type: ReducerActions.editMCQ,
          payload: { index: editIndex, mcq },
        });
      }
      navigation.goBack();
    },
    validationSchema: yup.object().shape({
      title: yup
        .string()
        .trim()
        .max(100, t('TextInput/max char error'))
        .required(requiredError(t)),
      questions: yup
        .array()
        .min(1, t('AddMaterial/MCQ/errors/add at least one question')),
    }),
  });

  const deleteQuestion = (i) => {
    formik.values.questions.splice(i, 1);
    formik.setFieldValue('questions', formik.values.questions);
  };

  const attemptSubmit = () => {
    formik.setFieldTouched('questions', true);
    formik.handleSubmit();
  };

  return (
    <Page useSafeArea={false}>
      <MaterialCreateHeader
        title={t('AddMaterial/MCQ/Create MCQ')}
        rightButtonText={t('AddMaterial/Finish')}
        onPress={attemptSubmit}
        onBackPress={() => {
          Alert.alert('changes lost (if any)'); // ! WIP
          navigation.goBack();
        }}
      />
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
          error={formik.touched.questions && formik.errors.questions}
        />
      </ScrollView>
    </Page>
  );
};

AddMCQ.propTypes = {
  navigation: navigationPropType.isRequired,
  route: routeParamPropType(
    PropTypes.shape({ index: PropTypes.number.isRequired })
  ),
};
AddMCQ.defaultProps = { route: undefined };

export default AddMCQ;

const styles = StyleSheet.create({
  content: { width: '95%', alignSelf: 'center' },
});
