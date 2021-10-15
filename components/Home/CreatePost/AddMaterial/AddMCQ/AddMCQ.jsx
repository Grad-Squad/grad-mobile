import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Page from 'common/Page/Page';
import { LocalizationContext } from 'localization';
import * as yup from 'yup';
import { requiredError } from 'validation';
import { useFormik } from 'formik';
import { TransparentTextInputFormik } from 'common/Input';
import MaterialCreateHeader from 'common/MaterialHeader/MaterialCreateHeader';
import { navigationPropType, routeParamPropType } from 'proptypes';
import PropTypes from 'prop-types';
import ReducerActions from 'globalstore/ReducerActions';
import { useStore } from 'globalstore/GlobalStore';
import AddQuestion from './AddQuestion';
import QuestionsList from './QuestionsList';

const AddMCQ = ({ navigation, route }) => {
  const editIndex = route?.params?.index;

  const { t } = useContext(LocalizationContext);
  const [currentlyEditingQuestion, setCurrentlyEditingQuestion] =
    useState(undefined);

  const [state, dispatch] = useStore();

  const editMCQ = state.createPost.materialList[editIndex];

  const formik = useFormik({
    initialValues: {
      title: editMCQ?.title ?? '',
      questions: editMCQ?.questions
        ? JSON.parse(JSON.stringify(editMCQ?.questions))
        : [], // Deep Clone
    },
    onSubmit: (mcq) => {
      dispatch({ type: ReducerActions.addMCQ, payload: mcq });
      navigation.goBack();
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
    <Page useSafeArea={false}>
      <MaterialCreateHeader
        title={t('AddMaterial/MCQ/Create MCQ')}
        rightButtonText={t('AddMaterial/Finish')}
        onPress={formik.handleSubmit}
        onBackPress={() => navigation.goBack()}
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
