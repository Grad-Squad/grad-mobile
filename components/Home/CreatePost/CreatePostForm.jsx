import React from 'react';
import PropTypes from 'prop-types';
import { DropdownList, TransparentTextInputFormik } from 'common/Input';

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

const CreatePostForm = ({ lateInitSubject, lateInitTags, formik, t }) => (
  <>
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
      lateInitChoice={lateInitSubject}
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
      lateInitChoice={lateInitTags}
    />
  </>
);

CreatePostForm.propTypes = {
  t: PropTypes.func.isRequired,
  formik: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    values: PropTypes.object.isRequired,
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
  lateInitSubject: PropTypes.string,
  lateInitTags: PropTypes.string,
};
CreatePostForm.defaultProps = {
  lateInitSubject: null,
  lateInitTags: null,
};

export default CreatePostForm;
