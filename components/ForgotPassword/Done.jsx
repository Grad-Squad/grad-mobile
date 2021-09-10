import React, { useContext } from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { navigationPropType } from 'proptypes';
import { LocalizationContext } from 'localization/LocalizationProvider';

import { Typography } from 'styles';
import LoginBack from 'common/backgrounds/LoginBack';
import { Button } from 'common/Input';

const IMAGE_SOURCE = require('../../assets/images/ForgotPasswordDone.webp');

const Done = ({ navigation }) => {
  const { t } = useContext(LocalizationContext);

  return (
    <LoginBack>
      <Image style={styles.image} source={IMAGE_SOURCE} />

      <Text style={styles.header}>{t('ForgotPassword/All Good')}</Text>
      <Text style={styles.subtitle}>
        {t('ForgotPassword/Now you can login in with your new password')}
      </Text>
      <Button
        text={t('Login/LOGIN')}
        onPress={() => navigation.navigate('login')}
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
