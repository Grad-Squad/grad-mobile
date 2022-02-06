import React, { useCallback } from 'react';
import { I18nManager, Pressable, StyleSheet } from 'react-native';
import Page from 'common/Page/Page';
import { Constants } from 'styles';
import { useLocalization } from 'localization';
import { Icon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import EduText from 'common/EduText';
import Separator from 'common/Separator';
import pressableAndroidRipple from 'common/pressableAndroidRipple';
import { reloadAsync } from 'expo-updates';
import i18n from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import localStorageKeys from 'localStorageKeys';
import OptionsHeader from './OptionsHeader';

const isRTLLocale = (locale) => locale.indexOf('ar') === 0;
const ChangeLanguage = () => {
  const { language, isRTL } = useLocalization();

  const setLanguage = useCallback(
    (newLocale) => {
      if (language === newLocale) {
        return;
      }
      i18n.locale = newLocale;
      AsyncStorage.setItem(localStorageKeys.appLocale, newLocale);
      const newIsRTL = isRTLLocale(newLocale);
      if (isRTL !== newIsRTL) {
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

  const { t } = useLocalization();
  return (
    <Page>
      <OptionsHeader titleText={t('Options/Change Language')} />
      <Pressable
        android_ripple={pressableAndroidRipple}
        style={[styles.row]}
        onPress={() => setLanguage('en')}
      >
        <EduText style={styles.text}>English</EduText>
        <Icon
          name={
            language.startsWith('en')
              ? IconNames.radioButtonChecked
              : IconNames.radioButtonOff
          }
        />
      </Pressable>
      <Separator style={styles.separator} />
      <Pressable
        android_ripple={pressableAndroidRipple}
        style={styles.row}
        onPress={() => setLanguage('ar')}
      >
        <EduText style={styles.text}>Arabic</EduText>
        <Icon
          name={
            language.startsWith('ar')
              ? IconNames.radioButtonChecked
              : IconNames.radioButtonOff
          }
        />
      </Pressable>
      <Separator style={styles.separator} />
    </Page>
  );
};

ChangeLanguage.propTypes = {};
ChangeLanguage.defaultProps = {};

export default ChangeLanguage;

const styles = StyleSheet.create({
  separator: {
    marginVertical: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Constants.commonMargin,
    paddingHorizontal: Constants.commonMargin,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 24,
  },
});
