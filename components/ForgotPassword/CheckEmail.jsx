import React, { useContext } from 'react';
import { Image, StyleSheet } from 'react-native';

import { LocalizationContext } from 'localization/LocalizationProvider';
import { navigationPropType } from 'proptypes';
import { Typography } from 'styles';
import LoginBack from 'common/backgrounds/LoginBack';
import { WhiteButton } from 'common/Input/Button';
import EduText from 'common/EduText';
import ScreenNames from 'navigation/ScreenNames';

const IMAGE_SOURCE = require('../../assets/images/CheckEmail.webp');

const CheckEmail = ({ navigation }) => {
  const { t } = useContext(LocalizationContext);

  return (
    <LoginBack bodyStyle={styles.back}>
      <Image style={styles.image} source={IMAGE_SOURCE} />
      <EduText style={styles.checkEmail}>
        {t('ForgotPassword/Check Your Email')}
      </EduText>
      <EduText style={styles.junkFolder}>
        {t('ForgotPassword/you might need to check the junk folder')}
      </EduText>
      <WhiteButton
        text={t('ForgotPassword/OK')}
        onPress={() =>
          navigation.navigate(ScreenNames.ForgotPassword.SIX_DIGIT)
        }
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
