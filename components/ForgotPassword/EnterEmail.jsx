import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { LocalizationContext } from 'localization';
import { emailRequired } from 'validation';
import LoginBack from 'common/backgrounds/LoginBack';
import { Button, TextInputFormik } from 'common/Input';
import { navigationPropType } from 'proptypes';
import { Typography } from 'styles';
import EduText from 'common/EduText';

const EnterEmail = ({ navigation }) => {
  const { t } = useContext(LocalizationContext);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: ({ email }) => {
      navigation.navigate('forgotPassword/checkEmail');
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

      <Button
        text={t('ForgotPassword/RESET PASSWORD')}
        onPress={formik.handleSubmit}
      />
    </LoginBack>
  );
};

EnterEmail.propTypes = {
  navigation: navigationPropType.isRequired,
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
