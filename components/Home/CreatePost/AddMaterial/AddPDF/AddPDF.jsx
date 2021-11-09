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
import { materialTitle, requiredError } from 'validation';
import useOnGoBack from 'navigation/useOnGoBack';
import DiscardChangesAlert from 'common/alerts/DiscardChangesAlert';
import * as DocumentPicker from 'expo-document-picker';
import AddDocument from './AddDocument';
import PreviewDocument from './PreviewDocument';

const AddPDF = () => {
  const { t } = useLocalization();
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: {
      pdfTitle: '',
      fileName: '',
      fileUri: '',
    },
    onSubmit: (pdf) => {
      navigation.goBack();
    },
    validationSchema: yup.object().shape({
      pdfTitle: materialTitle(t),
      fileName: yup.string().required(requiredError(t)),
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
        />
      )}
    </Page>
  );
};

AddPDF.propTypes = {};
AddPDF.defaultProps = {};

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
