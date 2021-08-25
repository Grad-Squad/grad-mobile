import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import * as yup from 'yup';
import { StyleSheet, Text } from 'react-native';
import { LocalizationContext } from '../../localization/LocalizationProvider';
import { navigationPropType } from '../../proptypes';
import { Colors, Typography } from '../../styles';
import { passwordRequired } from '../../validation';
import LoginBack from '../_common/backgrounds/LoginBack';
import { Button, TextInputFormik } from '../_common/Input';

const NewPassword = ({ navigation }) => {
  const { t } = useContext(LocalizationContext);
  const [samePasswordError, setSamePasswordError] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    onSubmit: ({ password: newPassword }) => {
      navigation.navigate('forgotPassword/done');
    },
    validationSchema: yup.object().shape({
      password: passwordRequired(t),
    }),
  });

  return (
    <LoginBack>
      <Text style={styles.header}>
        {t('ForgotPassword/Reset your password')}
      </Text>
      {samePasswordError ? (
        <Text style={styles.newPasswordCannot}>
          {t(
            'ForgotPassword/your new password cannot be the same as the old password'
          )}
        </Text>
      ) : (
        <Text style={styles.subtitle}>
          {t('ForgotPassword/Enter a new password to replace the old password')}
        </Text>
      )}

      <TextInputFormik
        formik={formik}
        formikKey="password"
        title={t('ForgotPassword/New Password')}
        error={samePasswordError}
        isPassword
        style={styles.gap}
      />

      <Button
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
    color: Colors.error,

    marginBottom: 18,
  },
});
