import React, { createContext, useContext, useState } from 'react';
import { childrenPropType } from 'proptypes';
import ErrorSnackbar from './ErrorSnackbar';

const ErrorSnackbarContext = createContext();

const ErrorSnackbarProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const showErrorSnackbar = (error) => {
    setErrorMsg(error);
    setVisible(true);
  };

  return (
    <ErrorSnackbarContext.Provider
      value={{
        showErrorSnackbar,
      }}
    >
      <ErrorSnackbar
        visible={visible}
        setVisible={setVisible}
        error={errorMsg}
      />
      {children}
    </ErrorSnackbarContext.Provider>
  );
};

ErrorSnackbarProvider.propTypes = {
  children: childrenPropType.isRequired,
};
ErrorSnackbarProvider.defaultProps = {};

export default ErrorSnackbarProvider;

export const useErrorSnackbar = () => useContext(ErrorSnackbarContext);
