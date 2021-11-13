import { useFormik } from 'formik';
import React, {  useState } from 'react';
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

const NewPassword = ({ navigation }) => {
  const { t } = useLocalization();
  const [samePasswordError, setSamePasswordError] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    onSubmit: ({ password: newPassword }) => {
      navigation.navigate(ScreenNames.ForgotPassword.DONE);
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
      {samePasswordError ? (
        <EduText style={styles.newPasswordCannot}>
          {t(
            'ForgotPassword/your new password cannot be the same as the old password'
          )}
        </EduText>
      ) : (
        <EduText style={styles.subtitle}>
          {t('ForgotPassword/Enter a new password to replace the old password')}
        </EduText>
      )}

      <TextInputFormik
        formik={formik}
        formikKey="password"
        title={t('ForgotPassword/New Password')}
        error={samePasswordError}
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
