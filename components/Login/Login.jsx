import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { LocalizationContext } from 'localization';
import { emailRequired, requiredError } from 'validation';
import LoginBack from 'common/backgrounds/LoginBack';
import { TransparentButton, WhiteButton } from 'common/Input/Button';
import { TextInputFormik, TextInputGroup } from 'common/Input';
import { navigationPropType } from 'proptypes';
import { Colors } from 'styles';
import { useAPILogin } from 'api/endpoints/auth';
import SignInWith from './SignInWith/SignInWith';
import { ScreenNames } from 'constants';

const Login = ({ navigation }) => {
  const { t } = useContext(LocalizationContext);

  const loginMutation = useAPILogin({
    onSuccess: () => {
      navigation.reset({
        index: 0,
        routes: [{ name: ScreenNames.HOME }],
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: ({ email, password }) => {
      loginMutation.mutate({ email, password });
    },
    validationSchema: yup.object().shape({
      email: emailRequired(t),
      password: yup.string().required(requiredError(t)),
    }),
  });

  return (
    <LoginBack
      bodyStyle={styles.loginBack}
      componentAfterBackground={
        <SignInWith disabled={loginMutation.isLoading} />
      }
    >
      <TextInputGroup style={styles.textInputs} onFinish={formik.handleSubmit}>
        <TextInputFormik
          formik={formik}
          formikKey="email"
          title={t('Login/Email')}
          isEmail
          style={styles.gap}
          error={loginMutation.isError}
          errorMsg={t('Login/(incorrect email or password)')}
        />
        <TextInputFormik
          formik={formik}
          formikKey="password"
          title={t('Login/Password')}
          isPassword
          style={styles.gap}
          error={loginMutation.isError}
        />
        <TransparentButton
          text={t('Login/forgot password?')}
          onPress={() => navigation.navigate(ScreenNames.FORGOT_PASSWORD)}
          textStyle={styles.forgotPassword}
          disabled={loginMutation.isLoading}
        />
      </TextInputGroup>
      <WhiteButton
        text={t('Login/LOGIN')}
        onPress={formik.handleSubmit}
        style={styles.gap}
        loading={loginMutation.isLoading}
        disabled={loginMutation.isLoading}
      />
      <WhiteButton
        text={t('Login/REGISTER')}
        onPress={() => navigation.navigate(ScreenNames.REGISTER)}
        smallButton
        disabled={loginMutation.isLoading}
      />
    </LoginBack>
  );
};

Login.propTypes = {
  navigation: navigationPropType.isRequired,
};

export default Login;

const styles = StyleSheet.create({
  loginBack: {
    marginBottom: 12,
  },
  textInputs: { marginBottom: 32 },
  gap: {
    marginBottom: 11,
  },
  forgotPassword: {
    textDecorationLine: 'underline',
    fontFamily: 'Lato_300Light',
    fontSize: 17,
    color: Colors.black,
  },
});
