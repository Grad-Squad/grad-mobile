import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { useLocalization } from 'localization';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigation } from '@react-navigation/core';
import { useStore } from 'globalStore/GlobalStore';
import { useFormik } from 'formik';
import ReducerActions from 'globalStore/ReducerActions';
import { MaterialTypes } from 'constants';
import * as yup from 'yup';
import { materialTitle, requiredError } from 'validation';
import useOnGoBack from 'navigation/useOnGoBack';
import DiscardChangesAlert from 'common/alerts/DiscardChangesAlert';
import Page from 'common/Page/Page';
import { routeParamPropType } from 'proptypes';
import MaterialCreateHeader from 'common/MaterialHeader/MaterialCreateHeader';
import { TransparentTextInputFormik } from 'common/Input';
import { PressableIcon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import * as DocumentPicker from 'expo-document-picker';
import AddDocument from '../AddDocument';
import PreviewVideo from './PreviewVideo';

const AddVideo = ({ route }) => {
  const editIndex = route?.params?.index;

  const { t } = useLocalization();
  const navigation = useNavigation();

  const [state, dispatch] = useStore();

  const editPdf = state.createPost.materialList[editIndex];

  const formik = useFormik({
    initialValues: {
      videoTitle: editPdf?.videoTitle ?? '',
      fileName: editPdf?.fileName ?? '',
      fileUri: editPdf?.fileUri ?? '',
    },
    onSubmit: (video) => {
      if (editIndex === undefined) {
        dispatch({
          type: ReducerActions.addCreateMaterialItem,
          payload: { ...video, type: MaterialTypes.Video },
        });
      } else {
        dispatch({
          type: ReducerActions.replaceCreateMaterialItem,
          payload: {
            index: editIndex,
            material: { ...video, type: MaterialTypes.Video },
          },
        });
      }
      navigation.goBack();
    },
    validationSchema: yup.object().shape({
      videoTitle: materialTitle(t),
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

  useOnGoBack(
    (e) => {
      if (!formik.dirty || formik.isSubmitting) {
        return;
      }

      e.preventDefault();

      DiscardChangesAlert(t, () => {
        navigation.dispatch(e.data.action);
      });
    },
    [formik.dirty, formik.isSubmitting]
  );
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
          formikKey="videoTitle"
          title={t('AddMaterial/Video/Video Title')}
          style={styles.videoTitle}
        />
        {!!formik.values.videoTitle && (
          <PressableIcon
            name={IconNames.close}
            size={30}
            style={styles.clearVideoTitle}
            onPress={() => formik.setFieldValue('videoTitle', '')}
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
              if (!formik.values.videoTitle) {
                formik.setFieldValue('videoTitle', fileName.split('.')[0]);
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
