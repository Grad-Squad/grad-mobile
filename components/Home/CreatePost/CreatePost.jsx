import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Page from 'common/Page/Page';
import { navigationPropType, routeParamPropType } from 'proptypes';
import { TransparentTextInputFormik, DropdownList } from 'common/Input';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { maxCharError, requiredError } from 'validation';
import { useLocalization } from 'localization';
import MaterialCreateHeader from 'common/MaterialHeader/MaterialCreateHeader';
import {
  useAPICreatePost,
  useAPIGetPostById,
  useAPIUpdatePost,
} from 'api/endpoints/posts';
import PropTypes from 'prop-types';
import LoadingIndicator from 'common/LoadingIndicator';
import {
  useAPIBulkUploadImage,
  useAPIgetS3UploadImageLinks,
  useAPIUploadImage,
} from 'api/endpoints/s3';
import { Modal, Portal } from 'react-native-paper';
import EduText from 'common/EduText';
import { Colors, Constants } from 'styles';
import { TransparentButton } from 'common/Input/Button';
import {
  clearCreatePost,
  clearMaterialList,
  parseFileUploads,
  parsePost,
  setCreateMaterialItem,
} from 'globalStore/createPostSlice';
import { useSelector, useDispatch } from 'react-redux';
import fileUploadTypes from 'constants/fileUploadTypes';
import useOnGoBackDiscardWarning from 'navigation/useOnGoBackDiscardWarning';
import AddMaterialList from './AddMaterialList';
import MaterialList from './MaterialList';

const dropdownInitialItems = [
  { label: 'Apple', id: 'apple' },
  { label: 'Banana0', id: 'banana0' },
  { label: 'Banana2', id: 'banana2' },
  { label: 'Banana4', id: 'banana4' },
  { label: 'Banana6', id: 'banana6' },
  { label: 'Banana8', id: 'banana8' },
  { label: 'Banana10', id: 'banana10' },
  { label: 'Banana12', id: 'banana12' },
  { label: 'Banana14', id: 'banana14' },
  { label: 'Banana16', id: 'banana16' },
  { label: 'Banana18', id: 'banana18' },
  { label: 'math d1', id: 'math d1' },
];

const CreatePost = ({ navigation, route }) => {
  const { t } = useLocalization();

  const dispatch = useDispatch();
  const materialList = useSelector((state) => state.createPost.materialList);
  const { postId = undefined } = route?.params || {};

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

      dispatch(setCreateMaterialItem(materials));
    },
  });

  const createPostMutation = useAPICreatePost({});
  const updatePostMutation = useAPIUpdatePost(postId, {
    onSubmit: () => refetchPost(),
  });

  useEffect(() => {
    if (createPostMutation.isSuccess || updatePostMutation.isSuccess) {
      navigation.goBack();
      dispatch(clearCreatePost());
    }
  }, [
    navigation,
    updatePostMutation.isSuccess,
    createPostMutation.isSuccess,
    dispatch,
  ]);

  const [imagesProgress, setImagesProgress] = useState(0);
  const uploadImagesMutation = useAPIBulkUploadImage(
    () => {
      setImagesProgress((prev) => prev + 1);
    },
    {
      onSuccess: (fileUploadClientIdToResourceId) => {
        dispatch(
          parsePost({ data: formik.values, fileUploadClientIdToResourceId })
        );
      },
    }
  );
  const fileUploads = useSelector((state) => state.createPost.fileUploads);
  const [numImageLinks, setNumImageLinks] = useState(0);
  const uploadImageMutation = useAPIUploadImage({});

  // todo batches (ex: user uploading 200 pic might timeout due to upload time limit)
  useAPIgetS3UploadImageLinks(numImageLinks, {
    enabled: numImageLinks !== 0,
    onSuccess: (data) => {
      uploadImagesMutation.mutate(data);
    },
    onError: () => {},
  });

  const areFileUploadsReady = useSelector(
    (state) => state.createPost.areFileUploadsReady
  );

  useEffect(() => {
    if (areFileUploadsReady) {
      if (fileUploads.length !== 0) {
        setNumImageLinks(
          fileUploads.filter((file) => file.fileType === fileUploadTypes.IMAGE)
            .length
        );
        // todo add other upload types
      }
    }
  }, [fileUploads, areFileUploadsReady, dispatch]);

  const isPostReadyForUpload = useSelector(
    (state) => state.createPost.isPostReadyForUpload
  );

  const parsedPost = useSelector((state) => state.createPost.post);

  useEffect(() => {
    if (isPostReadyForUpload) {
      if (postId) {
        updatePostMutation.mutate({
          ...fetchedPostData,
          ...parsedPost,
        });
      } else {
        createPostMutation.mutate(parsedPost);
      }
    }
  }, [isPostReadyForUpload, parsedPost]);

  const formik = useFormik({
    initialValues: {
      title: '',
      subject: null,
      tags: null,
      materialList: [],
    },
    onSubmit: () => {
      setIsProgressModalVisible(true);
      dispatch(parseFileUploads());
    },
    validationSchema: yup.object().shape({
      title: yup
        .string()
        .trim()
        .max(100, maxCharError(t, 100))
        .required(requiredError(t)),
      subject: yup.string().nullable().required(requiredError(t)),
      materialList: yup
        .array()
        .min(1, t('CreatePost/add at least one material')), // todo .max(10, 'error'): disallow it in add material
    }),
  });

  useEffect(() => {
    if (materialList.length !== 0) {
      formik.setFieldValue('materialList', materialList);
    }
  }, [materialList]);

  useOnGoBackDiscardWarning(
    !formik.dirty ||
      updatePostMutation.isSuccess ||
      createPostMutation.isSuccess,
    [formik.dirty, updatePostMutation.isSuccess, createPostMutation.isSuccess],
    () => dispatch(clearCreatePost())
  );

  const isUploadingImages =
    fileUploads.length !== 0 && imagesProgress !== numImageLinks;

  const isUploadingPost =
    (isUploadingImages ||
      createPostMutation.isLoading ||
      uploadImageMutation.isLoading) &&
    !uploadImageMutation.isError;

  return (
    <Page>
      <Portal>
        <Modal
          dismissable={false}
          visible={isProgressModalVisible}
          contentContainerStyle={styles.progressContainerStyle}
          onDismiss={() => setIsProgressModalVisible(false)}
        >
          {isUploadingPost && <LoadingIndicator size="large" />}
          <EduText style={styles.padAbove}>
            {t('CreatePost/Upload in progress')}{' '}
            {numImageLinks !== 0 && imagesProgress}/{numImageLinks}
          </EduText>
          {!isUploadingPost && (
            <TransparentButton
              text="Try again"
              // todo try again
              // onPress={() => setCanUpload(true)}
            />
          )}
          {!isUploadingPost && (
            <TransparentButton
              text="Cancel"
              onPress={() => setIsProgressModalVisible(false)}
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
          dispatch(clearMaterialList());
          navigation.goBack();
        }}
      />

      <TransparentTextInputFormik
        title={t('CreatePost/Title')}
        formik={formik}
        formikKey="title"
      />
      <DropdownList
        placeholder={t('CreatePost/SubjectCourse')}
        value={formik.values.subject}
        setValueFunction={(newValue) =>
          formik.setFieldValue('subject', newValue[0])
        }
        items={dropdownInitialItems}
        // error={formik.errors.subject && formik.touched.subject}
        // errorMsg={formik.errors.subject}
      />
      <DropdownList
        placeholder={t('CreatePost/Tags')}
        multiple
        min={0}
        max={5}
        value={formik.values.tags}
        setValueFunction={(newValues) => {
          formik.setFieldValue('tags', newValues);
        }}
        items={dropdownInitialItems}
      />

      <MaterialList
        materials={formik.values.materialList}
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
