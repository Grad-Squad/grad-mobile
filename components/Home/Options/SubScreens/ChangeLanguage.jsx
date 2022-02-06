import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Page from 'common/Page/Page';
import { Constants } from 'styles';
import { useLocalization } from 'localization';
import { Icon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import EduText from 'common/EduText';
import Separator from 'common/Separator';
import pressableAndroidRipple from 'common/pressableAndroidRipple';
import OptionsHeader from './OptionsHeader';

const ChangeLanguage = () => {
  const { language, setLanguage } = useLocalization();

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
            language === 'en'
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
            language === 'ar'
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
