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
import * as DocumentPicker from 'expo-document-picker';
import { routeParamPropType } from 'proptypes';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCreateMaterialItem,
  replaceCreateMaterialItem,
} from 'globalStore/createPostSlice';
import useOnGoBackDiscardWarning from 'navigation/useOnGoBackDiscardWarning';
import fileUploadTypes from 'constants/fileUploadTypes';
import { v4 as uuidv4 } from 'uuid';
import materialTypes from 'constants/materialTypes';
import AddDocument from '../AddDocument';
import PreviewDocument from './PreviewDocument';
import 'react-native-get-random-values';

const AddPDF = ({ route }) => {
  const editIndex = route?.params?.index;

  const { t } = useLocalization();
  const navigation = useNavigation();

  const materialList = useSelector((state) => state.createPost.materialList);
  const dispatch = useDispatch();

  const editPdf = materialList[editIndex];

  const formik = useFormik({
    initialValues: {
      title: editPdf?.title ?? '',
      fileName: editPdf?.fileName ?? '',
      fileUri: editPdf?.fileUri ?? '',
    },
    onSubmit: (pdf) => {
      const material = {
        amount: 1,
        title: pdf.title,
        file: {
          file: {
            fileName: pdf.fileName,
            uri: pdf.fileUri,
          },
          clientId: uuidv4(),
          fileType: fileUploadTypes.DOC,
        },
        type: materialTypes.PDF,
      };
      if (editIndex === undefined) {
        dispatch(addCreateMaterialItem(material));
      } else {
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
      fileName: yup.string().required(t('AddMaterial/Please add a file')),
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
          formikKey="title"
          title={t('AddMaterial/PDF/PDF Title')}
          style={styles.pdfName}
        />
        {!!formik.values.title && (
          <PressableIcon
            name={IconNames.close}
            size={30}
            style={styles.clearPdfName}
            onPress={() => formik.setFieldValue('title', '')}
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
              if (!formik.values.title) {
                formik.setFieldValue('title', fileName.split('.pdf')[0]);
              }
              formik.setFieldValue('fileName', fileName);
              formik.setFieldValue('fileUri', uri);
            }
          }}
          error={formik.touched.fileName && formik.errors.fileName}
          iconName={IconNames.addDocument}
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
