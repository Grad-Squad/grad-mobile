import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { LocalizationContext } from 'localization';
import { emailRequired } from 'validation';
import LoginBack from 'common/backgrounds/LoginBack';
import { TextInputFormik } from 'common/Input';
import { navigationPropType } from 'proptypes';
import { Typography } from 'styles';
import { WhiteButton } from 'common/Input/Button';

import EduText from 'common/EduText';
import { ScreenNames } from 'constants';

const EnterEmail = ({ navigation, route }) => {
  const { t } = useContext(LocalizationContext);
  const { existingEmail = '' } = route.params;

  const formik = useFormik({
    initialValues: {
      email: existingEmail,
    },
    onSubmit: ({ email }) => {
      navigation.navigate(ScreenNames.ForgotPassword.CHECK_EMAIL);
    },
    validationSchema: yup.object().shape({
      email: emailRequired(t),
    }),
  });

  return (
    <LoginBack style={styles.wrapper}>
      <EduText style={styles.header}>{t('ForgotPassword/To Reset')}</EduText>

      <TextInputFormik
        formik={formik}
        formikKey="email"
        title={t('Login/Email')}
        isEmail
        style={styles.gap}
      />

      <EduText style={styles.subtitle}>
        {t('ForgotPassword/AnEmailWith')}
      </EduText>

      <WhiteButton
        text={t('ForgotPassword/RESET PASSWORD')}
        onPress={formik.handleSubmit}
      />
    </LoginBack>
  );
};

EnterEmail.propTypes = {
  navigation: navigationPropType.isRequired,
  route: PropTypes.shape({
    params: {
      email: PropTypes.string,
    },
  }).isRequired,
};
EnterEmail.defaultProps = {};

export default EnterEmail;

const styles = StyleSheet.create({
  gap: {
    marginBottom: 35,
  },
  header: {
    ...Typography.forgotPassword.header,

    marginBottom: 20,
  },
  subtitle: {
    ...Typography.forgotPassword.subtitle,

    marginBottom: 30,
  },
});
