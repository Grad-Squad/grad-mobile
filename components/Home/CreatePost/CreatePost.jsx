import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
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
import { useAPIUploadImage } from 'api/endpoints/s3';
import { Modal, Portal } from 'react-native-paper';
import EduText from 'common/EduText';
import { Colors, Constants } from 'styles';
import { TransparentButton } from 'common/Input/Button';
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
  const uploadImageMutation = useAPIUploadImage();
  const [canUpload, setCanUpload] = useState(false);
  const [imagesNumber, setImagesNumber] = useState(0);
  const [isProgressModalVisible, setIsProgressModalVisible] = useState(false);

  const {
    data: fetchedPostData,
    isFetching: isFetchingPostForEdit,
    refetch: refetchPost,
  } = useAPIGetPostById(postId, {
    enabled: !!postId,
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

  useEffect(() => {
    if (canUpload) {
      setCanUpload(false);
      if (state.imagesUploadQueue.length !== 0) {
        uploadImageMutation.mutate(state.imagesUploadQueue[0], {
          onError: () => {
            // todo try again
          },
          onSuccess: () => {
            setCanUpload(true);
            dispatch({ type: ReducerActions.popImageFromUploadQueue });
          },
        });
      } else {
        // const { title, subject, tags, materialList } = formik.values;
        const { title, subject, materialList } = formik.values;
        const post = {
          title,
          priceInCents: 0,
          subject,
          materials: materialList.map(
            ({ questions, title: materialTitle }) => ({
              materialType: 'mcq',
              title: materialTitle,
              mcqs: questions.map(({ question, choices, questionUriKey }) => ({
                question,
                answerIndices: choices
                  .map(({ isCorrect }, index) => (isCorrect ? index : -1))
                  .filter((i) => i !== -1),
                choices: choices.map(({ text }) => text),
                questionUriKey,
              })),
            })
          ),
        };
        if (postId) {
          updatePostMutation.mutate({
            ...fetchedPostData,
            ...post,
          });
        } else {
          createPostMutation.mutate(post, { onError: () => {} });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    canUpload,
    dispatch,
    state.imagesUploadQueue,
    uploadImageMutation,
    createPostMutation,
    updatePostMutation,
    postId,
  ]);

  useEffect(() => {
    if (createPostMutation.isSuccess || updatePostMutation.isSuccess) {
      dispatch({ type: ReducerActions.clearMaterialList });
      dispatch({ type: ReducerActions.clearImageUploadQueue });
      navigation.goBack();
    }
  }, [
    navigation,
    updatePostMutation.isSuccess,
    createPostMutation.isSuccess,
    dispatch,
  ]);

  const formik = useFormik({
    initialValues: {
      title: '',
      subject: null,
      tags: null,
      materialList: [],
    },
    onSubmit: () => {
      setCanUpload(true);
      setIsProgressModalVisible(true);
      setImagesNumber(state.imagesUploadQueue.length);
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
  }, [state.createPost.materialList]);

  useOnGoBack(
    (e) => {
      if (
        !formik.dirty ||
        updatePostMutation.isSuccess ||
        createPostMutation.isSuccess
      ) {
        // todo sub screen edited ?
        dispatch({ type: ReducerActions.clearMaterialList });
        dispatch({ type: ReducerActions.clearImageUploadQueue });
        return;
      }

      e.preventDefault();

      DiscardChangesAlert(t, () => {
        navigation.dispatch(e.data.action);
        dispatch({ type: ReducerActions.clearMaterialList });
        dispatch({ type: ReducerActions.clearImageUploadQueue });
      });
    },
    [formik.dirty, updatePostMutation.isSuccess, createPostMutation.isSuccess]
  );

  const isUploadingImages = state.imagesUploadQueue.length !== 0;

  const isUploadingPost =
    isUploadingImages ||
    createPostMutation.isLoading ||
    uploadImageMutation.isLoading;

  const imagesProgress = `${
    imagesNumber - state.imagesUploadQueue.length
  }/${imagesNumber}`;

  return (
    <Page>
      <Portal>
        <Modal
          dismissable={false}
          visible={isProgressModalVisible}
          contentContainerStyle={styles.progressContainerStyle}
        >
          {isUploadingPost && <LoadingIndicator size="large" />}
          <EduText style={styles.padAbove}>
            {t('CreatePost/Upload in progress')}{' '}
            {imagesNumber !== 0 && imagesProgress}
          </EduText>
          {!isUploadingPost && (
            <TransparentButton
              text="Try again"
              onPress={() => setCanUpload(true)}
            />
          )}
        </Modal>
      </Portal>
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

const styles = StyleSheet.create({
  progressContainerStyle: {
    padding: Constants.commonMargin,
    backgroundColor: Colors.background,
    margin: Constants.commonMargin,
    alignItems: 'center',
    // height: '40%',
  },
  padAbove: {
    paddingTop: Constants.commonMargin / 2,
  },
});
