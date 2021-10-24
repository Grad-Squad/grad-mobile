import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { navigationPropType } from 'proptypes';

import { Typography } from 'styles';
import LoginBack from 'common/backgrounds/LoginBack';
import { WhiteButton } from 'common/Input/Button';
import EduText from 'common/EduText';
import ScreenNames from 'navigation/ScreenNames';
import { useLocalization } from 'localization';

const IMAGE_SOURCE = require('../../assets/images/ForgotPasswordDone.webp');

const Done = ({ navigation }) => {
  const { t } = useLocalization();

  return (
    <LoginBack>
      <Image style={styles.image} source={IMAGE_SOURCE} />

      <EduText style={styles.header}>{t('ForgotPassword/All Good')}</EduText>
      <EduText style={styles.subtitle}>
        {t('ForgotPassword/Now you can login in with your new password')}
      </EduText>
      <WhiteButton
        text={t('Login/LOGIN')}
        onPress={() => navigation.navigate(ScreenNames.LOGIN)}
      />
    </LoginBack>
  );
};

Done.propTypes = {
  navigation: navigationPropType.isRequired,
};
Done.defaultProps = {};

export default Done;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 291,

    marginBottom: 10,
  },
  header: {
    ...Typography.forgotPassword.bigHeader,

    marginBottom: 20,
  },
  subtitle: {
    ...Typography.forgotPassword.subtitle,

    marginBottom: 17,
  },
});
