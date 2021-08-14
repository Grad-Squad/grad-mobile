import React, { createContext, useEffect, useState } from 'react';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18n-js';

import { childrenPropType } from '../proptypes';
import ar from './locals/ar.json';
import en from './locals/en.json';

const STORAGE_KEY = 'appLocale';

const translations = {
  en,
  ar,
};
const availableLanguages = Object.keys(translations);
i18n.translations = translations;
i18n.fallbacks = true;

export const LocalizationContext = createContext();

export const LocalizationProvider = ({ children }) => {
  const [locale, setLocale] = useState(Localization.locale);

  const setLanguage = (newLocale) => {
    i18n.locale = newLocale;
    setLocale(newLocale);
    AsyncStorage.setItem(STORAGE_KEY, newLocale);
  };

  useEffect(() => {
    (async () => {
      setLanguage(
        (await AsyncStorage.getItem(STORAGE_KEY)) || Localization.locale
      );
    })();
  }, []);

  return (
    <LocalizationContext.Provider
      value={{
        availableLanguages,
        setLanguage,
        language: locale,
        t: i18n.t,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

LocalizationProvider.propTypes = {
  children: childrenPropType.isRequired,
};
