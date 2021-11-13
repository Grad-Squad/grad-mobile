import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18n-js';
import localStorageKeys from 'localStorageKeys';
import { I18nManager } from 'react-native';
import { reloadAsync } from 'expo-updates';

import { childrenPropType } from '../proptypes';
import ar from './locals/ar.json';
import en from './locals/en.json';

const translations = {
  en,
  ar,
};
const availableLanguages = Object.keys(translations);
i18n.translations = translations;
i18n.fallbacks = true;
i18n.defaultSeparator = '/';

export const LocalizationContext = createContext();

const isRTLLocale = (locale) => locale.indexOf('ar') === 0;

export const LocalizationProvider = ({ children }) => {
  const [locale, setLocale] = useState(Localization.locale);
  const [isRTL, setIsRTL] = useState(isRTLLocale(locale));

  const setLanguage = useCallback(
    (newLocale) => {
      if (locale === newLocale) {
        return;
      }
      i18n.locale = newLocale;
      setLocale(newLocale);
      AsyncStorage.setItem(localStorageKeys.appLocale, newLocale);
      const newIsRTL = isRTLLocale(newLocale);
      if (isRTL !== newIsRTL) {
        setIsRTL(newIsRTL);
        I18nManager.forceRTL(newIsRTL);
        I18nManager.allowRTL(newIsRTL);
        // force doesn't update isRTL
        if (I18nManager.isRTL !== newIsRTL) {
          reloadAsync();
        }
      }
    },
    [isRTL]
  );

  useEffect(() => {
    (async () => {
      const storedLocale = await AsyncStorage.getItem(
        localStorageKeys.appLocale
      );
      if (storedLocale) {
        setLanguage(storedLocale);
      }
    })();
  }, [setLanguage]);

  return (
    <LocalizationContext.Provider
      value={{
        availableLanguages,
        setLanguage,
        language: locale,
        t: i18n.t,
        isRTL,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

LocalizationProvider.propTypes = {
  children: childrenPropType.isRequired,
};

export const useLocalization = () => useContext(LocalizationContext);
