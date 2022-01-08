import React, { useEffect, useState } from 'react';
import { LayoutAnimation, StyleSheet } from 'react-native';
import Page from 'common/Page/Page';
import { navigationPropType, routeParamPropType } from 'proptypes';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { maxCharError, requiredError } from 'validation';
import { useLocalization } from 'localization';
import MaterialCreateHeader from 'common/MaterialHeader/MaterialCreateHeader';
import { useAPIGetPostById } from 'api/endpoints/posts';
import PropTypes from 'prop-types';
import LoadingIndicator from 'common/LoadingIndicator';
import { Modal, Portal } from 'react-native-paper';
import EduText from 'common/EduText';
import { Colors, Constants } from 'styles';
import { TransparentButton } from 'common/Input/Button';
import {
  deleteMaterials,
  parseFileUploads,
  resetUploadState,
  setCreateMaterialItem,
} from 'globalStore/createPostSlice';
import { useSelector, useDispatch } from 'react-redux';
import SelectedItemsHeader from 'common/SelectedItemsHeader';
import { useNetInfo } from '@react-native-community/netinfo';
import AddMaterialList from './AddMaterialList';
import MaterialList from './MaterialList';
import useUploadPost from './useUploadPost';
import CreatePostForm from './CreatePostForm';

const CreatePost = ({ navigation, route }) => {
  const { t } = useLocalization();

  const netInfo = useNetInfo();
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

  const { totalFilesToUpload, imagesProgress, isUploadError, resetErrors } =
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
          {!isUploadError && (
            <>
              <LoadingIndicator size="large" />
              <EduText style={styles.padAbove}>
                {t('CreatePost/Upload in progress')}{' '}
                {totalFilesToUpload !== 0 &&
                  `${imagesProgress}/${totalFilesToUpload}`}
              </EduText>
            </>
          )}

          {isUploadError && (
            <>
              <EduText>{t('CreatePost/Modal/Error')}</EduText>
              <TransparentButton
                text={t('CreatePost/Modal/Try again')}
                onPress={() => {
                  resetErrors();
                  dispatch(parseFileUploads());
                }}
              />
              <TransparentButton
                text={t('CreatePost/Modal/Cancel')}
                onPress={() => {
                  dispatch(resetUploadState());
                  setIsProgressModalVisible(false);
                }}
              />
            </>
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
          rightButtonProps={{ disabled: !netInfo.isConnected }}
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

      <CreatePostForm
        lateInitSubject={isPostFetchedForEdit ? fetchedPostData.subject : null}
        lateInitTags={isPostFetchedForEdit ? fetchedPostData.tags : null}
        formik={formik}
        t={t}
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
  },
  padAbove: {
    paddingTop: Constants.commonMargin / 2,
  },
});
