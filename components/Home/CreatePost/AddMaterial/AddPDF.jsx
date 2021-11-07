import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocalization } from 'localization';
import MaterialCreateHeader from 'common/MaterialHeader/MaterialCreateHeader';
import Page from 'common/Page/Page';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigation } from '@react-navigation/core';
import { TransparentTextInputFormik } from 'common/Input';
import EduText from 'common/EduText';
import { PressableIcon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import { Styles } from 'styles';
import Separator from 'common/Separator';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { requiredError } from 'validation';
import useOnGoBack from 'navigation/useOnGoBack';
import DiscardChangesAlert from 'common/alerts/DiscardChangesAlert';

const AddPDF = () => {
  const { t } = useLocalization();
  const navigation = useNavigation();


  const formik = useFormik({
    initialValues: {
      pdfTitle: '',
      fileName: '',
    },
    onSubmit: (pdf) => {
      navigation.goBack();
    },
    validationSchema: yup.object().shape({
      pdfTitle: yup
        .string()
        .required(requiredError(t))
        .max(
          100, // repeated
          t('TextInput/max char error', { max: 100 })
        )
        .trim(),
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
        <>
          <View style={styles.fileNameRow}>
            <EduText style={styles.pdfFileName}>
              {`${t('AddMaterial/PDF/PDF file name:')} ${
                formik.values.fileName
              }`}
            </EduText>
            <PressableIcon
              name={IconNames.delete}
              onPress={() => formik.setFieldValue('fileName', '')}
            />
          </View>
          <Separator style={styles.previewSeparator} />
          <EduText style={styles.preview}>{t('AddMaterial/Preview')}</EduText>
          <View
            // todo temp pdf viewer
            style={{
              backgroundColor: 'pink',
              width: '100%',
              flex: 1,
              alignSelf: 'center',
            }}
          />
        </>
      ) : (
        <View style={styles.addDocumentIcon}>
          <PressableIcon
            name={IconNames.addDocument}
            size={90}
            onPress={() => {
              const newFileName = 'Some File.pdf';
              // todo file picker, filter by pdf
              if (!formik.values.pdfTitle) {
                formik.setFieldValue('pdfTitle', newFileName.split('.pdf')[0]);
              }
              formik.setFieldValue('fileName', newFileName);
            }}
          />
        </View>
      )}
    </Page>
  );
};

AddPDF.propTypes = {};
AddPDF.defaultProps = {};

export default AddPDF;

const styles = StyleSheet.create({
  addDocumentIcon: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
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
  fileNameRow: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  pdfFileName: {
    ...Styles.underLinedFileName,

    marginLeft: 10,
    marginRight: 4,
  },
  previewSeparator: {
    marginTop: 20,
  },
  preview: {
    fontSize: 41,
    textAlign: 'center',

    marginBottom: 15,
  },
});
