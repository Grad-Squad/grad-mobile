import LoginBack from 'common/backgrounds/LoginBack';
import { WhiteButton } from 'common/Input/Button';
import EduText from 'common/EduText';
import { useLocalization } from 'localization';
import { navigationPropType } from 'proptypes';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Typography } from 'styles';
import ScreenNames from 'navigation/ScreenNames';

const IMAGE_SOURCE = require('../../assets/images/ForgotPasswordFailed.webp');

const SixDigitFailed = ({ navigation }) => {
  const { t } = useLocalization();
  return (
    <LoginBack>
      <EduText style={styles.header}>
        {t('ForgotPassword/Failed too many times')}
      </EduText>
      <EduText style={styles.subtitle}>
        {t('ForgotPassword/Please request another password reset')}
      </EduText>

      <Image style={styles.image} source={IMAGE_SOURCE} />

      <WhiteButton
        text={t('ForgotPassword/OK')}
        onPress={() => navigation.navigate(ScreenNames.ENTER_EMAIL)}
      />
    </LoginBack>
  );
};

export default SixDigitFailed;

SixDigitFailed.propTypes = {
  navigation: navigationPropType.isRequired,
};
SixDigitFailed.defaultProps = {};

const styles = StyleSheet.create({
  image: {
    width: 225,
    height: 217,

    marginBottom: 15,
  },
  header: {
    ...Typography.forgotPassword.bigHeader,

    marginBottom: 15,
  },
  subtitle: {
    ...Typography.forgotPassword.subtitle,

    marginBottom: 17,
  },
});
