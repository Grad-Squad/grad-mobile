import React, { useContext } from 'react';
import { Alert, StyleSheet } from 'react-native';
import Page from 'common/Page/Page';
import { navigationPropType } from 'proptypes';
import { ComboBox, TransparentTextInputFormik } from 'common/Input';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { requiredError } from 'validation';
import { LocalizationContext } from 'localization';
import CreatePostHeader from './CreatePostHeader';
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
];

const CreatePost = ({ navigation }) => {
  const { t } = useContext(LocalizationContext);

  const formik = useFormik({
    initialValues: {
      title: '',
      subject: null,
      tags: null,
      materialList: [],
    },
    onSubmit: ({ title, subject, tags, materialList }) => {
      Alert.alert(`post: ${title}`);
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
  return (
    <Page>
      <CreatePostHeader
        onBackPress={() => navigation.goBack()}
        onPostPress={formik.handleSubmit}
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
        errorMsg={formik.touched.materialList && formik.errors.materialList}
      />
      <AddMaterialList navigation={navigation} />
    </Page>
  );
};

CreatePost.propTypes = { navigation: navigationPropType.isRequired };
CreatePost.defaultProps = {};

export default CreatePost;

const styles = StyleSheet.create({});
