import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';

const TextInputFormik = ({
  formik,
  formikKey,
  error,
  TextInputProps,
  ...props
}) => (
  <TextInput
    text={formik.values[formikKey]}
    setText={formik.handleChange(formikKey)}
    error={error || (formik.errors[formikKey] && formik.touched[formikKey])}
    errorMsg={formik.errors[formikKey]}
    TextInputProps={{
      onSubmitEditing: formik.handleSubmit,
      onBlur: formik.handleBlur(formikKey),
      ...TextInputProps,
    }}
    {...props}
  />
);

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
  TextInputProps: PropTypes.object,
};
TextInputFormik.defaultProps = {
  error: false,
  TextInputProps: {},
};

export default TextInputFormik;
