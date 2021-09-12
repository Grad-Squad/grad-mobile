import React, { useContext } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { LocalizationContext } from 'localization';
import { emailRequired, requiredError } from 'validation';
import LoginBack from 'common/backgrounds/LoginBack';
import { TransparentButton, WhiteButton } from 'common/Input/Button';
import { TextInputFormik, TextInputGroup } from 'common/Input';
import { navigationPropType } from 'proptypes';
import { Colors } from 'styles';
import SignInWith from './SignInWith/SignInWith';

const Login = ({ navigation }) => {
  const { t } = useContext(LocalizationContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: ({ email, password }) => {
      Alert.alert(`Login: ${email}, ${password}`);
    },
    validationSchema: yup.object().shape({
      email: emailRequired(t),
      password: yup.string().required(requiredError(t)),
    }),
  });

  return (
    <LoginBack
      bodyStyle={styles.loginBack}
      componentAfterBackground={<SignInWith />}
    >
      <TextInputGroup style={styles.textInputs} onFinish={formik.handleSubmit}>
        <TextInputFormik
          formik={formik}
          formikKey="email"
          title={t('Login/Email')}
          isEmail
          style={styles.gap}
        />
        <TextInputFormik
          formik={formik}
          formikKey="password"
          title={t('Login/Password')}
          isPassword
          style={styles.gap}
        />
        <TransparentButton
          text={t('Login/forgot password?')}
          onPress={() => navigation.navigate('forgotPassword')}
          textStyle={styles.forgotPassword}
        />
      </TextInputGroup>
      <WhiteButton
        text={t('Login/LOGIN')}
        onPress={formik.handleSubmit}
        style={styles.gap}
      />
      <WhiteButton
        text={t('Login/REGISTER')}
        onPress={() => navigation.navigate('register')}
        smallButton
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