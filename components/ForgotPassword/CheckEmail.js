import React, { useContext } from 'react';
import { Image, StyleSheet, Text } from 'react-native';

import { LocalizationContext } from 'localization/LocalizationProvider';
import { navigationPropType } from 'proptypes';
import { Typography } from 'styles';
import LoginBack from 'common/backgrounds/LoginBack';
import { Button } from 'common/Input';

const IMAGE_SOURCE = require('../../assets/images/CheckEmail.webp');

const CheckEmail = ({ navigation }) => {
  const { t } = useContext(LocalizationContext);

  return (
    <LoginBack bodyStyle={styles.back}>
      <Image style={styles.image} source={IMAGE_SOURCE} />
      <Text style={styles.checkEmail}>
        {t('ForgotPassword/Check Your Email')}
      </Text>
      <Text style={styles.junkFolder}>
        {t('ForgotPassword/you might need to check the junk folder')}
      </Text>
      <Button
        text={t('ForgotPassword/OK')}
        onPress={() => navigation.navigate('forgotPassword/sixDigit')}
        style={styles.gap}
      />
    </LoginBack>
  );
};

CheckEmail.propTypes = {
  navigation: navigationPropType.isRequired,
};

export default CheckEmail;

const styles = StyleSheet.create({
  image: {
    width: 236,
    height: 171,
  },
  checkEmail: {
    ...Typography.forgotPassword.bigHeader,

    marginBottom: 10,
  },
  junkFolder: {
    ...Typography.forgotPassword.subtitle,

    marginBottom: 30,
  },
});
