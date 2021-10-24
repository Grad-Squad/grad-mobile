import React, { useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import Page from 'common/Page/Page';
import { navigationPropType, routeParamPropType } from 'proptypes';
import { ComboBox, TransparentTextInputFormik } from 'common/Input';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { requiredError } from 'validation';
import { useLocalization } from 'localization';
import MaterialCreateHeader from 'common/MaterialHeader/MaterialCreateHeader';
import { useStore } from 'globalStore/GlobalStore';
import ReducerActions from 'globalStore/ReducerActions';
import ScreenNames from 'navigation/ScreenNames';
import useOnGoBack from 'navigation/useOnGoBack';
import DiscardChangesAlert from 'common/alerts/DiscardChangesAlert';
import {
  useAPICreatePost,
  useAPIGetPostById,
  useAPIUpdatePost,
} from 'api/endpoints/posts';
import PropTypes from 'prop-types';
import LoadingIndicator from 'common/LoadingIndicator';
import AddMaterialList from './AddMaterialList';
import MaterialList from './MaterialList';

const dropdownInitialItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana1', value: 'banana2' },
  { label: 'Banana3', value: 'banana4' },
  { label: 'Banana5', value: 'banana6' },
  { label: 'Banana7', value: 'banana8' },
  { label: 'Banana9', value: 'banana10' },
  { label: 'Banana11', value: 'banana12' },
  { label: 'Banana13', value: 'banana14' },
  { label: 'Banana15', value: 'banana16' },
  { label: 'Banana17', value: 'banana18' },
  { label: 'Banana19', value: 'banana20' },
  { label: 'math d2', value: 'math d2' },
];

const CreatePost = ({ navigation, route }) => {
  const { t } = useLocalization();

  const [state, dispatch] = useStore();
  const { postId = undefined } = route?.params || {};

  const {
    data: fetchedPostData,
    isFetching: isFetchingPostForEdit,
    refetch: refetchPost,
  } = useAPIGetPostById(postId, {
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      // todo: tags
      const { title, subject, materials } = data;
      formik.setFieldValue('title', title);
      formik.setFieldValue('subject', subject);

      const mcqs = materials.map((collection) => ({
        questions: collection.mcqs.map(
          ({ question, choices, answerIndices }) => ({
            choices: choices.map((choice, index) => ({
              text: choice,
              isCorrect: answerIndices.indexOf(index) !== -1,
            })),
            question,
          })
        ),
        title: collection.title,
      }));
      dispatch({ type: ReducerActions.setMCQs, payload: mcqs });
    },
  });

  const createPostMutation = useAPICreatePost();
  const updatePostMutation = useAPIUpdatePost(postId, {
    onSubmit: () => refetchPost(),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      subject: null,
      tags: null,
      materialList: [],
    },
    onSubmit: ({ title, subject, tags, materialList }) => {
      Alert.alert(`post: ${title}`);
      const post = {
        ...fetchedPostData,
        priceInCents: 0,
        subject,
        materials: materialList.map(({ questions, title: materialTitle }) => ({
          materialType: 'mcq',
          title: materialTitle,
          mcqs: questions.map(({ question, choices }) => ({
            question,
            answerIndices: choices
              .map(({ isCorrect }, index) => (isCorrect ? index : -1))
              .filter((i) => i !== -1),
            choices: choices.map(({ text }) => text),
          })),
        })),
      };
      if (postId) {
        updatePostMutation.mutate(post);
      }
      createPostMutation.mutate({
        title,
        priceInCents: 0,
        subject,
        materials: materialList.map(({ questions, title: materialTitle }) => ({
          materialType: 'mcq',
          title: materialTitle,
          mcqs: questions.map(({ question, choices }) => ({
            question,
            answerIndices: choices
              .map(({ isCorrect }, index) => (isCorrect ? index : -1))
              .filter((i) => i !== -1),
            choices: choices.map(({ text }) => text),
          })),
        })),
      });
    },
    validationSchema: yup.object().shape({
      title: yup
        .string()
        .trim()
        .max(100, t('TextInput/max char error'))
        .required(requiredError(t)),
      subject: yup.string().nullable().required(requiredError(t)),
      materialList: yup
        .array()
        .min(1, t('CreatePost/add at least one material')), // todo .max(10, 'error'): disallow it in add material
    }),
  });

  useEffect(() => {
    if (state.createPost.materialList.length !== 0) {
      formik.setFieldValue('materialList', state.createPost.materialList);
    }
  }, [state.createPost.materialList, formik]);

  useOnGoBack(
    (e) => {
      if (!formik.dirty) {
        // todo sub screen edited ?
        return;
      }

      e.preventDefault();

      DiscardChangesAlert(t, () => {
        navigation.dispatch(e.data.action);
        dispatch({ type: ReducerActions.clearMaterialList });
      });
    },
    [formik.dirty]
  );

  return (
    <Page>
      <MaterialCreateHeader
        title={
          postId ? t('CreatePost/Edit Post') : t('CreatePost/Create New Post')
        }
        rightButtonText={t('CreatePost/Post')}
        onPress={formik.handleSubmit}
        onBackPress={() => {
          dispatch({ type: ReducerActions.clearMaterialList });
          navigation.goBack();
        }}
      />

      <TransparentTextInputFormik
        title={t('CreatePost/Title')}
        formik={formik}
        formikKey="title"
      />
      <ComboBox
        placeholder={t('CreatePost/SubjectCourse')}
        value={formik.values.subject}
        setValueCallback={(callback) =>
          formik.handleChange('subject')(callback(formik.values.subject))
        }
        initialItems={dropdownInitialItems}
        error={formik.errors.subject && formik.touched.subject}
        errorMsg={formik.errors.subject}
      />
      <ComboBox
        placeholder={t('CreatePost/Tags')}
        multiple
        min={0}
        max={5}
        value={formik.values.tags}
        setValueCallback={(callback) =>
          formik.setFieldValue('tags', callback(formik.values.tags))
        }
        initialItems={dropdownInitialItems}
      />

      <MaterialList
        materials={formik.values.materialList.map(
          ({ questions, title }, index) => ({
            id: `${index}`, // ! index as key
            type: 'MCQ',
            title,
            amount: questions.length,
            onPress: () => navigation.navigate(ScreenNames.ADD_MCQ, { index }),
          })
        )}
        errorMsg={formik.touched.materialList && formik.errors.materialList}
      />
      {postId && isFetchingPostForEdit && <LoadingIndicator size="large" />}
      <AddMaterialList navigation={navigation} />
    </Page>
  );
};

CreatePost.propTypes = {
  navigation: navigationPropType.isRequired,
  route: routeParamPropType(
    PropTypes.shape({ postId: PropTypes.number.isRequired })
  ),
};
CreatePost.defaultProps = {
  route: {
    params: {
      postId: undefined,
    },
  },
};

export default CreatePost;

const styles = StyleSheet.create({});
