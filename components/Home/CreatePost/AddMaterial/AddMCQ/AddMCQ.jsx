import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Page from 'common/Page/Page';
import { useLocalization } from 'localization';
import * as yup from 'yup';
import { materialTitle } from 'validation';
import { useFormik } from 'formik';
import { TransparentTextInputFormik } from 'common/Input';
import MaterialCreateHeader from 'common/MaterialHeader/MaterialCreateHeader';
import { navigationPropType, routeParamPropType } from 'proptypes';
import PropTypes from 'prop-types';
import { deepCompare, deepCopy } from 'utility';
import useOnGoBackDiscardWarning from 'navigation/useOnGoBackDiscardWarning';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCreateMaterialItem,
  replaceCreateMaterialItem,
} from 'globalStore/createPostSlice';
import materialTypes from 'constants/materialTypes';
import AddQuestion from './AddQuestion';
import QuestionsList from './QuestionsList';
import DiscardQuestionAlert from './DiscardQuestionAlert';

const AddMCQ = ({ navigation, route }) => {
  const editIndex = route?.params?.index;
  const materialList = useSelector((state) => state.createPost.materialList);
  const dispatch = useDispatch();
  const { t } = useLocalization();
  const [currentlyEditingQuestion, setCurrentlyEditingQuestion] =
    useState(undefined);

  const [subFormikDirty, setSubFormikDirty] = useState(false);

  const editMCQ = materialList[editIndex];

  const formik = useFormik({
    initialValues: {
      title: editMCQ?.title ?? '',
      questions: editMCQ?.questions ? deepCopy(editMCQ?.questions) : [], // Deep Clone
    },
    onSubmit: (mcq, formikBag) => {
      const material = {
        ...mcq,
        amount: mcq.questions.length,
        type: materialTypes.MCQ,
      };
      const submitForm = () => {
        if (editIndex === undefined) {
          dispatch(addCreateMaterialItem(material));
        } else {
          dispatch(
            replaceCreateMaterialItem({
              index: editIndex,
              material,
            })
          );
        }
        navigation.goBack();
      };

      if (subFormikDirty) {
        DiscardQuestionAlert(
          t,
          () => {
            submitForm();
          },
          () => {
            formikBag.setSubmitting(false);
          }
        );
      } else {
        submitForm();
      }
    },
    validationSchema: yup.object().shape({
      title: materialTitle(t),
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

  useOnGoBackDiscardWarning(() => {
    const questionsDirty = editMCQ
      ? !deepCompare(editMCQ?.questions, formik.values.questions)
      : formik.values.questions.length !== 0;
    return (
      !(formik.dirty || subFormikDirty || questionsDirty) || formik.isSubmitting
    );
  }, [formik.dirty, subFormikDirty, formik.isSubmitting]);

  return (
    <Page useSafeArea={false}>
      <MaterialCreateHeader
        title={t('AddMaterial/MCQ/Create MCQ')}
        rightButtonText={t('AddMaterial/Finish')}
        onPress={attemptSubmit}
        onBackPress={() => {
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
            formik.setFieldValue('questions', formik.values.questions);
          }}
          questions={formik.values.questions}
          contentStyle={styles.content}
          currentlyEditingQuestion={currentlyEditingQuestion}
          setDirty={setSubFormikDirty}
        />
        <QuestionsList
          questions={formik.values.questions}
          contentStyle={styles.content}
          onEdit={(i) => {
            setCurrentlyEditingQuestion(formik.values.questions[i]);
            deleteQuestion(i);
          }}
          onDelete={deleteQuestion} // dirty ?
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
