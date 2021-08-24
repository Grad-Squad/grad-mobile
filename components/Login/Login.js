import React, { useContext } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { navigationPropType } from '../../proptypes';
import { LocalizationContext } from '../../localization/LocalizationProvider';

import LoginBack from '../_common/backgrounds/LoginBack';
import { Button, TextInputGroup } from '../_common/Input';
import SignInWith from './SignInWith/SignInWith';
import TextInputFormik from '../_common/Input/TextInputFormik';
import { emailRequired, requiredError } from '../../validation';

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
        <Button
          text={t('Login/forgot password?')}
          onPress={() => navigation.navigate('forgotPassword')}
          transparent
          lightText
        />
      </TextInputGroup>
      <Button
        text={t('Login/LOGIN')}
        onPress={formik.handleSubmit}
        style={styles.gap}
      />
      <Button
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
});
