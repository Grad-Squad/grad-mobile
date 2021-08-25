import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';

const TextInputFormik = ({ formik, formikKey, error, ...props }) => {
  const { TextInputProps, ...rest } = props;
  return (
    <TextInput
      text={formik.values[formikKey]}
      setText={formik.handleChange(formikKey)}
      error={error || (formik.errors[formikKey] && formik.touched[formikKey])}
      errorMsg={formik.errors[formikKey]}
      TextInputProps={{
        onSubmitEditing: formik.handleSubmit,
        onBlur: () => formik.handleBlur(formikKey),
        ...TextInputProps,
      }}
      {...rest}
    />
  );
};

TextInputFormik.propTypes = {
  formik: PropTypes.shape({
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }).isRequired,
  formikKey: PropTypes.string.isRequired,
  error: PropTypes.bool,
};
TextInputFormik.defaultProps = {
  error: false,
};

export default TextInputFormik;
