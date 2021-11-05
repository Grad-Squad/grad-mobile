import React from 'react';
import i18n from 'i18n-js';
import { LocalizationContext } from 'localization';
import { childrenPropType } from 'proptypes';

// it loads the localization files when importing the context
const MockLocalization = ({ children }) => (
  <LocalizationContext.Provider
    value={{
      // availableLanguages,
      // setLanguage,
      language: 'en',
      t: i18n.t,
      isRTL: false,
    }}
  >
    {children}
  </LocalizationContext.Provider>
);

MockLocalization.propTypes = {
  children: childrenPropType.isRequired,
};
export default MockLocalization;
