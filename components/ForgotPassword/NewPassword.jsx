import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { StyleSheet } from 'react-native';
import { useLocalization } from 'localization';
import { passwordRequired } from 'validation';
import LoginBack from 'common/backgrounds/LoginBack';
import { TextInputFormik } from 'common/Input';
import { navigationPropType } from 'proptypes';
import { Styles, Typography } from 'styles';
import { WhiteButton } from 'common/Input/Button';
import EduText from 'common/EduText';
import ScreenNames from 'navigation/ScreenNames';
import { useSelector } from 'react-redux';
import { useAPIChangePassword } from 'api/endpoints/resetPassword';

const NewPassword = ({ navigation }) => {
  const { t } = useLocalization();

  const email = useSelector((state) => state.forgotPassword.email);
  const token = useSelector((state) => state.forgotPassword.token);

  const changePasswordMutation = useAPIChangePassword({
    onSuccess: () => {
      navigation.navigate(ScreenNames.ForgotPassword.DONE);
    },
  });

  const formik = useFormik({
    initialValues: {
      password: '',
    },

    onSubmit: ({ password }) => {
      changePasswordMutation.mutate({ email, password, token });
    },
    validationSchema: yup.object().shape({
      password: passwordRequired(t),
    }),
  });

  return (
    <LoginBack>
      <EduText style={styles.header}>
        {t('ForgotPassword/Reset your password')}
      </EduText>
      <EduText style={styles.subtitle}>
        {t('ForgotPassword/Enter a new password to replace the old password')}
      </EduText>

      <TextInputFormik
        formik={formik}
        formikKey="password"
        title={t('ForgotPassword/New Password')}
        isPassword
        style={styles.gap}
      />

      <WhiteButton
        text={t('ForgotPassword/Reset Password')}
        onPress={formik.handleSubmit}
      />
    </LoginBack>
  );
};

export default NewPassword;

NewPassword.propTypes = {
  navigation: navigationPropType.isRequired,
};
NewPassword.defaultProps = {};

const styles = StyleSheet.create({
  gap: {
    marginBottom: 30,
  },
  header: {
    ...Typography.forgotPassword.bigHeader,

    marginBottom: 25,
  },
  subtitle: {
    ...Typography.forgotPassword.subtitle,

    marginBottom: 18,
  },
  newPasswordCannot: {
    ...Typography.forgotPassword.subtitle,
    ...Styles.errorText,

    marginBottom: 18,
  },
});
