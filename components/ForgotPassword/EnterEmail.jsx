import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocalization } from 'localization';
import { emailRequired } from 'validation';
import LoginBack from 'common/backgrounds/LoginBack';
import { TextInputFormik } from 'common/Input';
import { navigationPropType, routeParamPropType } from 'proptypes';
import { Styles, Typography } from 'styles';
import { WhiteButton } from 'common/Input/Button';

import EduText from 'common/EduText';
import ScreenNames from 'navigation/ScreenNames';
import { useAPIForgotPassword } from 'api/endpoints/resetPassword';
import { useDispatch } from 'react-redux';
import { setEmail } from 'globalStore/forgotPasswordSlice';

const tooManyAttemptsErrorCode = 429;

const EnterEmail = ({ navigation, route }) => {
  const { t } = useLocalization();
  const { existingEmail = '' } = route?.params || {};
  const dispatch = useDispatch();

  const forgotPasswordMutation = useAPIForgotPassword({
    onSuccess: () => {
      dispatch(setEmail(formik.values.email));
      navigation.navigate(ScreenNames.ForgotPassword.CHECK_EMAIL);
    },
  });
  const dailyLimitReached =
    forgotPasswordMutation.error?.response.status === tooManyAttemptsErrorCode;

  const formik = useFormik({
    initialValues: {
      email: existingEmail,
    },
    onSubmit: ({ email }) => {
      forgotPasswordMutation.mutate(email);
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

      {dailyLimitReached ? (
        <EduText style={[Styles.errorText, styles.subtitle]}>
          {t('ForgotPassword/Maximum number of daily attempts reached')}
        </EduText>
      ) : (
        <EduText style={styles.subtitle}>
          {t('ForgotPassword/AnEmailWith')}
        </EduText>
      )}
      <WhiteButton
        text={t('ForgotPassword/RESET PASSWORD')}
        onPress={formik.handleSubmit}
        disabled={forgotPasswordMutation.isLoading || dailyLimitReached}
        loading={forgotPasswordMutation.isLoading}
      />
    </LoginBack>
  );
};

EnterEmail.propTypes = {
  navigation: navigationPropType.isRequired,
  route: routeParamPropType(
    PropTypes.shape({
      email: PropTypes.string,
    })
  ).isRequired,
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
