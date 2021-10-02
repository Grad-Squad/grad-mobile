import React from 'react';
import PropTypes from 'prop-types';

// I'm not actually sure if this is an HOC
const TextInputFormikHOC = (Component) => {
  const wrapped = ({
    formik,
    formikKey,
    error,
    errorMsg,
    TextInputProps,
    ...props
  }) => (
    <Component
      text={formik.values[formikKey]}
      setText={formik.handleChange(formikKey)}
      error={error || (formik.errors[formikKey] && formik.touched[formikKey])}
      errorMsg={formik.errors[formikKey] || errorMsg}
      TextInputProps={{
        onSubmitEditing: formik.handleSubmit,
        onBlur: formik.handleBlur(formikKey),
        ...TextInputProps,
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
  wrapped.propTypes = {
    formik: PropTypes.shape({
      // eslint-disable-next-line react/forbid-prop-types
      values: PropTypes.object.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      errors: PropTypes.object.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      touched: PropTypes.object.isRequired,
      handleChange: PropTypes.func.isRequired,
      handleBlur: PropTypes.func.isRequired,
      handleSubmit: PropTypes.func.isRequired,
    }).isRequired,
    formikKey: PropTypes.string.isRequired,
    error: PropTypes.bool,
    errorMsg: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    TextInputProps: PropTypes.object,
  };
  wrapped.defaultProps = {
    error: false,
    errorMsg: '',
    TextInputProps: {},
  };
  return wrapped;
};
export default TextInputFormikHOC;
