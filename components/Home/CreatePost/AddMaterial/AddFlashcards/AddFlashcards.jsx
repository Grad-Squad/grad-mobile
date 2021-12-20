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
import DiscardFlashcardAlert from './DiscardFlashcardAlert';
import AddFlashcard from './AddFlashcard';

const AddFlashCards = ({ navigation, route }) => {
  const editIndex = route?.params?.index;
  const materialList = useSelector((state) => state.createPost.materialList);
  const dispatch = useDispatch();
  const { t } = useLocalization();
  const [currentlyEditingFlashcard, setCurrentlyEditingFlashcard] =
    useState(undefined);

  const [subFormikDirty, setSubFormikDirty] = useState(false);

  const editFlashcard = materialList[editIndex];

  const formik = useFormik({
    initialValues: {
      title: editFlashcard?.title ?? '',
      flashcards: editFlashcard?.flashcards
        ? deepCopy(editFlashcard?.flashcards)
        : [], // Deep Clone
    },
    onSubmit: (flashcards, formikBag) => {
      const material = {
        amount: flashcards.length,
        type: materialTypes.Flashcards,
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
        DiscardFlashcardAlert(
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
        .min(1, t('AddMaterial/Flashcards/errors/add at least one flashcard')),
    }),
  });

  const deleteFlashcard = (i) => {
    formik.values.flashcards.splice(i, 1);
    formik.setFieldValue('flashcards', formik.values.flashcards);
  };

  const attemptSubmit = () => {
    formik.setFieldTouched('flashcards', true);
    formik.handleSubmit();
  };

  useOnGoBackDiscardWarning(() => {
    const flashcardsDirty = editFlashcard
      ? !deepCompare(editFlashcard?.flashcards, formik.values.flashcards)
      : formik.values.flashcards.length !== 0;
    return (
      !(formik.dirty || subFormikDirty || flashcardsDirty) ||
      formik.isSubmitting
    );
  }, [formik.dirty, subFormikDirty, formik.isSubmitting]);

  return (
    <Page useSafeArea={false}>
      <MaterialCreateHeader
        title={t('AddMaterial/Flashcards/Create flashcards')}
        rightButtonText={t('AddMaterial/Finish')}
        onPress={attemptSubmit}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <TransparentTextInputFormik
        title={t('AddMaterial/Flashcards/Exercise Title')}
        formik={formik}
        formikKey="title"
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        <AddFlashcard
          AddFlashcardToCollection={(flashcard) => {
            formik.values.flashcards.push(flashcard);
            formik.setFieldValue('flashcards', formik.values.flashcards);
          }}
          flashcards={formik.values.flashcards}
          contentStyle={styles.content}
          currentlyEditingFlashcard={currentlyEditingFlashcard}
          setDirty={setSubFormikDirty}
        />
        {/* <QuestionsList
          questions={formik.values.questions}
          contentStyle={styles.content}
          onEdit={(i) => {
            setCurrentlyEditingFlashcard(formik.values.questions[i]);
            deleteFlashcard(i);
          }}
          onDelete={deleteFlashcard} // dirty ?
          error={formik.touched.questions && formik.errors.questions}
        /> */}
      </ScrollView>
    </Page>
  );
};

AddFlashCards.propTypes = {
  navigation: navigationPropType.isRequired,
  route: routeParamPropType(
    PropTypes.shape({ index: PropTypes.number.isRequired })
  ),
};
AddFlashCards.defaultProps = { route: undefined };

export default AddFlashCards;

const styles = StyleSheet.create({
  content: { width: '95%', alignSelf: 'center' },
});
