import React from 'react';
import { StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocalization } from 'localization';
import { emailRequired, requiredError } from 'validation';
import LoginBack from 'common/backgrounds/LoginBack';
import { TransparentButton, WhiteButton } from 'common/Input/Button';
import { TextInputFormik, TextInputGroup } from 'common/Input';
import { navigationPropType } from 'proptypes';
import { Colors } from 'styles';
import { useAPILogin } from 'api/endpoints/auth';
import ScreenNames from 'navigation/ScreenNames';
import { useStore } from 'globalStore/GlobalStore';
import ReducerActions from 'globalStore/ReducerActions';
import SignInWith from './SignInWith/SignInWith';

const Login = ({ navigation }) => {
  const { t } = useLocalization();
  const [, dispatch] = useStore();

  const loginMutation = useAPILogin({
    onSuccess: (data) => {
      navigation.reset({
        index: 0,
        routes: [{ name: ScreenNames.HOME }],
      });

      dispatch({
        type: ReducerActions.setProfileId,
        payload: data.user.profile.id,
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: ({ email, password }) => {
      loginMutation.mutate({ email: email.toLowerCase(), password });
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
          TextInputProps={{ testId: 'LoginEmail' }}
        />
        <TextInputFormik
          formik={formik}
          formikKey="password"
          title={t('Login/Password')}
          isPassword
          style={styles.gap}
          error={loginMutation.isError}
          TextInputProps={{ testId: 'LoginPassword' }}
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
