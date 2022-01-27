import React from 'react';
import PropTypes from 'prop-types';
import { DropdownList, TransparentTextInputFormik } from 'common/Input';
import { useAPIGetTags } from 'api/endpoints/tags';
import { useAPIGetSubjects } from 'api/endpoints/subjects';

const CreatePostForm = ({ lateInitSubject, lateInitTags, formik, t }) => {
  const mapDataToDropDownItems = (data) =>
    data.map((item) => ({ label: item.content, id: item.content }));
  const { data: tags } = useAPIGetTags({ initialData: [] });
  const { data: subjects } = useAPIGetSubjects({ initialData: [] });
  return (
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
        items={mapDataToDropDownItems(subjects)}
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
        items={mapDataToDropDownItems(tags)}
        lateInitChoice={lateInitTags}
      />
    </>
  );
};

CreatePostForm.propTypes = {
  t: PropTypes.func.isRequired,
  formik: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    values: PropTypes.object.isRequired,
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
  lateInitSubject: PropTypes.string,
  lateInitTags: PropTypes.arrayOf(PropTypes.string),
};
CreatePostForm.defaultProps = {
  lateInitSubject: null,
  lateInitTags: null,
};

export default CreatePostForm;
