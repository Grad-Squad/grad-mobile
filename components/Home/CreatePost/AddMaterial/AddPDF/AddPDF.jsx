import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocalization } from 'localization';
import MaterialCreateHeader from 'common/MaterialHeader/MaterialCreateHeader';
import Page from 'common/Page/Page';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigation } from '@react-navigation/core';
import { TransparentTextInputFormik } from 'common/Input';
import { PressableIcon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { materialTitle } from 'validation';
import { useStore } from 'globalStore/GlobalStore';
import useOnGoBack from 'navigation/useOnGoBack';
import DiscardChangesAlert from 'common/alerts/DiscardChangesAlert';
import * as DocumentPicker from 'expo-document-picker';
import ReducerActions from 'globalStore/ReducerActions';
import { MaterialTypes } from 'constants';
import { routeParamPropType } from 'proptypes';
import PropTypes from 'prop-types';
import AddDocument from './AddDocument';
import PreviewDocument from './PreviewDocument';

const AddPDF = ({ route }) => {
  const editIndex = route?.params?.index;

  const { t } = useLocalization();
  const navigation = useNavigation();

  const [state, dispatch] = useStore();

  const editPdf = state.createPost.materialList[editIndex];

  const formik = useFormik({
    initialValues: {
      pdfTitle: editPdf?.pdfTitle ?? '',
      fileName: editPdf?.fileName ?? '',
      fileUri: editPdf?.fileUri ?? '',
    },
    onSubmit: (pdf) => {
      if (editIndex === undefined) {
        dispatch({
          type: ReducerActions.addCreateMaterialItem,
          payload: { ...pdf, type: MaterialTypes.PDF },
        });
      } else {
        dispatch({
          type: ReducerActions.replaceCreateMaterialItem,
          payload: {
            index: editIndex,
            material: { ...pdf, type: MaterialTypes.PDF },
          },
        });
      }
      navigation.goBack();
    },
    validationSchema: yup.object().shape({
      pdfTitle: materialTitle(t),
      fileName: yup.string().required(t('AddMaterial/PDF/Please add a file')),
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
        title={t('AddMaterial/PDF/Add PDF')}
        rightButtonText={t('AddMaterial/Finish')}
        onPress={attemptSubmit}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.pdfNameRow}>
        <TransparentTextInputFormik
          formik={formik}
          formikKey="pdfTitle"
          title={t('AddMaterial/PDF/PDF Title')}
          style={styles.pdfName}
        />
        {!!formik.values.pdfTitle && (
          <PressableIcon
            name={IconNames.close}
            size={30}
            style={styles.clearPdfName}
            onPress={() => formik.setFieldValue('pdfTitle', '')}
          />
        )}
      </View>
      {formik.values.fileName ? (
        <PreviewDocument
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
              type: 'application/pdf',
            });
            if (type !== 'canceled') {
              if (!formik.values.pdfTitle) {
                formik.setFieldValue('pdfTitle', fileName.split('.pdf')[0]);
              }
              formik.setFieldValue('fileName', fileName);
              formik.setFieldValue('fileUri', uri);
            }
          }}
          error={formik.touched.fileName && formik.errors.fileName}
        />
      )}
    </Page>
  );
};

AddPDF.propTypes = {
  route: routeParamPropType(
    PropTypes.shape({ index: PropTypes.number.isRequired })
  ),
};
AddPDF.defaultProps = {
  route: undefined,
};

export default AddPDF;

const styles = StyleSheet.create({
  pdfNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pdfName: {
    flex: 1,
  },
  clearPdfName: {
    marginHorizontal: 7,
  },
});
