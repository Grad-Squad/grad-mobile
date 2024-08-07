import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { useLocalization } from 'localization';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigation } from '@react-navigation/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { materialTitle, requiredError } from 'validation';
import useOnGoBackDiscardWarning from 'navigation/useOnGoBackDiscardWarning';
import Page from 'common/Page/Page';
import { routeParamPropType } from 'proptypes';
import MaterialCreateHeader from 'common/MaterialHeader/MaterialCreateHeader';
import { TransparentTextInputFormik } from 'common/Input';
import { PressableIcon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import * as DocumentPicker from 'expo-document-picker';
import {
  addCreateMaterialItem,
  addToDeletedUris,
  replaceCreateMaterialItem,
} from 'globalStore/createPostSlice';
import { useDispatch, useSelector } from 'react-redux';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import materialTypes from 'constants/materialTypes';
import fileUploadTypes from 'constants/fileUploadTypes';
import AddDocument from '../AddDocument';
import PreviewVideo from './PreviewVideo';

const AddVideo = ({ route }) => {
  const editIndex = route?.params?.index;

  const { t } = useLocalization();
  const navigation = useNavigation();

  const materialList = useSelector((state) => state.createPost.materialList);
  const dispatch = useDispatch();

  const editVideo = materialList[editIndex];

  const formik = useFormik({
    initialValues: {
      title: editVideo?.title ?? '',
      fileName: editVideo?.fileName ?? '',
      fileUri: editVideo?.fileUri ?? '',
    },
    onSubmit: (video) => {
      const material = {
        amount: 1,
        title: video.title,
        file: {
          file: {
            fileName: video.fileName,
            uri: video.fileUri,
          },
          clientId: uuidv4(),
          fileType: fileUploadTypes.VIDEO,
        },
        type: materialTypes.Video,
      };
      if (editIndex === undefined) {
        dispatch(addCreateMaterialItem(material));
      } else {
        if (video.fileUri !== editVideo?.fileUri) {
          dispatch(addToDeletedUris(editVideo?.fileUri?.split('/').pop()));
        } else {
          delete material.file.clientId;
          material.prevUri = editVideo?.prevUri;
        }
        dispatch(
          replaceCreateMaterialItem({
            index: editIndex,
            material,
          })
        );
      }
      navigation.goBack();
    },
    validationSchema: yup.object().shape({
      title: materialTitle(t),
      fileName: yup
        .string()
        .test(
          'required if neither filename or url are filled',
          t('AddMaterial/Please add a file'),
          (value) => value || formik.values.videoUrl
        ),
      videoUrl: yup
        .string()
        .test(
          'required if neither filename or url are filled',
          requiredError(t),
          (value) => value || formik.values.fileName
        )
        .url('(should be a URL)'),
    }),
  });
  const attemptSubmit = () => {
    formik.setFieldTouched('fileName', true);
    formik.handleSubmit();
  };

  useOnGoBackDiscardWarning(!formik.dirty || formik.isSubmitting, [
    formik.dirty,
    formik.isSubmitting,
  ]);
  return (
    <Page>
      <MaterialCreateHeader
        title={t('AddMaterial/Video/Add Video')}
        rightButtonText={t('AddMaterial/Finish')}
        onPress={attemptSubmit}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.nameRow}>
        <TransparentTextInputFormik
          formik={formik}
          formikKey="title"
          title={t('AddMaterial/Video/Video Title')}
          style={styles.videoTitle}
        />
        {!!formik.values.title && (
          <PressableIcon
            name={IconNames.close}
            size={30}
            style={styles.clearVideoTitle}
            onPress={() => formik.setFieldValue('title', '')}
          />
        )}
      </View>
      {formik.values.fileName ? (
        <PreviewVideo
          fileName={formik.values.fileName}
          uri={formik.values.fileUri}
          onRemoveFile={() => {
            formik.setFieldValue('fileName', '');
            formik.setFieldValue('fileUri', '');
          }}
        />
      ) : (
        <AddDocument
          onAddPress={async () => {
            const {
              name: fileName,
              type,
              uri,
            } = await DocumentPicker.getDocumentAsync({
              copyToCacheDirectory: false,
              type: 'video/*',
            });
            if (type !== 'canceled') {
              if (!formik.values.title) {
                formik.setFieldValue('title', fileName.split('.')[0]);
              }
              formik.setFieldValue('fileName', fileName);
              formik.setFieldValue('fileUri', uri);
            }
          }}
          error={formik.touched.fileName && formik.errors.fileName}
          iconName={IconNames.addVideo}
        />
      )}
    </Page>
  );
};

AddVideo.propTypes = {
  route: routeParamPropType(
    PropTypes.shape({ index: PropTypes.number.isRequired })
  ),
};
AddVideo.defaultProps = {
  route: undefined,
};
export default AddVideo;

const styles = StyleSheet.create({
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoTitle: {
    flex: 1,
  },
  clearVideoTitle: {
    marginHorizontal: 7,
  },
});
