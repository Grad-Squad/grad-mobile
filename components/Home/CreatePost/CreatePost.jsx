import React, { useContext } from 'react';
import { Alert, StyleSheet } from 'react-native';
import Page from 'common/Page/Page';
import { navigationPropType } from 'proptypes';
import { TransparentTextInputFormik } from 'common/Input';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { requiredError } from 'validation';
import { LocalizationContext } from 'localization';
import CreatePostHeader from './CreatePostHeader';
import AddMaterialList from './AddMaterialList';
import MaterialList from './MaterialList';

const CreatePost = ({ navigation }) => {
  const { t } = useContext(LocalizationContext);

  const formik = useFormik({
    initialValues: {
      title: '',
      Subject: '',
      tags: '',
      materialList: [],
    },
    onSubmit: ({ title, Subject, tags, materialList }) => {
      Alert.alert(`post: ${title}`);
    },
    validationSchema: yup.object().shape({
      title: yup.string().trim().max(100, 'error').required(requiredError(t)),
      materialList: yup.array().min(1, 'error').max(10, 'error'),
    }),
  });
  const attemptSubmit = () => {
    formik.setTouched('materialList', true);
    formik.handleSubmit();
  };
  return (
    <Page>
      <CreatePostHeader
        onBackPress={() => navigation.goBack()}
        onPostPress={attemptSubmit}
      />

      <TransparentTextInputFormik
        title={t('CreatePost/Title')}
        formik={formik}
        formikKey="title"
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
