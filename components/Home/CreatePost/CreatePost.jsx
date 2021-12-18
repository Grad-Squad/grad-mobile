import React, { useEffect, useState } from 'react';
import { LayoutAnimation, StyleSheet } from 'react-native';
import Page from 'common/Page/Page';
import { navigationPropType, routeParamPropType } from 'proptypes';
import { TransparentTextInputFormik, DropdownList } from 'common/Input';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { maxCharError, requiredError } from 'validation';
import { useLocalization } from 'localization';
import MaterialCreateHeader from 'common/MaterialHeader/MaterialCreateHeader';
import {
  apiFeedQueryKey,
  useAPICreatePost,
  useAPIGetPostById,
  useAPIUpdatePost,
} from 'api/endpoints/posts';
import PropTypes from 'prop-types';
import LoadingIndicator from 'common/LoadingIndicator';
import {
  useAPIBulkUploadImage,
  useAPIgetS3UploadImageLinks,
  useDeleteBulkUri,
} from 'api/endpoints/s3';
import { Modal, Portal } from 'react-native-paper';
import EduText from 'common/EduText';
import { Colors, Constants } from 'styles';
import { TransparentButton } from 'common/Input/Button';
import {
  clearCreatePost,
  deleteMaterials,
  parseFileUploads,
  parsePost,
  resetAreFileUploadsReady,
  resetUploadState,
  setCreateMaterialItem,
} from 'globalStore/createPostSlice';
import { useSelector, useDispatch } from 'react-redux';
import fileUploadTypes from 'constants/fileUploadTypes';
import useOnGoBackDiscardWarning from 'navigation/useOnGoBackDiscardWarning';
import { useQueryClient } from 'react-query';
import SelectedItemsHeader from 'common/SelectedItemsHeader';
import AddMaterialList from './AddMaterialList';
import MaterialList from './MaterialList';
import useUploadPost from './useUploadPost';
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
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const resetSelectedMaterials = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedMaterials([]);
  };

  const { postId = undefined } = route?.params || {};

  const [isProgressModalVisible, setIsProgressModalVisible] = useState(false);

  const {
    data: fetchedPostData,
    isFetching: isFetchingPostForEdit,
    refetch: refetchPost,
    isSuccess: isPostFetchedForEdit,
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

  const { numImageLinks, imagesProgress, isUploadError, isUploadingPost } =
    useUploadPost(formik, postId, refetchPost, navigation, fetchedPostData);
  useEffect(() => {
    formik.setFieldValue('materialList', materialList);
  }, [materialList]);

  return (
    <Page>
      <Portal>
        <Modal
          dismissable={false}
          visible={isProgressModalVisible}
          contentContainerStyle={styles.progressContainerStyle}
          onDismiss={() => setIsProgressModalVisible(false)}
        >
          {isUploadingPost && !isUploadError && (
            <LoadingIndicator size="large" />
          )}
          <EduText style={styles.padAbove}>
            {t('CreatePost/Upload in progress')}{' '}
            {numImageLinks !== 0 && `${imagesProgress}/${numImageLinks}`}
          </EduText>
          {isUploadError && (
            <TransparentButton
              text="Try again"
              onPress={() => {
                dispatch(resetUploadState());
                dispatch(parseFileUploads());
              }}
            />
          )}
          {isUploadError && (
            <TransparentButton
              text="Cancel"
              onPress={() => setIsProgressModalVisible(false)}
            />
          )}
        </Modal>
      </Portal>
      {selectedMaterials.length === 0 ? (
        <MaterialCreateHeader
          title={
            postId ? t('CreatePost/Edit Post') : t('CreatePost/Create New Post')
          }
          rightButtonText={t('CreatePost/Post')}
          onPress={formik.handleSubmit}
          onBackPress={() => {
            navigation.goBack();
          }}
        />
      ) : (
        <SelectedItemsHeader
          numSelected={selectedMaterials.length}
          onBackPress={resetSelectedMaterials}
          onDeletePress={() => {
            dispatch(deleteMaterials(selectedMaterials));
            resetSelectedMaterials();
          }}
        />
      )}

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
        lateInitChoice={isPostFetchedForEdit && fetchedPostData.subject}
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
        lateInitChoice={isPostFetchedForEdit && fetchedPostData.tags}
      />

      <MaterialList
        materials={formik.values.materialList}
        errorMsg={formik.touched.materialList && formik.errors.materialList}
        selectedMaterials={selectedMaterials}
        setSelectedMaterials={setSelectedMaterials}
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
