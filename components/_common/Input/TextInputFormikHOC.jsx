import React from 'react';
import PropTypes from 'prop-types';

// I'm not actually sure if this is an HOC
const TextInputFormikHOC = (Component) => {
  const wrapped = ({ formik, formikKey, error, TextInputProps, ...props }) => (
    <Component
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
  wrapped.propTypes = {
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
  wrapped.defaultProps = {
    error: false,
    TextInputProps: {},
  };
  return wrapped;
};
export default TextInputFormikHOC;
